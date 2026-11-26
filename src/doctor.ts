/**
 * `named-routes doctor`: read-only diagnostics. Never writes files and never
 * executes application code; source checks are plain-text heuristics and are
 * labeled as such.
 */
import type { Dirent } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { findConfiguration, loadConfiguration } from "./config.js";
import { adapters, detectFramework, type FrameworkId } from "./frameworks.js";
import {
	type DiscoveredRoute,
	discoverRoutes,
	type GeneratorOptions,
	generateRoutes,
	withCachedFrameworkBase,
} from "./generator.js";
import { NamedRouteError, type NamedRouteErrorDetails } from "./index.js";
import { frameworkSources } from "./sources.js";

/** Minimum versions of 2.0. */
export const minimumNode = "22.12.0";
export const minimumTypeScript = "5.4.0";

export type DiagnosticLevel = "error" | "warning" | "info";
export interface Diagnostic {
	/** Stable identifier, e.g. "discovery.conflict". */
	readonly id: string;
	readonly level: DiagnosticLevel;
	readonly message: string;
	readonly details?: NamedRouteErrorDetails & { readonly code?: string };
}
export interface Diagnosis {
	readonly root: string;
	readonly framework?: FrameworkId;
	readonly diagnostics: readonly Diagnostic[];
	readonly routes: readonly Pick<DiscoveredRoute, "name" | "path" | "file">[];
	readonly summary: {
		readonly errors: number;
		readonly warnings: number;
		readonly info: number;
	};
}

const posix = (value: string) => value.split(sep).join("/");
async function read(path: string) {
	try {
		return await readFile(path, "utf8");
	} catch (caught) {
		const code = (caught as NodeJS.ErrnoException).code;
		if (code === "ENOENT" || code === "ENOTDIR" || code === "EISDIR")
			return undefined;
		throw caught;
	}
}
async function firstExisting(root: string, names: readonly string[]) {
	for (const name of names) {
		const content = await read(join(root, name));
		if (content !== undefined) return { name, content };
	}
	return undefined;
}
async function* files(
	directory: string,
	extensions: RegExp,
	depth = 0,
): AsyncGenerator<string> {
	if (depth > 12) return;
	let children: Dirent[];
	try {
		children = await readdir(directory, { withFileTypes: true });
	} catch {
		return;
	}
	for (const child of children) {
		if (
			child.isSymbolicLink() ||
			child.name === "node_modules" ||
			child.name.startsWith(".")
		)
			continue;
		const path = join(directory, child.name);
		if (child.isDirectory()) yield* files(path, extensions, depth + 1);
		else if (child.isFile() && extensions.test(child.name)) yield path;
	}
}
function fromError(
	id: string,
	caught: unknown,
	level: DiagnosticLevel = "error",
): Diagnostic {
	if (caught instanceof NamedRouteError)
		return {
			id,
			level,
			message: caught.message,
			details: { code: caught.code, ...caught.details },
		};
	return {
		id,
		level,
		message: caught instanceof Error ? caught.message : String(caught),
	};
}
const versionOf = (value: string) =>
	value
		.replace(/^v/, "")
		.split(".")
		.map((part) => Number.parseInt(part, 10) || 0);
const atLeast = (version: string, minimum: string) => {
	const [a, b, c] = versionOf(version);
	const [x, y, z] = versionOf(minimum);
	return a !== x ? a > x : b !== y ? b > y : c >= z;
};

function integrationNames(framework: FrameworkId) {
	return framework === "next"
		? [
				"next.config.ts",
				"next.config.mts",
				"next.config.mjs",
				"next.config.js",
				"next.config.cjs",
			]
		: framework === "nuxt"
			? ["nuxt.config.ts", "nuxt.config.mjs", "nuxt.config.js"]
			: framework === "astro"
				? ["astro.config.mjs", "astro.config.ts", "astro.config.js"]
				: [
						"vite.config.ts",
						"vite.config.mts",
						"vite.config.mjs",
						"vite.config.js",
					];
}
const integrationFile = (root: string, framework: FrameworkId) =>
	framework === "manual"
		? Promise.resolve(undefined)
		: firstExisting(root, integrationNames(framework));

export interface DiagnoseOptions {
	nodeVersion?: string;
	/** Also list what a 1.x project must change for 2.0 (doctor --v2). */
	v2?: boolean;
}

export async function diagnose(
	inline: GeneratorOptions & { config?: string } = {},
	{ nodeVersion = process.version, v2 = false }: DiagnoseOptions = {},
): Promise<Diagnosis> {
	const diagnostics: Diagnostic[] = [];
	const add = (diagnostic: Diagnostic) => diagnostics.push(diagnostic);
	const root = resolve(inline.root ?? process.cwd());
	const { config, ...overrides } = inline;

	// ---------------------------------------------------------------- Node
	if (!atLeast(nodeVersion, minimumNode))
		add({
			id: "node.version",
			level: "error",
			message: `Node.js ${nodeVersion} is not supported; use 22.12 or newer.`,
		});
	else
		add({
			id: "node.version",
			level: "info",
			message: `Node.js ${nodeVersion}`,
		});

	// --------------------------------------------------------- configuration
	let options: GeneratorOptions | undefined;
	let configText: string | undefined;
	try {
		const found = await findConfiguration(root, config);
		if (found) configText = await read(found.path);
		add({
			id: "config.file",
			level: "info",
			message: found
				? `Configuration: ${posix(relative(root, found.path))}`
				: "No named-routes config file (defaults and plugin options apply).",
		});
		const loaded = await loadConfiguration(root, config);
		// Match CLI generation; merge defaults rather than replacing them.
		options = await withCachedFrameworkBase({
			...loaded,
			...overrides,
			root: loaded.root ?? root,
			...(loaded.defaults || overrides.defaults
				? { defaults: { ...loaded.defaults, ...overrides.defaults } }
				: {}),
		});
	} catch (caught) {
		add(fromError("config.load", caught));
	}

	// -------------------------------------------------------------- package
	const manifestText = await read(join(root, "package.json"));
	let dependencies: Record<string, string> = {};
	if (manifestText === undefined)
		add({
			id: "package.missing",
			level: "warning",
			message: "No package.json in the project root.",
			details: {
				hint: "Run doctor from the application directory or pass --root.",
			},
		});
	else
		try {
			const manifest = JSON.parse(manifestText) as Record<string, unknown>;
			for (const key of [
				"dependencies",
				"devDependencies",
				"optionalDependencies",
			])
				if (manifest[key] && typeof manifest[key] === "object")
					Object.assign(dependencies, manifest[key]);
		} catch {
			add({
				id: "package.invalid",
				level: "error",
				message: "package.json is not valid JSON.",
				details: { file: "package.json" },
			});
			dependencies = {};
		}
	const typescript = await read(
		join(root, "node_modules/typescript/package.json"),
	);
	if (typescript) {
		const version = (JSON.parse(typescript) as { version: string }).version;
		if (!atLeast(version, minimumTypeScript))
			add({
				id: "typescript.version",
				level: "error",
				message: `TypeScript ${version} is too old for the exported types; use 5.4 or newer.`,
			});
		else
			add({
				id: "typescript.version",
				level: "info",
				message: `TypeScript ${version}`,
			});
	}

	let framework: FrameworkId | undefined;
	let discoveredPaths: Set<string> | undefined;
	let usedFramework = false;
	const routes: Diagnosis["routes"][number][] = [];
	if (options) {
		const explicit = options.framework && options.framework !== "auto";
		const detected = detectFramework(dependencies);
		if (
			!explicit &&
			!detected &&
			!options.router &&
			options.appDir === undefined &&
			options.pagesDir === undefined
		)
			add({
				id: "framework.fallback",
				level: "warning",
				message:
					"No supported framework found in package.json; assuming Next.js.",
				details: {
					option: "framework",
					hint: "Set framework explicitly (next, nuxt, vue, sveltekit, astro, react-router, tanstack-router or manual).",
				},
			});

		// ---------------------------------------------------------- discovery
		try {
			const discovery = await discoverRoutes(options);
			framework = discovery.framework;
			add({
				id: "framework.detected",
				level: "info",
				message: `Framework: ${adapters[framework].label}${explicit ? " (configured)" : ""}; scanned ${discovery.directories.join(", ") || "no directories"}.`,
			});
			const source = discovery.discovery;
			usedFramework = source.used === "framework";
			discoveredPaths = new Set(discovery.entries.map((entry) => entry.path));
			if (usedFramework)
				add({
					id: "discovery.source",
					level: "info",
					message: `Routes come from the framework: ${source.artifact}.`,
				});
			else if (source.fallback && frameworkSources[framework])
				add({
					id: "discovery.fallback",
					level: "warning",
					message: `Framework discovery is unavailable, so routes come from the files: ${source.fallback}.`,
					details: {
						option: "discovery",
						hint: 'Run the dev server or build once so the framework writes its route table, or set discovery: "files".',
					},
				});
			else
				add({
					id: "discovery.source",
					level: "info",
					message: frameworkSources[framework]
						? 'Routes come from the files (discovery: "files").'
						: `Routes come from the files (${adapters[framework].label} has no framework route table).`,
				});
			// Where the framework and the file conventions disagree.
			if (usedFramework)
				try {
					const files = await discoverRoutes({
						...options,
						discovery: "files",
					});
					const fromFiles = new Set(files.entries.map((entry) => entry.path));
					for (const entry of discovery.entries)
						if (entry.router !== "explicit" && !fromFiles.has(entry.path))
							add({
								id: "discovery.framework-only",
								level: "info",
								message: `${entry.path} (${entry.name}) exists only in the framework's route table; the file conventions do not produce it.`,
								details: {
									route: entry.name,
									...(entry.file ? { file: entry.file } : {}),
								},
							});
					for (const entry of files.entries)
						if (entry.router !== "explicit" && !discoveredPaths.has(entry.path))
							add({
								id: "discovery.files-only",
								level: "info",
								message: `${entry.path} follows the file conventions but the framework does not serve it.`,
								details: {
									...(entry.file ? { file: entry.file } : {}),
									hint: 'Check definePageMeta/definePage path overrides or routes.ts; discovery: "files" restores the file view.',
								},
							});
				} catch {
					// The file view can fail (e.g. a code-only route table); not a problem of the project.
				}
			for (const entry of discovery.entries)
				routes.push({ name: entry.name, path: entry.path, file: entry.file });
			add({
				id: "routes.count",
				level: "info",
				message: `${discovery.entries.length} routes discovered.`,
			});
			if (!discovery.entries.length)
				add({
					id: "routes.empty",
					level: "warning",
					message: "No routes were discovered.",
					details: {
						hint: "Check the routes directory, pageExtensions and exclude.",
					},
				});
			if (options.i18n && !discovery.entries.some((entry) => entry.localized))
				add({
					id: "i18n.unused",
					level: "warning",
					message: "i18n is configured but no route is localized.",
					details: { option: "i18n" },
				});
		} catch (caught) {
			add(fromError("discovery.failed", caught));
		}

		// Options passed inline to the plugin are code; doctor does not run it.
		const integration = framework
			? await integrationFile(root, framework)
			: undefined;
		const inline =
			!!integration &&
			(framework === "next"
				? /withNamedRoutes\([\s\S]*,\s*\{/.test(integration.content)
				: /namedRoutes\(\s*\{/.test(integration.content));
		if (inline && integration)
			add({
				id: "integration.inline-options",
				level: "info",
				message: `${integration.name} passes options inline; doctor cannot evaluate code, so it checks only the config file and CLI flags.`,
				details: {
					file: integration.name,
					hint: "Move shared options (output, names, i18n...) to named-routes.config.*, or pass --output to doctor.",
				},
			});

		// ---------------------------------------------------------- output
		if (framework) {
			const output = resolve(root, options.output ?? "src/routes.generated.ts");
			const local = posix(relative(root, output));
			if (local.startsWith("../") || isAbsolute(local))
				add({
					id: "output.outside",
					level: "warning",
					message: `The generated module is outside the project root: ${output}`,
					details: { option: "output" },
				});
			let exists = false;
			try {
				exists = (await stat(output)).isFile();
			} catch {}
			if (!exists)
				add({
					id: "output.missing",
					level: inline ? "info" : "warning",
					message: `Generated module not found: ${local}`,
					details: {
						file: local,
						hint: "It is created by the dev server/build integration or by named-routes generate.",
					},
				});
			else
				try {
					await generateRoutes(options, { check: true });
					add({
						id: "output.current",
						level: "info",
						message: `Generated module is current: ${local}`,
					});
				} catch (caught) {
					add(
						fromError(
							"output.stale",
							caught,
							caught instanceof NamedRouteError &&
								/out of date/.test(caught.message)
								? "warning"
								: "error",
						),
					);
				}
		}
	}

	// ---------------------------------------------- integration (heuristic)
	if (framework === "next") {
		const nextConfig = await integrationFile(root, framework);
		if (!nextConfig)
			add({
				id: "integration.next",
				level: "warning",
				message:
					"No next.config file found; withNamedRoutes() keeps the module current in next dev.",
				details: {
					hint: "Wrap your Next config with withNamedRoutes from @triooo/named-routes/next.",
				},
			});
		else if (!nextConfig.content.includes("withNamedRoutes"))
			add({
				id: "integration.next",
				level: "warning",
				message: `${nextConfig.name} does not appear to use withNamedRoutes() (text check).`,
				details: {
					file: nextConfig.name,
					hint: "Wrap the config: export default withNamedRoutes(nextConfig).",
				},
			});
		else
			add({
				id: "integration.next",
				level: "info",
				message: `${nextConfig.name} uses withNamedRoutes().`,
			});
		if (
			nextConfig &&
			/typedRoutes\s*:\s*true/.test(nextConfig.content) &&
			(options?.hrefs === "string" ||
				/hrefs\s*:\s*["']string["']/.test(nextConfig.content))
		)
			add({
				id: "typescript.typed-routes",
				level: "warning",
				message:
					'Next.js typedRoutes is enabled but hrefs is "string"; <Link> will reject route() results.',
				details: {
					option: "hrefs",
					hint: 'Remove hrefs: "string" (typed is the default) or set hrefs: "typed".',
				},
			});
	} else if (framework === "nuxt") {
		const found = await integrationFile(root, framework);
		const module = !!found?.content.includes("@triooo/named-routes/nuxt");
		const plugin = !!found?.content.includes("namedRoutes(");
		if (module)
			add({
				id: "integration.nuxt",
				level: "info",
				message: `${found?.name} registers the @triooo/named-routes/nuxt module.`,
			});
		else
			add({
				id: "integration.nuxt",
				level: "warning",
				message: plugin
					? `${found?.name} uses the Vite plugin; the Nuxt module also names definePageMeta({ path, alias }) and module-added pages (text check).`
					: `${found?.name ?? "nuxt.config.ts"} does not appear to register @triooo/named-routes/nuxt (text check).`,
				details: {
					file: found?.name,
					hint: 'Add modules: ["@triooo/named-routes/nuxt"] (and remove the Vite plugin).',
				},
			});
		if (module && plugin)
			add({
				id: "integration.nuxt-duplicate",
				level: "warning",
				message: `${found?.name} registers both the Nuxt module and the Vite plugin; both write the module.`,
				details: { file: found?.name, hint: "Keep only the Nuxt module." },
			});
	} else if (framework && framework !== "manual") {
		const names = integrationNames(framework);
		const found = await integrationFile(root, framework);
		if (!found?.content.includes("namedRoutes"))
			add({
				id: "integration.vite",
				level: "warning",
				message: `${found?.name ?? names[0]} does not appear to register the namedRoutes() Vite plugin (text check).`,
				details: {
					file: found?.name,
					hint: "Add namedRoutes() from @triooo/named-routes/vite to the Vite plugins.",
				},
			});
		else
			add({
				id: "integration.vite",
				level: "info",
				message: `${found.name} registers namedRoutes().`,
			});
	}

	// -------------------------------- unsupported declarations (heuristic)
	if (framework === "nuxt" && !usedFramework)
		for (const candidate of ["app/pages", "pages", "src/pages"])
			for await (const file of files(
				join(root, candidate),
				/\.(vue|tsx?|jsx?)$/,
			)) {
				const content = await read(file);
				if (content && /definePageMeta\s*\(\s*\{[^}]*\bpath\s*:/s.test(content))
					add({
						id: "declarations.nuxt-path",
						level: "warning",
						message:
							"definePageMeta({ path }) changes a URL the file scanner cannot see (text check).",
						details: {
							file: posix(relative(root, file)),
							option: "extraRoutes",
							hint: "Use the @triooo/named-routes/nuxt module (framework discovery), or add the real URL with extraRoutes.",
						},
					});
			}
	if (framework === "react-router" && !usedFramework) {
		const routesFile = await firstExisting(root, [
			"app/routes.ts",
			"app/routes.js",
			"app/routes.mts",
			"app/routes.mjs",
		]);
		if (
			routesFile &&
			/\b(route|index|layout|prefix)\s*\(/.test(routesFile.content)
		)
			add({
				id: "declarations.react-router-config",
				level: "warning",
				message: `${routesFile.name} declares routes in code (route()/index()/layout()); only flatRoutes() files are discovered (text check).`,
				details: {
					file: routesFile.name,
					option: "extraRoutes",
					hint: 'Use discovery: "framework" (default) with @react-router/dev installed, or map the URLs with extraRoutes.',
				},
			});
	}
	if (options?.query !== undefined) {
		let exists = false;
		try {
			exists = (await stat(resolve(root, options.query))).isFile();
		} catch {}
		if (!exists)
			add({
				id: "query.missing",
				level: "error",
				message: `Query module not found: ${options.query}`,
				details: { option: "query", file: options.query },
			});
	}

	if (v2)
		await migrationDiagnostics({
			root,
			options,
			configText,
			framework,
			usedFramework,
			add,
		});

	const count = (level: DiagnosticLevel) =>
		diagnostics.filter((item) => item.level === level).length;
	return {
		root,
		...(framework ? { framework } : {}),
		diagnostics,
		routes,
		summary: {
			errors: count("error"),
			warnings: count("warning"),
			info: count("info"),
		},
	};
}

/** Human-readable report; symbols degrade to plain words without color. */
export function formatDiagnosis(
	diagnosis: Diagnosis,
	{ color = false }: { color?: boolean } = {},
) {
	const paint = (code: number, text: string) =>
		color ? `\u001b[${code}m${text}\u001b[0m` : text;
	const label = {
		error: paint(31, "error  "),
		warning: paint(33, "warning"),
		info: paint(36, "info   "),
	};
	const lines = [`named-routes doctor · ${diagnosis.root}`, ""];
	for (const item of diagnosis.diagnostics) {
		lines.push(`${label[item.level]}  ${item.message}`);
		const details = item.details ?? {};
		if (details.files?.length)
			lines.push(`         files: ${details.files.join(", ")}`);
		else if (details.file) lines.push(`         file:  ${details.file}`);
		if (details.route) lines.push(`         route: ${details.route}`);
		if (details.option) lines.push(`         option: ${details.option}`);
		if (details.hint) lines.push(`         fix:   ${details.hint}`);
	}
	const { errors, warnings, info } = diagnosis.summary;
	lines.push("", `${errors} error(s), ${warnings} warning(s), ${info} info.`);
	return `${lines.join("\n")}\n`;
}

/** doctor --v2: what a project written for 1.x must change for 2.0. */
async function migrationDiagnostics({
	root,
	options,
	configText,
	framework,
	usedFramework,
	add,
}: {
	root: string;
	options: GeneratorOptions | undefined;
	configText: string | undefined;
	framework: FrameworkId | undefined;
	usedFramework: boolean;
	add: (diagnostic: Diagnostic) => void;
}) {
	if (options && options.hrefs === undefined)
		add({
			id: "v2.hrefs",
			level: "warning",
			message:
				// biome-ignore lint/suspicious/noTemplateCurlyInString: the message shows a TypeScript template literal type
				"2.0 generates typed hrefs by default: route() returns types such as `/users/${string}`. A variable that stores route() and is later reassigned to another string no longer compiles.",
			details: {
				option: "hrefs",
				hint: 'Annotate such variables as string, or set hrefs: "string" (named-routes migrate --to 2 does it).',
			},
		});
	if (options && options.discovery === undefined && usedFramework) {
		try {
			const files = await discoverRoutes({ ...options, discovery: "files" });
			const current = await discoverRoutes(options);
			const before = JSON.stringify(files.routes);
			if (before !== JSON.stringify(current.routes))
				add({
					id: "v2.discovery",
					level: "warning",
					message: `2.0 reads routes from the framework (${current.discovery.artifact}); the generated routes differ from the 1.x file scan.`,
					details: {
						option: "discovery",
						hint: 'Review the discovery.* entries above, or set discovery: "files" to keep the 1.x routes (named-routes migrate --to 2 does it).',
					},
				});
		} catch {}
	}
	const tsconfig = await read(join(root, "tsconfig.json"));
	const resolution = tsconfig
		? /"moduleResolution"\s*:\s*"([^"]+)"/i.exec(tsconfig)?.[1]
		: undefined;
	if (resolution && /^(node|node10|classic)$/i.test(resolution))
		add({
			id: "v2.module-resolution",
			level: "error",
			message: `tsconfig.json uses moduleResolution "${resolution}"; 2.0 publishes its types through package exports only (typesVersions was removed).`,
			details: {
				file: "tsconfig.json",
				hint: 'Use "bundler" (Vite, Next.js) or "nodenext".',
			},
		});
	// Plain-text search for code that compares error codes.
	const users: string[] = [];
	for (const directory of ["src", "app", "pages", "lib", "server"])
		for await (const file of files(
			join(root, directory),
			/\.(ts|tsx|js|jsx|mjs|cjs|mts|cts|vue|svelte|astro)$/,
		)) {
			if (/routes\.generated\./.test(file)) continue;
			const content = await read(file);
			if (content?.includes("GENERATION_ERROR"))
				users.push(posix(relative(root, file)));
		}
	if (users.length)
		add({
			id: "v2.error-codes",
			level: "info",
			message:
				"Code compares error codes with GENERATION_ERROR; in 2.0 invalid router, pageExtensions and output options raise INVALID_CONFIG (text check).",
			details: { files: users, hint: "Check those comparisons." },
		});
	if (framework === "nuxt" && !configText?.includes("discovery"))
		add({
			id: "v2.nuxt-module",
			level: "info",
			message:
				"Nuxt: register @triooo/named-routes/nuxt so the routes Nuxt resolves (definePageMeta path/alias) are named.",
			details: { hint: 'modules: ["@triooo/named-routes/nuxt"]' },
		});
}
