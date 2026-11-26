import { randomUUID } from "node:crypto";
import {
	mkdir,
	readdir,
	readFile,
	rename,
	stat,
	unlink,
	writeFile,
} from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import {
	normalizeBasePath,
	readFrameworkBase,
	withFrameworkBase,
} from "./base-path.js";
import {
	type Adapter,
	adapters,
	detectFramework,
	type FrameworkId,
	frameworks,
} from "./frameworks.js";
import {
	createRoutes,
	formatPattern,
	type HrefMode,
	type I18nOptions,
	NamedRouteError,
	type NamedRouteErrorDetails,
	type PatternSegment,
	parsePattern,
	type RouteDefaults,
} from "./index.js";
import {
	type DiscoveryMode,
	discoveryModes,
	type FrameworkTable,
	frameworkSources,
	frameworkTable,
} from "./sources.js";
import { closest } from "./suggest.js";

export type { FrameworkId } from "./frameworks.js";
export type {
	DiscoveryMode,
	FrameworkRoute,
	FrameworkTable,
} from "./sources.js";
export interface NamingContext {
	/** Canonical URL pattern (without locale prefix). */
	path: string;
	/** The automatic name before transform. */
	name: string;
	segments: PatternSegment[];
	file: string | null;
	router: string;
}
export interface NamingOptions {
	/** Joins URL segments. Default "." (user.profile). */
	separator?: string;
	/** Marks parameters. Default "$" (users.$user). May be "". */
	paramPrefix?: string;
	/** Name of the root route. Default "home". */
	home?: string;
	/** Final say over automatic names (JavaScript/TypeScript config only). */
	transform?: (route: NamingContext) => string | null | undefined;
}
export interface I18nGeneratorOptions<Locale extends string = string>
	extends Omit<I18nOptions<Locale>, "unlocalized"> {
	/** Dynamic first segment holding the locale. Default ["locale", "lang"]; false disables detection. */
	localeParam?: string | readonly string[] | false;
	/** Extra route names that never get a locale. Discovered non-locale routes are added automatically. */
	unlocalized?: readonly string[];
	/** Accepted (and ignored) so a next-intl `routing` object can be passed as is. */
	localeCookie?: unknown;
	localeDetection?: unknown;
	alternateLinks?: unknown;
}
export interface ExportNames {
	/** Frozen manifest export. Default "routes". */
	routes?: string;
	/** URL helper export. Default "route". */
	route?: string;
	/** Route name union type. Default "RouteName". */
	routeName?: string;
	/** Locale union type (with i18n). Default "RouteLocale". */
	routeLocale?: string;
}
export interface GeneratorOptions {
	/** Project directory. Default: process.cwd(). */
	root?: string;
	/** Routing convention. Default "auto" (detected from package.json, then Next.js). */
	framework?: FrameworkId | "auto";
	/** Next.js only: auto (default), app or pages. */
	router?: "auto" | "app" | "pages";
	/** Next.js only: custom App Router directory, or false to skip it. */
	appDir?: string | false;
	/** Next.js only: custom Pages Router directory, or false to skip it. */
	pagesDir?: string | false;
	/** Other frameworks: custom pages/routes directory relative to root. */
	routesDir?: string;
	pageExtensions?: readonly string[];
	includeApi?: boolean;
	/** Glob patterns relative to root (`*`, `**`, `?`) for files or folders to ignore. */
	exclude?: readonly string[];
	/** URL pattern -> custom route name. Misspelled or undiscovered paths fail. */
	names?: Readonly<Record<string, string>>;
	/** Additional explicit names for URLs such as rewrite destinations. */
	extraRoutes?: Readonly<Record<string, string>>;
	naming?: NamingOptions;
	i18n?: I18nGeneratorOptions;
	/** Generated module (.ts, .mts, .js or .mjs). Default "src/routes.generated.ts". */
	output?: string;
	/** Module specifier the generated file imports createRoutes from. */
	importSource?: string;
	exportNames?: ExportNames;
	/** Public URL defaults serialized into the generated module. Never put secrets here. */
	defaults?: Omit<RouteDefaults, "i18n" | "hrefs">;
	/**
	 * "typed" (default since 2.0) makes route() return template literal types
	 * (`/users/${string}`) accepted by Next.js typedRoutes without casts;
	 * "string" keeps the 1.x `string`.
	 */
	hrefs?: HrefMode;
	/**
	 * Where page routes come from. "framework" (default since 2.0): the route
	 * table the framework resolves, where it publishes one (Nuxt through
	 * @triooo/named-routes/nuxt, Vue Router 5, React Router, TanStack
	 * Router), falling back to the files when it is not available yet.
	 * "files": the file-convention scanner of 1.x.
	 */
	discovery?: DiscoveryMode;
	/**
	 * Module (relative to root) whose default export is `defineQuery({...})`:
	 * per-route query schemas. Imported as types only unless validateQuery.
	 */
	query?: string;
	/** Bundle the query schemas and validate query objects at runtime. Default false. */
	validateQuery?: boolean;
}
export interface DiscoveredRoute {
	name: string;
	path: string;
	file: string | null;
	/** Source kind: app, pages, routes, api, server or explicit. */
	router: string;
	framework: FrameworkId;
	variant?: boolean;
	localized?: boolean;
}
/** How the routes of a Discovery were found. */
export interface DiscoverySource {
	/** The discovery option in effect. */
	requested: DiscoveryMode;
	/** Where the page routes came from. */
	used: DiscoveryMode;
	/** The framework artifact or command the table came from. */
	artifact?: string;
	/** Why framework discovery fell back to the files. */
	fallback?: string;
	/** Absolute files whose content changes the routes (besides the routes directories). */
	inputs: string[];
}
export interface Discovery {
	root: string;
	framework: FrameworkId;
	discovery: DiscoverySource;
	/** Scanned directories relative to root. */
	directories: string[];
	sources: { kind: string; directory: string }[];
	routes: Record<string, string>;
	entries: DiscoveredRoute[];
	/** Runtime defaults written into the generated module. */
	defaults: RouteDefaults;
}

const PACKAGE = "@triooo/named-routes";
const generatedHeader = `// Generated by ${PACKAGE}. Do not edit.`;
/** Headers this package wrote before (renamed from @triooo/next-named-routes). */
const generatedHeaders = [
	generatedHeader,
	"// Generated by @triooo/next-named-routes. Do not edit.",
];
const error = (message: string, details?: NamedRouteErrorDetails): never => {
	throw new NamedRouteError("GENERATION_ERROR", message, details);
};
const invalid = (message: string, details?: NamedRouteErrorDetails): never => {
	throw new NamedRouteError("INVALID_CONFIG", message, details);
};
/** Unknown configuration key, with a "did you mean" hint. Message format is unchanged. */
const unknownKey = (
	label: string,
	key: string,
	known: Iterable<string>,
): never => {
	const suggestion = closest(key, known);
	return invalid(`Unknown ${label ? `${label} ` : ""}option "${key}"`, {
		option: label ? `${label}.${key}` : key,
		hint: suggestion
			? `Did you mean "${suggestion}"?`
			: `Remove "${key}" or check the configuration reference.`,
	});
};
const posix = (value: string) => value.split(sep).join("/");
const isRecord = (value: unknown): value is Record<string, unknown> =>
	!!value && typeof value === "object" && !Array.isArray(value);
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const RESERVED = new Set(
	"break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static implements interface package private protected public await".split(
		" ",
	),
);

async function isDirectory(path: string) {
	try {
		return (await stat(path)).isDirectory();
	} catch (caught: unknown) {
		const code = (caught as NodeJS.ErrnoException).code;
		if (code === "ENOENT" || code === "ENOTDIR") return false;
		throw caught;
	}
}

const generatorKeys = new Set([
	"root",
	"framework",
	"router",
	"appDir",
	"pagesDir",
	"routesDir",
	"pageExtensions",
	"includeApi",
	"exclude",
	"names",
	"extraRoutes",
	"naming",
	"i18n",
	"output",
	"importSource",
	"exportNames",
	"defaults",
	"hrefs",
	"query",
	"validateQuery",
	"discovery",
]);
const i18nKeys = new Set([
	"locales",
	"defaultLocale",
	"localePrefix",
	"pathnames",
	"domains",
	"localeParam",
	"unlocalized",
	"localeCookie",
	"localeDetection",
	"alternateLinks",
]);
function stringMap(value: unknown, label: string) {
	if (value === undefined) return;
	if (!isRecord(value)) invalid(`${label} must be an object`);
	for (const [key, item] of Object.entries(value as object))
		if (typeof item !== "string" || !item)
			invalid(`${label}.${key} must be a nonempty string`);
}
function stringList(value: unknown, label: string) {
	if (value === undefined) return;
	if (
		!Array.isArray(value) ||
		value.some((item) => typeof item !== "string" || !item)
	)
		invalid(`${label} must be an array of nonempty strings`);
}
function optionalString(value: unknown, label: string) {
	if (value !== undefined && (typeof value !== "string" || !value))
		invalid(`${label} must be a nonempty string`);
}

/** Validates user options and reports typos instead of silently ignoring them. */
export function validateOptions(options: unknown): GeneratorOptions {
	if (!isRecord(options)) return invalid("Options must be an object");
	for (const key of Object.keys(options))
		if (!generatorKeys.has(key)) unknownKey("", key, generatorKeys);
	const o = options as GeneratorOptions;
	optionalString(o.root, "root");
	if (
		o.framework !== undefined &&
		o.framework !== "auto" &&
		!frameworks.includes(o.framework)
	)
		invalid(
			`Invalid framework: ${String(o.framework)}; use auto, ${frameworks.join(", ")}`,
		);
	if (o.router !== undefined && !["auto", "app", "pages"].includes(o.router))
		invalid(`Invalid router: ${String(o.router)}`, {
			option: "router",
			hint: 'Use "auto", "app" or "pages".',
		});
	for (const key of ["appDir", "pagesDir"] as const)
		if (o[key] !== undefined && o[key] !== false) optionalString(o[key], key);
	optionalString(o.routesDir, "routesDir");
	if (o.pageExtensions !== undefined) {
		if (!Array.isArray(o.pageExtensions))
			invalid("pageExtensions must be an array", { option: "pageExtensions" });
		if (
			!o.pageExtensions.length ||
			o.pageExtensions.some(
				(ext) =>
					typeof ext !== "string" || !/^[a-z0-9]+(?:\.[a-z0-9]+)*$/i.test(ext),
			)
		)
			invalid("Invalid pageExtensions", {
				option: "pageExtensions",
				hint: 'Use extensions without a leading dot, such as ["tsx", "page.tsx"].',
			});
	}
	if (o.includeApi !== undefined && typeof o.includeApi !== "boolean")
		invalid("includeApi must be a boolean");
	stringList(o.exclude, "exclude");
	stringMap(o.names, "names");
	if (o.extraRoutes !== undefined && !isRecord(o.extraRoutes))
		invalid("extraRoutes must be an object");
	if (o.naming !== undefined) {
		if (!isRecord(o.naming)) invalid("naming must be an object");
		for (const key of Object.keys(o.naming))
			if (!["separator", "paramPrefix", "home", "transform"].includes(key))
				unknownKey("naming", key, [
					"separator",
					"paramPrefix",
					"home",
					"transform",
				]);
		const { separator, paramPrefix, home, transform } = o.naming;
		if (
			separator !== undefined &&
			(typeof separator !== "string" ||
				// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
				!/^[^\s\u0000-\u001f]+$/.test(separator))
		)
			invalid("naming.separator must be a nonempty string without spaces");
		if (
			paramPrefix !== undefined &&
			// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
			(typeof paramPrefix !== "string" || /[\s\u0000-\u001f]/.test(paramPrefix))
		)
			invalid("naming.paramPrefix must be a string without spaces");
		optionalString(home, "naming.home");
		if (transform !== undefined && typeof transform !== "function")
			invalid("naming.transform must be a function");
	}
	if (o.i18n !== undefined) {
		if (!isRecord(o.i18n)) invalid("i18n must be an object");
		for (const key of Object.keys(o.i18n))
			if (!i18nKeys.has(key)) unknownKey("i18n", key, i18nKeys);
		const param = o.i18n.localeParam;
		if (
			param !== undefined &&
			param !== false &&
			!(typeof param === "string" && param) &&
			!(
				Array.isArray(param) &&
				param.every((item) => typeof item === "string" && item)
			)
		)
			invalid(
				"i18n.localeParam must be a string, an array of strings or false",
			);
		stringList(o.i18n.unlocalized, "i18n.unlocalized");
	}
	optionalString(o.output, "output");
	optionalString(o.importSource, "importSource");
	if (
		o.importSource !== undefined &&
		// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
		/[\u0000-\u001f'"`\\]/.test(o.importSource)
	)
		invalid("importSource contains unsupported characters");
	if (o.exportNames !== undefined) {
		if (!isRecord(o.exportNames)) invalid("exportNames must be an object");
		const seen = new Set<string>();
		for (const [key, value] of Object.entries(o.exportNames)) {
			if (!["routes", "route", "routeName", "routeLocale"].includes(key))
				unknownKey("exportNames", key, [
					"routes",
					"route",
					"routeName",
					"routeLocale",
				]);
			if (
				typeof value !== "string" ||
				!IDENTIFIER.test(value) ||
				RESERVED.has(value)
			)
				invalid(`exportNames.${key} must be a valid JavaScript identifier`);
			if (seen.has(value)) invalid(`exportNames.${key} duplicates ${value}`);
			seen.add(value);
		}
	}
	if (o.hrefs !== undefined && o.hrefs !== "string" && o.hrefs !== "typed")
		invalid('hrefs must be "string" or "typed"');
	if (o.discovery !== undefined && !discoveryModes.includes(o.discovery))
		invalid('discovery must be "files" or "framework"', {
			option: "discovery",
		});
	optionalString(o.query, "query");
	if (o.query !== undefined && !/\.(?:[cm]?[jt]s|tsx|jsx)$/.test(o.query))
		invalid("query must point to a .ts, .mts, .tsx, .js or .mjs module", {
			option: "query",
			hint: 'Use a path such as "src/route-query.ts" whose default export is defineQuery({...}).',
		});
	if (o.validateQuery !== undefined && typeof o.validateQuery !== "boolean")
		invalid("validateQuery must be a boolean");
	if (o.validateQuery && o.query === undefined)
		invalid("validateQuery needs the query option", {
			option: "validateQuery",
			hint: "Set query to your defineQuery module.",
		});
	if (o.defaults !== undefined) {
		if (!isRecord(o.defaults)) invalid("defaults must be an object");
		for (const key of Object.keys(o.defaults))
			if (key === "i18n")
				invalid("Configure locales with the top-level i18n option");
			else if (!["basePath", "trailingSlash", "origin"].includes(key))
				unknownKey("defaults", key, ["basePath", "trailingSlash", "origin"]);
	}
	return o;
}

function globToRegExp(glob: string) {
	let source = "";
	const pattern = glob.replace(/^\.\//, "").replace(/\/$/, "");
	for (let index = 0; index < pattern.length; index++) {
		const char = pattern[index];
		if (char === "*") {
			if (pattern[index + 1] === "*") {
				index++;
				if (pattern[index + 1] === "/") {
					index++;
					source += "(?:.*/)?";
				} else source += ".*";
			} else source += "[^/]*";
		} else if (char === "?") source += "[^/]";
		else source += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
	}
	return new RegExp(`^${source}(?:/.*)?$`);
}

function automaticName(path: string, naming: NamingOptions = {}) {
	const separator = naming.separator ?? ".";
	const prefix = naming.paramPrefix ?? "$";
	const segments = parsePattern(path);
	if (!segments.length) return naming.home ?? "home";
	return segments
		.map((segment) =>
			segment.kind === "static"
				? segment.value
				: segment.kind === "mixed"
					? segment.parts
							.map((part) =>
								part.kind === "static" ? part.value : `${prefix}${part.name}`,
							)
							.join("")
					: `${prefix}${segment.name}`,
		)
		.join(separator);
}
function shape(path: string) {
	return parsePattern(path)
		.map((segment) =>
			segment.kind === "static"
				? segment.value
				: segment.kind === "mixed"
					? segment.parts
							.map((part) =>
								part.kind === "static" ? part.value : "[dynamic]",
							)
							.join("")
					: `[${segment.kind}]`,
		)
		.join("/");
}

async function resolveFramework(root: string, options: GeneratorOptions) {
	if (options.framework && options.framework !== "auto")
		return options.framework;
	if (
		(options.router && options.router !== "auto") ||
		options.appDir !== undefined ||
		options.pagesDir !== undefined
	)
		return "next";
	try {
		const manifest: unknown = JSON.parse(
			await readFile(resolve(root, "package.json"), "utf8"),
		);
		if (isRecord(manifest)) {
			const dependencies = Object.assign(
				{},
				...["dependencies", "devDependencies", "optionalDependencies"].map(
					(key) => (isRecord(manifest[key]) ? manifest[key] : {}),
				),
			);
			const detected = detectFramework(dependencies);
			if (detected) return detected;
		}
	} catch (caught) {
		const code = (caught as NodeJS.ErrnoException).code;
		if (code !== "ENOENT" && !(caught instanceof SyntaxError)) throw caught;
	}
	return "next";
}

interface Source {
	kind: string;
	directory: string;
	prefix?: string;
}
async function resolveSources(
	root: string,
	adapter: Adapter,
	options: GeneratorOptions,
): Promise<Source[]> {
	const router = options.router ?? "auto";
	if (adapter.id !== "next") {
		if (router !== "auto") invalid("router applies only to framework next");
		if (options.appDir !== undefined || options.pagesDir !== undefined)
			invalid("appDir and pagesDir apply only to framework next");
	} else if (options.routesDir !== undefined)
		invalid("Next.js uses appDir and pagesDir instead of routesDir");
	const sources: Source[] = [];
	let primary = true;
	for (const source of adapter.sources) {
		if (source.api && !options.includeApi) continue;
		if (adapter.id === "next" && router !== "auto" && router !== source.kind)
			continue;
		const override =
			adapter.id === "next"
				? source.kind === "app"
					? options.appDir
					: options.pagesDir
				: primary && !source.api
					? options.routesDir
					: undefined;
		if (!source.api) primary = false;
		if (override === false) continue;
		if (typeof override === "string") {
			const directory = resolve(root, override);
			if (!(await isDirectory(directory)))
				invalid(`Routes directory not found: ${override}`);
			sources.push({ kind: source.kind, directory, prefix: source.prefix });
			continue;
		}
		for (const candidate of source.candidates) {
			const directory = resolve(root, candidate);
			if (await isDirectory(directory)) {
				sources.push({ kind: source.kind, directory, prefix: source.prefix });
				break;
			}
		}
	}
	return sources;
}

function pageExtensionsOf(adapter: Adapter, options: GeneratorOptions) {
	return [...(options.pageExtensions ?? adapter.extensions)].sort(
		(a, b) => b.length - a.length,
	);
}
function mapFile(
	adapter: Adapter,
	source: Source,
	parts: string[],
	name: string,
	extensions: readonly string[],
	includeApi: boolean,
) {
	if (/\.d\.[cm]?ts$/.test(name)) return null;
	const extension = extensions.find((ext) => name.endsWith(`.${ext}`));
	if (!extension) return null;
	const stem = name.slice(0, -extension.length - 1);
	if (!stem) return null;
	return adapter.map({ kind: source.kind, parts, stem, extension, includeApi });
}

interface Candidate {
	path: string;
	file: string | null;
	router: string;
	variant?: boolean;
	localized?: boolean;
	api?: boolean;
}

/** Not configuration: lets an integration hand over the framework's table directly. */
export interface DiscoveryContext {
	/** The route table, e.g. from the Nuxt module's pages:resolved hook. */
	frameworkTable?: FrameworkTable;
}

/** CLI/doctor only: reuse the last successfully resolved framework base.
 * Framework integrations do not read this snapshot, so removing a base clears it.
 */
export async function withCachedFrameworkBase(
	options: GeneratorOptions,
): Promise<GeneratorOptions> {
	// Validate before resolving a cache filename from framework configuration.
	options = validateOptions(options);
	if (options.defaults?.basePath !== undefined)
		return withFrameworkBase(options, undefined);
	const root = resolve(options.root ?? process.cwd());
	const framework = await resolveFramework(root, options);
	return withFrameworkBase(options, await readFrameworkBase(root, framework));
}

export async function discoverRoutes(
	input: GeneratorOptions = {},
	context: DiscoveryContext = {},
): Promise<Discovery> {
	const options = validateOptions(input);
	const root = resolve(options.root ?? process.cwd());
	const framework = await resolveFramework(root, options);
	const adapter = adapters[framework];
	const requested = options.discovery ?? "framework";
	const source: DiscoverySource = {
		requested,
		used: "files",
		inputs: [],
	};
	let table: FrameworkTable | undefined;
	if (requested === "framework" && frameworkSources[framework]) {
		const lookup = context.frameworkTable
			? { table: context.frameworkTable }
			: await frameworkTable(root, framework);
		if ("table" in lookup) {
			table = lookup.table;
			source.used = "framework";
			source.artifact = table.artifact;
			source.inputs = table.inputs;
		} else {
			source.fallback = lookup.unavailable;
			source.inputs = lookup.inputs ?? [];
		}
	}
	const extensions = pageExtensionsOf(adapter, options);
	const includeApi = options.includeApi === true;
	const exclude = (options.exclude ?? []).map(globToRegExp);
	const excluded = (path: string) =>
		exclude.some((pattern) => pattern.test(path));
	const sources = await resolveSources(root, adapter, options);
	// With the framework's table, page directories are only scanned for
	// endpoints (includeApi), and none is required.
	if (!sources.length && framework !== "manual" && !table) {
		const expected =
			framework === "next"
				? options.router && options.router !== "auto"
					? options.router
					: "app or pages"
				: adapter.sources
						.filter((item) => !item.api)
						.flatMap((item) => item.candidates)
						.join(" or ");
		error(
			`No ${expected} directory found in ${root} for ${adapter.label}. Set "framework" (${frameworks.join(", ")}) or a custom routes directory.`,
			{
				option: framework === "next" ? "appDir/pagesDir" : "routesDir",
				hint: `Create ${expected}, point ${framework === "next" ? "appDir or pagesDir" : "routesDir"} to your routes directory, or set framework explicitly.`,
			},
		);
	}
	const candidates: Candidate[] = [];
	if (table) {
		const pageKind = adapter.sources.find((item) => !item.api)?.kind ?? "pages";
		for (const route of table.routes) {
			if (route.file && excluded(route.file)) continue;
			try {
				parsePattern(route.path);
			} catch (caught) {
				if (caught instanceof NamedRouteError)
					throw new NamedRouteError(
						"GENERATION_ERROR",
						`${caught.message} (${route.file ?? table.artifact})`,
						{
							...caught.details,
							...(route.file ? { file: route.file } : {}),
							hint: 'The framework reported a route this package cannot name; exclude its file, or use discovery: "files".',
						},
					);
				throw caught;
			}
			candidates.push({
				path: route.path,
				file: route.file,
				router: pageKind,
				...(route.alias ? { variant: true } : {}),
			});
		}
	}
	for (const source of sources) {
		if (
			table &&
			!adapter.sources.find((item) => item.kind === source.kind)?.api
		)
			continue;
		const walk = async (parts: string[]): Promise<void> => {
			const children = await readdir(resolve(source.directory, ...parts), {
				withFileTypes: true,
			});
			children.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
			for (const child of children) {
				if (child.isSymbolicLink()) continue;
				const absolute = resolve(source.directory, ...parts, child.name);
				const file = posix(relative(root, absolute));
				if (excluded(file) || (child.isDirectory() && excluded(`${file}/`)))
					continue;
				if (child.isDirectory()) {
					if (
						child.name === "node_modules" ||
						adapter.skipDirectory(child.name, { kind: source.kind, parts })
					)
						continue;
					await walk([...parts, child.name]);
				} else if (child.isFile()) {
					let mapped: ReturnType<typeof mapFile>;
					try {
						mapped = mapFile(
							adapter,
							source,
							parts,
							child.name,
							extensions,
							includeApi,
						);
						if (!mapped) continue;
						if (source.prefix && mapped.path !== "/")
							mapped = { ...mapped, path: `${source.prefix}${mapped.path}` };
						else if (source.prefix) mapped = { ...mapped, path: source.prefix };
						parsePattern(mapped.path);
					} catch (caught) {
						if (caught instanceof NamedRouteError)
							throw new NamedRouteError(
								caught.code,
								`${caught.message} (${file})`,
								{
									...caught.details,
									file,
									hint:
										caught.details.hint ??
										"Rename the file to a supported convention, or list it in exclude.",
								},
							);
						throw caught;
					}
					candidates.push({ ...mapped, router: source.kind, file });
				}
			}
		};
		await walk([]);
	}

	// i18n: strip the locale segment ([locale] folder or physical locale folders).
	const i18n = options.i18n;
	if (i18n) {
		const params =
			i18n.localeParam === false
				? []
				: typeof i18n.localeParam === "string"
					? [i18n.localeParam]
					: [...(i18n.localeParam ?? ["locale", "lang"])];
		const locales = new Set<string>(
			Array.isArray(i18n.locales) ? i18n.locales : [],
		);
		let segmented = false;
		for (const candidate of candidates) {
			const [first, ...rest] = parsePattern(candidate.path);
			if (
				first &&
				(first.kind === "dynamic" || first.kind === "optionalDynamic") &&
				params.includes(first.name)
			) {
				segmented = true;
				candidate.path = formatPattern(rest);
				candidate.localized = true;
			} else if (first?.kind === "static" && locales.has(first.value)) {
				candidate.path = formatPattern(rest);
				candidate.localized = true;
				candidate.variant = true;
			}
		}
		// Without a [locale] folder (Pages Router i18n, @nuxtjs/i18n, middleware
		// rewrites) every page is localized; endpoints never are.
		for (const candidate of candidates)
			candidate.localized ??= !segmented && !candidate.api;
	}

	const rank = (item: Candidate) =>
		(item.variant ? 0 : 2) + (item.localized === false ? 0 : 1);
	const paths = new Map<string, Candidate>();
	for (const candidate of candidates) {
		const key = shape(candidate.path);
		const previous = paths.get(key);
		if (!previous) {
			paths.set(key, candidate);
			continue;
		}
		const conflict = (): never =>
			error(`Route conflict: ${previous.file} and ${candidate.file}`, {
				file: candidate.file ?? undefined,
				files: [previous.file, candidate.file].filter(
					(file): file is string => !!file,
				),
				pattern: candidate.path,
				hint: "Both files resolve to the same URL; remove or rename one, or exclude it.",
			});
		if (previous.path !== candidate.path) conflict();
		if (
			adapter.strictDuplicates &&
			previous.localized === candidate.localized &&
			(previous.router !== candidate.router ||
				(!previous.variant && !candidate.variant))
		)
			conflict();
		if (rank(candidate) > rank(previous)) paths.set(key, candidate);
	}
	if (adapter.strictDuplicates)
		for (const candidate of paths.values()) {
			const parts = parsePattern(candidate.path);
			if (candidate.variant || parts.at(-1)?.kind !== "optional") continue;
			const base = shape(formatPattern(parts.slice(0, -1)));
			const others = [
				paths.get(base),
				paths.get(`${base}${base ? "/" : ""}[catchAll]`),
			];
			if (
				others.some((other) => other && !other.variant && other !== candidate)
			)
				error(`Optional catch-all route conflict: ${candidate.file}`, {
					file: candidate.file ?? undefined,
					pattern: candidate.path,
					hint: "An optional catch-all also matches its parent URL; remove the parent page or use a required catch-all [...name].",
				});
		}

	const aliases = options.names ?? {};
	const discovered = [...paths.values()];
	for (const path of Object.keys(aliases))
		if (!discovered.some((item) => item.path === path)) {
			const suggestion = closest(
				path,
				discovered.map((item) => item.path),
			);
			error(`Named path not found: ${path}`, {
				option: "names",
				pattern: path,
				hint: suggestion
					? `Did you mean "${suggestion}"? Keys of names are URL patterns of discovered pages.`
					: "Keys of names are URL patterns of discovered pages; run named-routes list to see them.",
			});
		}
	const entries: DiscoveredRoute[] = [];
	for (const candidate of discovered) {
		let name = Object.hasOwn(aliases, candidate.path)
			? aliases[candidate.path]
			: automaticName(candidate.path, options.naming);
		if (!Object.hasOwn(aliases, candidate.path) && options.naming?.transform) {
			const transformed = options.naming.transform({
				path: candidate.path,
				name,
				segments: parsePattern(candidate.path),
				file: candidate.file,
				router: candidate.router,
			});
			if (transformed !== undefined && transformed !== null) {
				if (typeof transformed !== "string" || !transformed)
					invalid(
						`naming.transform returned an invalid name for ${candidate.path}`,
					);
				name = transformed;
			}
		}
		entries.push({
			name,
			path: candidate.path,
			file: candidate.file,
			router: candidate.router,
			framework,
			...(candidate.variant ? { variant: true } : {}),
			...(i18n ? { localized: candidate.localized !== false } : {}),
		});
	}
	if (options.extraRoutes !== undefined)
		for (const [name, path] of Object.entries(options.extraRoutes))
			entries.push({
				name,
				path,
				file: null,
				router: "explicit",
				framework,
				...(i18n ? { localized: true } : {}),
			});
	const names = new Set<string>();
	for (const entry of entries) {
		if (names.has(entry.name))
			error(
				`Route name collision: ${entry.name}; configure names to disambiguate`,
				{
					route: entry.name,
					file: entry.file ?? undefined,
					files: entries
						.filter((other) => other.name === entry.name && other.file)
						.map((other) => other.file as string),
					option: "names",
					hint: `Give one of the paths a custom name, e.g. names: { ${JSON.stringify(entry.path)}: "${entry.name}.alt" }.`,
				},
			);
		names.add(entry.name);
	}
	entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
	const routes = Object.fromEntries(
		entries.map((entry) => [entry.name, entry.path]),
	);
	const defaults = runtimeDefaults(options, entries);
	createRoutes(routes, defaults);
	return {
		root,
		framework,
		discovery: source,
		directories: sources.map(
			(source) => posix(relative(root, source.directory)) || ".",
		),
		sources: sources.map(({ kind, directory }) => ({ kind, directory })),
		routes,
		entries,
		defaults,
	};
}

function runtimeDefaults(
	options: GeneratorOptions,
	entries: DiscoveredRoute[],
): RouteDefaults {
	const defaults: RouteDefaults = {};
	const input = options.defaults ?? {};
	// Only known public keys are serialized into the (client-visible) module.
	// Normalize before serialization so CLI check and framework output agree.
	if (input.basePath !== undefined)
		defaults.basePath = normalizeBasePath(input.basePath);
	if (input.trailingSlash !== undefined)
		defaults.trailingSlash = input.trailingSlash;
	if (input.origin !== undefined) defaults.origin = input.origin;
	// Type-only: typed is the createRoutes default; "string" selects the 1.x overload.
	if (options.hrefs === "string") defaults.hrefs = "string";
	const i18n = options.i18n;
	if (i18n) {
		const unlocalized = [
			...new Set([
				...entries
					.filter((entry) => entry.localized === false)
					.map((entry) => entry.name),
				...(i18n.unlocalized ?? []),
			]),
		].sort();
		defaults.i18n = {
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			...(i18n.localePrefix !== undefined
				? { localePrefix: i18n.localePrefix }
				: {}),
			...(i18n.pathnames !== undefined ? { pathnames: i18n.pathnames } : {}),
			...(i18n.domains !== undefined ? { domains: i18n.domains } : {}),
			...(unlocalized.length ? { unlocalized } : {}),
		};
	}
	return defaults;
}

const QUERIES = "$routeQueries";
function render(
	discovery: Discovery,
	options: GeneratorOptions,
	format: "ts" | "js",
	querySpecifier?: string,
) {
	const names = {
		routes: "routes",
		route: "route",
		routeName: "RouteName",
		routeLocale: "RouteLocale",
		...options.exportNames,
	};
	const literal = `{\n${Object.entries(discovery.routes)
		.map(
			([name, path]) => `  [${JSON.stringify(name)}]: ${JSON.stringify(path)}`,
		)
		.join(",\n")}\n}`;
	const manifest =
		format === "ts"
			? `${literal} as const`
			: `/** @type {const} */ (${literal})`;
	const source = JSON.stringify(options.importSource ?? PACKAGE);
	const lines = [generatedHeader];
	const locales = discovery.defaults.i18n?.locales ?? [];
	const defaults = JSON.stringify(discovery.defaults, null, 2);
	// TypeScript outputs import the schemas as types only (nothing is bundled)
	// unless validateQuery; JavaScript outputs need the value for inference.
	const typeOnly =
		querySpecifier !== undefined && format === "ts" && !options.validateQuery;
	lines.push(
		typeOnly
			? `import { createRoutes, type TypeOnlyQueries } from ${source};`
			: `import { createRoutes } from ${source};`,
	);
	if (querySpecifier !== undefined)
		lines.push(
			`import ${typeOnly ? "type " : ""}${QUERIES} from ${JSON.stringify(querySpecifier)};`,
		);
	lines.push(
		"",
		`export const ${names.routes} = Object.freeze(${manifest});`,
		"",
	);
	if (querySpecifier === undefined)
		lines.push(
			`export const ${names.route} = createRoutes(${names.routes}, ${defaults});`,
		);
	else if (typeOnly)
		lines.push(
			`export const ${names.route} = createRoutes<typeof ${names.routes}, ${locales.length ? locales.map((locale) => JSON.stringify(locale)).join(" | ") : "never"}, TypeOnlyQueries<typeof ${QUERIES}>>(${names.routes}, ${defaults});`,
		);
	else
		lines.push(
			`export const ${names.route} = createRoutes(${names.routes}, ${defaults}, { query: ${QUERIES}, validateQuery: ${options.validateQuery === true} });`,
		);
	if (format === "ts") {
		lines.push(
			`export type ${names.routeName} = keyof typeof ${names.routes};`,
		);
		if (locales.length)
			lines.push(
				`export type ${names.routeLocale} = ${locales.map((locale) => JSON.stringify(locale)).join(" | ")};`,
			);
	} else {
		lines.push(
			`/** @typedef {keyof typeof ${names.routes}} ${names.routeName} */`,
		);
		if (locales.length)
			lines.push(
				`/** @typedef {${locales.map((locale) => JSON.stringify(locale)).join(" | ")}} ${names.routeLocale} */`,
			);
	}
	return `${lines.join("\n")}\n`;
}

export async function generateRoutes(
	options: GeneratorOptions = {},
	{ check = false, ...context }: { check?: boolean } & DiscoveryContext = {},
) {
	const result = await discoverRoutes(options, context);
	const output = resolve(
		result.root,
		options.output ?? "src/routes.generated.ts",
	);
	const format =
		/\.m?ts$/.test(output) && !/\.d\.m?ts$/.test(output)
			? "ts"
			: /\.m?js$/.test(output)
				? "js"
				: invalid("output must end in .ts, .mts, .js or .mjs (not .d.ts)", {
						option: "output",
					});
	// An output module inside a routes directory could itself become a page.
	const adapter = adapters[result.framework];
	const extensions = pageExtensionsOf(adapter, options);
	for (const source of result.sources) {
		const offset = relative(source.directory, output);
		const local = posix(offset);
		if (local === ".." || local.startsWith("../") || isAbsolute(offset))
			continue;
		const parts = local.split("/");
		const name = parts.pop() ?? "";
		const kind = source.kind;
		let routable: unknown;
		try {
			routable = mapFile(adapter, source, parts, name, extensions, true);
		} catch {
			routable = true;
		}
		if (routable)
			invalid(
				`Place generated output outside routable ${kind} files: ${output}`,
				{
					option: "output",
					hint: "Write the module outside the routes directory, e.g. src/routes.generated.ts.",
				},
			);
	}
	let querySpecifier: string | undefined;
	if (options.query !== undefined) {
		const module = resolve(result.root, options.query);
		let found = false;
		try {
			found = (await stat(module)).isFile();
		} catch (caught) {
			if ((caught as NodeJS.ErrnoException).code !== "ENOENT") throw caught;
		}
		if (!found)
			invalid(`Query module not found: ${options.query}`, {
				option: "query",
				file: options.query,
				hint: "Create it with export default defineQuery({ ... }) or fix the path.",
			});
		let specifier = posix(relative(dirname(output), module))
			.replace(/\.tsx?$/, ".js")
			.replace(/\.mts$/, ".mjs")
			.replace(/\.cts$/, ".cjs");
		if (!specifier.startsWith(".")) specifier = `./${specifier}`;
		// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
		if (/[\u0000-\u001f'"`\\]/.test(specifier))
			invalid("query path contains unsupported characters", {
				option: "query",
			});
		querySpecifier = specifier;
	}
	const content = render(result, options, format, querySpecifier);
	let previous: string | undefined;
	try {
		previous = await readFile(output, "utf8");
	} catch (caught: unknown) {
		if ((caught as NodeJS.ErrnoException).code !== "ENOENT") throw caught;
	}
	const changed = previous !== content;
	if (changed && check)
		error(
			`Named routes are out of date: ${output}. Run named-routes generate.`,
			{
				file: posix(relative(result.root, output)),
				hint: "Run named-routes generate (or start the dev server) and commit the result.",
			},
		);
	if (changed) {
		if (
			previous !== undefined &&
			!generatedHeaders.some((header) => previous.startsWith(header))
		)
			error(`Refusing to overwrite a non-generated file: ${output}`, {
				file: posix(relative(result.root, output)),
				option: "output",
				hint: "Point output to a new file such as src/routes.generated.ts, or delete this file if it is not yours.",
			});
		await mkdir(dirname(output), { recursive: true });
		const temporary = `${output}.${randomUUID()}.tmp`;
		try {
			// wx: never follow or reuse a pre-existing path.
			await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
			await rename(temporary, output);
		} finally {
			await unlink(temporary).catch((caught: NodeJS.ErrnoException) => {
				if (caught.code !== "ENOENT") throw caught;
			});
		}
	}
	return { ...result, output, changed };
}
