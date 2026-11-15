/** Browser-safe URL generation. Node-only discovery lives in ./generator. */
import { closest } from "./suggest.js";

/** The empty object type (`{}` without its "any non-nullish value" meaning). */
type Empty = Record<never, never>;
export type RouteValue = string | number;
export type QueryValue = string | number | boolean | null | undefined;
export type LocalePrefixMode = "always" | "as-needed" | "never";
export type LocalePrefix<Locale extends string = string> =
	| LocalePrefixMode
	| {
			readonly mode: LocalePrefixMode;
			/** Custom URL prefixes per locale, e.g. `{ "en-US": "/us" }`. */
			readonly prefixes?: Readonly<Partial<Record<Locale, string>>>;
	  };
export interface LocaleDomain<Locale extends string = string> {
	readonly domain: string;
	readonly defaultLocale: Locale;
	readonly locales?: readonly Locale[];
	/** Use http:// instead of https:// for absolute URLs on this domain. */
	readonly http?: boolean;
}
/** Same shape as next-intl's `defineRouting()` and Next.js Pages Router `i18n`. */
export interface I18nOptions<Locale extends string = string> {
	readonly locales: readonly Locale[];
	readonly defaultLocale: Locale;
	/** Default: "always" (next-intl default). Next.js Pages Router i18n uses "as-needed". */
	readonly localePrefix?: LocalePrefix<Locale>;
	/** Internal pattern -> localized pattern (a string applies to every locale). */
	readonly pathnames?: Readonly<
		Record<string, string | Readonly<Partial<Record<Locale, string>>>>
	>;
	readonly domains?: readonly LocaleDomain<Locale>[];
	/** Route names that never receive a locale prefix (e.g. API endpoints). */
	readonly unlocalized?: readonly string[];
}
export interface RouteOptions<Locale extends string = string> {
	query?: Readonly<Record<string, QueryValue | readonly QueryValue[]>>;
	/** Fragment without the leading `#` (a single leading `#` is ignored). */
	hash?: string;
	absolute?: boolean;
	/** Framework links/routers usually add basePath. Enable only for plain URLs or fetch. */
	basePath?: boolean;
	/** Adds the locale prefix and localized pathname. Omit it for locale-aware links (next-intl, Pages Router i18n). */
	locale?: Locale;
}
export interface RouteDefaults<Locale extends string = string> {
	basePath?: string;
	trailingSlash?: boolean;
	origin?: string;
	i18n?: I18nOptions<Locale>;
	/**
	 * Return type of `route()`. "string" (default) keeps `string`; "typed"
	 * returns template literal types such as `/users/${string}` that Next.js
	 * typedRoutes and other typed routers accept without a cast. Type-only.
	 */
	hrefs?: HrefMode;
}
export type HrefMode = "string" | "typed";

// ------------------------------------------------------------ typed query
/** Query object accepted by route(): scalar values or arrays of them. */
export type QueryShape = Readonly<
	Record<string, QueryValue | readonly QueryValue[]>
>;
/** Issue reported by a Standard Schema validator. */
export interface StandardSchemaIssue {
	readonly message: string;
	readonly path?:
		| readonly (PropertyKey | { readonly key: PropertyKey })[]
		| undefined;
}
export type StandardSchemaResult<Output> =
	| { readonly value: Output; readonly issues?: undefined }
	| { readonly issues: readonly StandardSchemaIssue[] };
/**
 * The Standard Schema v1 interface (standardschema.dev), implemented by Zod
 * 3.24+, Valibot 1+, ArkType and others. Declared here as types only, so no
 * schema library becomes a dependency.
 */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
	readonly "~standard": {
		readonly version: 1;
		readonly vendor: string;
		readonly validate: (
			value: unknown,
		) => StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
		readonly types?:
			| { readonly input: Input; readonly output: Output }
			| undefined;
	};
}
/** A query described by a TypeScript type only (no runtime validation). */
export interface QueryType<Query extends QueryShape = QueryShape> {
	readonly kind: "query-type";
	/** Type carrier; never set at runtime. */
	readonly "~query"?: Query;
}
export type QuerySchema = StandardSchemaV1<QueryShape, unknown> | QueryType;
export type QuerySchemas = { readonly [name: string]: QuerySchema };
/** The query object a schema accepts. */
export type QueryInput<Schema> =
	Schema extends QueryType<infer Query>
		? Query
		: Schema extends {
					readonly "~standard": {
						readonly types?: { readonly input: infer Input } | undefined;
					};
				}
			? Input
			: never;
/**
 * Declares per-route query schemas (Standard Schema validators or
 * `defineQuery.type<T>()`), keyed by route name.
 */
export function defineQuery<const Schemas extends QuerySchemas>(
	schemas: Schemas,
): Schemas {
	return schemas;
}
/** A query typed by TypeScript only: `defineQuery.type<{ page?: number }>()`. */
defineQuery.type = <Query extends QueryShape>(): QueryType<Query> => ({
	kind: "query-type",
});
type QueryRequired<Queries, Name> = Name extends keyof Queries
	? Empty extends QueryInput<Queries[Name]>
		? false
		: true
	: false;
/** Route options for a name: its schema's query, or any query without a schema. */
type OptionsFor<
	Queries,
	Name,
	Locale extends string,
> = Name extends keyof Queries
	? Omit<RouteOptions<Locale>, "query"> &
			(QueryRequired<Queries, Name> extends true
				? { query: QueryInput<Queries[Name]> }
				: { query?: QueryInput<Queries[Name]> })
	: RouteOptions<Locale>;
/** Rejects schema keys that are not route names. */
type KnownQueries<Routes, Queries> = {
	readonly [Name in Exclude<keyof Queries, keyof Routes>]: never;
};
type ParamName<K extends string> = K extends
	| `${string}[${string}`
	| `${string}]${string}`
	| ""
	? never
	: K;
type Mixed<S extends string> = S extends `${string}[${infer K}]${infer Rest}`
	? { [P in ParamName<K>]: RouteValue } & Mixed<Rest>
	: Empty;
type Segment<S extends string> = S extends `[[...${infer K}]]`
	? { [P in ParamName<K>]?: readonly RouteValue[] | null }
	: S extends `[[${infer K}]]`
		? { [P in ParamName<K>]?: RouteValue | null }
		: S extends `[...${infer K}]`
			? { [P in ParamName<K>]: readonly RouteValue[] }
			: S extends `[${infer K}]`
				? [ParamName<K>] extends [never]
					? Mixed<S>
					: { [P in K]: RouteValue }
				: S extends `${string}[${string}]${string}`
					? Mixed<S>
					: Empty;
type Collect<P extends string> = P extends `${infer Head}/${infer Rest}`
	? Segment<Head> & Collect<Rest>
	: Segment<P>;
type LooseParams = Readonly<
	Record<string, RouteValue | readonly RouteValue[] | null | undefined>
>;
export type RouteParams<Path extends string> = string extends Path
	? LooseParams
	: keyof Collect<Path> extends never
		? Record<string, never>
		: { [K in keyof Collect<Path>]: Collect<Path>[K] };
type ArgsWith<Path extends string, Options> = string extends Path
	? [params?: LooseParams, options?: Options]
	: Empty extends Collect<Path>
		? [params?: RouteParams<Path>, options?: Options]
		: [params: RouteParams<Path>, options?: Options];
/** Parameters and options; options become required when the query has required keys. */
type Args<
	Path extends string,
	Options,
	OptionsRequired extends boolean = false,
> = OptionsRequired extends true
	? [
			params: string extends Path ? LooseParams : RouteParams<Path>,
			options: Options,
		]
	: ArgsWith<Path, Options>;
// ------------------------------------------------------- reverse routing
type MatchMixed<S extends string> =
	S extends `${string}[${infer K}]${infer Rest}`
		? { [P in ParamName<K>]: string } & MatchMixed<Rest>
		: Empty;
type MatchSegment<S extends string> = S extends `[[...${infer K}]]`
	? { [P in ParamName<K>]?: string[] }
	: S extends `[[${infer K}]]`
		? { [P in ParamName<K>]?: string }
		: S extends `[...${infer K}]`
			? { [P in ParamName<K>]: string[] }
			: S extends `[${infer K}]`
				? [ParamName<K>] extends [never]
					? MatchMixed<S>
					: { [P in K]: string }
				: S extends `${string}[${string}]${string}`
					? MatchMixed<S>
					: Empty;
type MatchCollect<P extends string> = P extends `${infer Head}/${infer Rest}`
	? MatchSegment<Head> & MatchCollect<Rest>
	: MatchSegment<P>;
/** Decoded parameters of a matched URL: strings, and string arrays for catch-alls. */
export type MatchedParams<Path extends string> = string extends Path
	? Readonly<Record<string, string | readonly string[] | undefined>>
	: { readonly [K in keyof MatchCollect<Path>]: MatchCollect<Path>[K] };
/** The decoded query of a matched URL; repeated keys become arrays. */
export type MatchedQuery = Readonly<Record<string, string | readonly string[]>>;
/** Result of route.match(): a union discriminated by name. */
export type RouteMatch<
	Routes extends Readonly<Record<string, string>>,
	Locale extends string = never,
> = {
	[Name in keyof Routes & string]: {
		readonly name: Name;
		readonly pattern: Routes[Name];
		readonly params: MatchedParams<Routes[Name]>;
		readonly query: MatchedQuery;
		/** Decoded fragment without "#", or "". */
		readonly hash: string;
		/** Locale from the URL prefix or domain; undefined for internal or unlocalized paths. */
		readonly locale: Locale | undefined;
	};
}[keyof Routes & string];
export interface MatchOptions {
	/** The URL includes defaults.basePath (e.g. window.location.pathname in Next.js). Default false. */
	basePath?: boolean;
}

/** Methods shared by every route helper. */
export interface RouteHelpers<
	Routes extends Readonly<Record<string, string>>,
	Locale extends string = never,
	Queries = Empty,
> {
	has(name: string): name is keyof Routes & string;
	names(): (keyof Routes & string)[];
	pattern<Name extends keyof Routes & string>(name: Name): Routes[Name];
	/** Localized pattern for a locale (falls back to the internal pattern). */
	pattern<Name extends keyof Routes & string>(
		name: Name,
		locale: Locale,
	): string;
	/** Configured locales, or an empty list without i18n. */
	locales(): Locale[];
	/** A helper whose calls use this locale unless options.locale overrides it. */
	forLocale(locale: Locale): NamedRoutes<Routes, Locale, Queries>;
	/**
	 * The named route a root-relative path (or absolute URL on the configured
	 * origin/domains) points to, or null. Static segments win over dynamic
	 * ones, then declaration order. Matching is not authorization.
	 */
	match(
		url: string | URL,
		options?: MatchOptions,
	): RouteMatch<Routes, Locale> | null;
	/** Whether url matches name (exact: false also accepts descendants such as /users/42 for users). */
	is(
		name: keyof Routes & string,
		url: string | URL,
		options?: MatchOptions & { exact?: boolean },
	): boolean;
	/** Matches of every ancestor path of url, from the root to url itself, for breadcrumbs. */
	breadcrumbs(
		url: string | URL,
		options?: MatchOptions,
	): RouteMatch<Routes, Locale>[];
}
export interface NamedRoutes<
	Routes extends Readonly<Record<string, string>>,
	Locale extends string = never,
	Queries = Empty,
> extends RouteHelpers<Routes, Locale, Queries> {
	<Name extends keyof Routes & string>(
		name: Name,
		...args: Args<
			Routes[Name],
			OptionsFor<Queries, Name, Locale>,
			QueryRequired<Queries, Name>
		>
	): string;
}

// ------------------------------------------------------------ typed hrefs
/** One pattern segment as the template literal of the URL it produces. */
type SegmentHref<S extends string> = S extends
	| `[[...${string}]]`
	| `[[${string}]]`
	? "" | `/${string}`
	: `/${MixedHref<S>}`;
type MixedHref<S extends string> =
	S extends `${infer Head}[${string}]${infer Rest}`
		? `${Head}${string}${MixedHref<Rest>}`
		: S;
type JoinHref<P extends string> = P extends `${infer Head}/${infer Rest}`
	? Rest extends ""
		? SegmentHref<Head>
		: `${SegmentHref<Head>}${JoinHref<Rest>}`
	: SegmentHref<P>;
type WithSlash<H extends string, Trailing extends boolean> = H extends "" | "/"
	? "/"
	: Trailing extends true
		? `${H}/`
		: H;
/**
 * The URL a pattern produces, as a template literal type:
 * `RouteHref<"/users/[id]">` is `/users/${string}`. Optional segments become
 * unions; catch-all segments become `${string}`.
 */
export type RouteHref<
	Path extends string,
	TrailingSlash extends boolean = false,
> = string extends Path
	? string
	: Path extends `/${infer Rest}`
		? Rest extends ""
			? "/"
			: TrailingSlash extends boolean
				? WithSlash<JoinHref<Rest>, TrailingSlash>
				: never
		: string;
/** RouteHref plus an optional `?query` and/or `#hash` suffix. */
export type RouteHrefWithSuffix<
	Path extends string,
	TrailingSlash extends boolean = false,
> =
	| RouteHref<Path, TrailingSlash>
	| `${RouteHref<Path, TrailingSlash>}?${string}`
	| `${RouteHref<Path, TrailingSlash>}#${string}`;
/** Options that keep the result a root-relative path without query or hash. */
interface PlainOptions {
	query?: undefined;
	hash?: undefined | "";
	absolute?: false;
	basePath?: false;
	locale?: undefined;
}
/** Options that only add a query or hash suffix. */
interface SuffixOptions {
	hash?: string;
	absolute?: false;
	basePath?: false;
	locale?: undefined;
}
type SuffixOptionsFor<Queries, Name> = SuffixOptions &
	(Name extends keyof Queries
		? QueryRequired<Queries, Name> extends true
			? { query: QueryInput<Queries[Name]> }
			: { query?: QueryInput<Queries[Name]> }
		: { query?: RouteOptions["query"] });
/**
 * A helper created with `hrefs: "typed"`. Plain calls return `RouteHref`,
 * calls with query/hash return `RouteHrefWithSuffix`; absolute, basePath and
 * locale calls return `string` because their exact shape is not known to the
 * type system.
 */
export interface TypedNamedRoutes<
	Routes extends Readonly<Record<string, string>>,
	Locale extends string = never,
	TrailingSlash extends boolean = false,
	Queries = Empty,
> extends RouteHelpers<Routes, Locale, Queries> {
	<Name extends keyof Routes & string>(
		name: Name,
		// A tuple no call can satisfy (a bare `never` rest accepts zero arguments in TS 5.0).
		...args: QueryRequired<Queries, Name> extends true
			? [params: never, options: never]
			: ArgsWith<Routes[Name], PlainOptions>
	): RouteHref<Routes[Name], TrailingSlash>;
	<Name extends keyof Routes & string>(
		name: Name,
		...args: Args<
			Routes[Name],
			SuffixOptionsFor<Queries, Name>,
			QueryRequired<Queries, Name>
		>
	): RouteHrefWithSuffix<Routes[Name], TrailingSlash>;
	<Name extends keyof Routes & string>(
		name: Name,
		...args: Args<
			Routes[Name],
			OptionsFor<Queries, Name, Locale>,
			QueryRequired<Queries, Name>
		>
	): string;
}

type Param = { kind: "dynamic"; name: string };
export type PatternSegment =
	| { kind: "static"; value: string }
	| {
			kind: "dynamic" | "optionalDynamic" | "catchAll" | "optional";
			name: string;
	  }
	| {
			kind: "mixed";
			parts: readonly ({ kind: "static"; value: string } | Param)[];
	  };

/** Structured context of a NamedRouteError. Every field is optional. */
export interface NamedRouteErrorDetails {
	/** Project-relative file responsible for the error. */
	readonly file?: string;
	/** Other files involved (e.g. both sides of a conflict). */
	readonly files?: readonly string[];
	/** Route name involved. */
	readonly route?: string;
	/** Route pattern involved. */
	readonly pattern?: string;
	/** Configuration option path, e.g. "i18n.pathnames" or "names". */
	readonly option?: string;
	/** A concrete suggestion to fix it. */
	readonly hint?: string;
}
export class NamedRouteError extends Error {
	readonly code: string;
	readonly details: NamedRouteErrorDetails;
	constructor(
		code: string,
		message: string,
		details: NamedRouteErrorDetails = {},
	) {
		super(message);
		this.name = "NamedRouteError";
		this.code = code;
		this.details = Object.freeze({ ...details });
	}
}
function fail(
	code: string,
	message: string,
	details?: NamedRouteErrorDetails,
): never {
	throw new NamedRouteError(code, message, details);
}
const isObject = (value: unknown): value is Record<string, unknown> =>
	!!value && typeof value === "object" && !Array.isArray(value);
const isThenable = (value: unknown): value is PromiseLike<unknown> =>
	isObject(value) && typeof value.then === "function";
const NAME = /^[A-Za-z_][A-Za-z0-9_-]*$/;
const LOCALE = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/;

export function parsePattern(pattern: string): PatternSegment[] {
	if (
		typeof pattern !== "string" ||
		!pattern.startsWith("/") ||
		pattern.startsWith("//") ||
		// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
		/[?#\\\u0000- \u007f]/.test(pattern)
	)
		fail("INVALID_PATTERN", `Invalid route pattern: ${String(pattern)}`);
	const parts =
		pattern === "/" ? [] : pattern.replace(/\/$/, "").slice(1).split("/");
	const names = new Set<string>();
	const declare = (name: string) => {
		if (names.has(name) || !NAME.test(name))
			fail(
				"INVALID_PATTERN",
				`Invalid or repeated parameter ${name} in ${pattern}`,
			);
		names.add(name);
		return name;
	};
	return parts.map((part): PatternSegment => {
		if (!part || part === "." || part === "..")
			fail("INVALID_PATTERN", `Invalid segment in ${pattern}`);
		const whole = part.match(
			/^\[\[\.\.\.([^[\]]+)\]\]$|^\[\[([^[\]]+)\]\]$|^\[\.\.\.([^[\]]+)\]$|^\[([^[\]]+)\]$/,
		);
		if (whole) {
			const kinds = [
				"optional",
				"optionalDynamic",
				"catchAll",
				"dynamic",
			] as const;
			const index = whole.slice(1).findIndex((group) => group !== undefined);
			return { kind: kinds[index], name: declare(whole[index + 1]) };
		}
		if (!/[[\]]/.test(part)) return { kind: "static", value: part };
		// Mixed segments such as `v[major]-[minor]` (Nuxt, SvelteKit, Astro, Vue).
		const pieces: ({ kind: "static"; value: string } | Param)[] = [];
		let rest = part;
		while (rest) {
			const open = rest.indexOf("[");
			if (open === -1) {
				if (rest.includes("]"))
					fail("INVALID_PATTERN", `Malformed parameter in ${pattern}`);
				pieces.push({ kind: "static", value: rest });
				break;
			}
			const close = rest.indexOf("]", open);
			const text = rest.slice(0, open);
			const name = rest.slice(open + 1, close);
			if (close === -1 || text.includes("]") || name.includes("["))
				fail("INVALID_PATTERN", `Malformed parameter in ${pattern}`);
			if (!text && pieces.at(-1)?.kind === "dynamic")
				fail(
					"INVALID_PATTERN",
					`Adjacent parameters need a separator in ${pattern}`,
				);
			if (text) pieces.push({ kind: "static", value: text });
			pieces.push({ kind: "dynamic", name: declare(name) });
			rest = rest.slice(close + 1);
		}
		return { kind: "mixed", parts: pieces };
	});
}

/** Parameter names declared by a pattern, in order. */
export function patternParameters(
	segments: readonly PatternSegment[],
): string[] {
	return segments.flatMap((segment) =>
		segment.kind === "static"
			? []
			: segment.kind === "mixed"
				? segment.parts.flatMap((part) =>
						part.kind === "dynamic" ? [part.name] : [],
					)
				: [segment.name],
	);
}

function encode(value: unknown, name: string) {
	if (
		!["string", "number"].includes(typeof value) ||
		(typeof value === "number" && !Number.isFinite(value)) ||
		String(value) === "" ||
		[".", ".."].includes(String(value))
	)
		fail("INVALID_PARAMETER", `Invalid value for parameter ${name}`);
	try {
		return encodeURIComponent(String(value));
	} catch {
		return fail("INVALID_PARAMETER", `Cannot encode parameter ${name}`);
	}
}
function originOf(value: unknown) {
	if (value === undefined) return undefined;
	let url: URL;
	try {
		url = new URL(String(value));
	} catch {
		fail("INVALID_ORIGIN", "origin must be an absolute HTTP(S) origin");
	}
	if (
		typeof value !== "string" ||
		!["http:", "https:"].includes(url.protocol) ||
		url.username ||
		url.password ||
		url.pathname !== "/" ||
		url.search ||
		url.hash
	)
		fail(
			"INVALID_ORIGIN",
			"origin must not contain credentials, a path, query or hash",
		);
	return url.origin;
}
function staticPrefix(value: unknown, label: string, code: string) {
	if (typeof value !== "string") fail(code, `${label} must be a string`);
	if (value === "" || value === "/") return "";
	let segments: PatternSegment[];
	try {
		segments = parsePattern(value);
	} catch {
		return fail(code, `${label} must be a static path such as /docs`);
	}
	if (segments.some((segment) => segment.kind !== "static"))
		fail(code, `${label} must be static`);
	return (
		"/" +
		segments
			.map((segment) =>
				encodeURIComponent((segment as { value: string }).value),
			)
			.join("/")
	);
}

interface CompiledI18n {
	locales: Set<string>;
	list: string[];
	defaultLocale: string;
	mode: LocalePrefixMode;
	prefixes: Map<string, string>;
	domains: { origin: string; defaultLocale: string; locales: Set<string> }[];
	unlocalized: Set<string>;
	pathnames: Map<string, Map<string, PatternSegment[]>>;
}
interface CompiledEntry {
	pattern: string;
	segments: PatternSegment[];
	expected: Set<string>;
}
function compileI18n(
	value: unknown,
	entries: Map<string, CompiledEntry>,
): CompiledI18n {
	const bad = (message: string): never => fail("INVALID_I18N", message);
	if (!isObject(value)) bad("i18n must be an object");
	const config = value as unknown as I18nOptions;
	if (!Array.isArray(config.locales) || !config.locales.length)
		bad("i18n.locales must be a nonempty array");
	const list = [...config.locales];
	for (const locale of list)
		if (typeof locale !== "string" || !LOCALE.test(locale))
			bad(`Invalid locale: ${String(locale)}`);
	const locales = new Set(list);
	if (locales.size !== list.length) bad("i18n.locales contains duplicates");
	const known = (locale: unknown, label: string) => {
		if (typeof locale !== "string" || !locales.has(locale))
			bad(`${label} must be one of i18n.locales`);
		return locale as string;
	};
	const defaultLocale = known(config.defaultLocale, "i18n.defaultLocale");
	const prefix = config.localePrefix ?? "always";
	const mode = typeof prefix === "string" ? prefix : prefix?.mode;
	if (!["always", "as-needed", "never"].includes(mode as string))
		bad("i18n.localePrefix must be always, as-needed or never");
	const prefixes = new Map<string, string>();
	if (typeof prefix === "object" && prefix.prefixes !== undefined) {
		if (!isObject(prefix.prefixes))
			bad("i18n.localePrefix.prefixes must be an object");
		for (const [locale, path] of Object.entries(prefix.prefixes)) {
			known(locale, `Prefix locale ${locale}`);
			const normalized = staticPrefix(
				path,
				`Prefix for ${locale}`,
				"INVALID_I18N",
			);
			if (!normalized) bad(`Prefix for ${locale} cannot be empty`);
			prefixes.set(locale, normalized);
		}
	}
	const domains: CompiledI18n["domains"] = [];
	if (config.domains !== undefined) {
		if (!Array.isArray(config.domains)) bad("i18n.domains must be an array");
		for (const entry of config.domains) {
			if (!isObject(entry) || typeof entry.domain !== "string")
				bad("Each i18n domain needs a domain string");
			const domain = entry as unknown as LocaleDomain;
			let origin: string;
			try {
				const url = new URL(
					`${domain.http ? "http" : "https"}://${domain.domain}`,
				);
				if (url.host !== domain.domain.toLowerCase() || url.pathname !== "/")
					throw new Error();
				origin = url.origin;
			} catch {
				return bad(`Invalid i18n domain: ${domain.domain}`);
			}
			const defaultForDomain = known(
				domain.defaultLocale,
				`Default locale of ${domain.domain}`,
			);
			const domainLocales = new Set([defaultForDomain]);
			if (domain.locales !== undefined) {
				if (!Array.isArray(domain.locales))
					bad(`Locales of ${domain.domain} must be an array`);
				for (const locale of domain.locales)
					domainLocales.add(known(locale, `Locale of ${domain.domain}`));
			}
			domains.push({
				origin,
				defaultLocale: defaultForDomain,
				locales: domainLocales,
			});
		}
	}
	const unlocalized = new Set<string>();
	if (config.unlocalized !== undefined) {
		if (!Array.isArray(config.unlocalized))
			bad("i18n.unlocalized must be an array");
		for (const name of config.unlocalized) {
			if (typeof name !== "string" || !entries.has(name))
				bad(`Unknown unlocalized route: ${String(name)}`);
			unlocalized.add(name);
		}
	}
	const pathnames = new Map<string, Map<string, PatternSegment[]>>();
	if (config.pathnames !== undefined) {
		if (!isObject(config.pathnames)) bad("i18n.pathnames must be an object");
		const byPattern = new Map<string, string[]>();
		for (const entry of entries.values())
			byPattern.set(entry.pattern, [...entry.expected]);
		for (const [internal, localized] of Object.entries(config.pathnames)) {
			const expected = byPattern.get(internal);
			if (!expected)
				bad(`i18n.pathnames key is not a route pattern: ${internal}`);
			const perLocale = new Map<string, PatternSegment[]>();
			const entries: [string, unknown][] =
				typeof localized === "string"
					? list.map((locale) => [locale, localized])
					: isObject(localized)
						? Object.entries(localized)
						: bad(`i18n.pathnames.${internal} must be a string or an object`);
			for (const [locale, pattern] of entries) {
				known(locale, `Pathname locale ${locale}`);
				const segments = parsePattern(pattern as string);
				const names = patternParameters(segments).sort();
				if (names.join("/") !== [...(expected ?? [])].sort().join("/"))
					bad(
						`Localized pathname ${String(pattern)} must declare the parameters of ${internal}`,
					);
				perLocale.set(locale, segments);
			}
			pathnames.set(internal, perLocale);
		}
	}
	return {
		locales,
		list,
		defaultLocale,
		mode: mode as LocalePrefixMode,
		prefixes,
		domains,
		unlocalized,
		pathnames,
	};
}

/** Runtime extensions of createRoutes. */
export interface RouteExtensions<Queries> {
	/** Per-route query schemas (see defineQuery). */
	readonly query?: Queries;
	/** Validate query objects with the Standard Schemas on every call. Default true when query is passed. */
	readonly validateQuery?: boolean;
}
type TP<Routes, Queries> = QuerySchemas & KnownQueries<Routes, Queries>;
export function createRoutes<
	const Routes extends Readonly<Record<string, string>>,
	const Locale extends string = never,
	const Queries extends TP<Routes, Queries> = Empty,
>(
	manifest: Routes,
	defaults: RouteDefaults<Locale> & { hrefs: "typed"; trailingSlash: true },
	extensions?: RouteExtensions<Queries>,
): TypedNamedRoutes<Routes, Locale, true, Queries>;
export function createRoutes<
	const Routes extends Readonly<Record<string, string>>,
	const Locale extends string = never,
	const Queries extends TP<Routes, Queries> = Empty,
>(
	manifest: Routes,
	defaults: RouteDefaults<Locale> & { hrefs: "typed"; trailingSlash?: false },
	extensions?: RouteExtensions<Queries>,
): TypedNamedRoutes<Routes, Locale, false, Queries>;
export function createRoutes<
	const Routes extends Readonly<Record<string, string>>,
	const Locale extends string = never,
	const Queries extends TP<Routes, Queries> = Empty,
>(
	manifest: Routes,
	defaults: RouteDefaults<Locale> & { hrefs: "typed" },
	extensions?: RouteExtensions<Queries>,
): TypedNamedRoutes<Routes, Locale, boolean, Queries>;
export function createRoutes<
	const Routes extends Readonly<Record<string, string>>,
	const Locale extends string = never,
	const Queries extends TP<Routes, Queries> = Empty,
>(
	manifest: Routes,
	defaults?: RouteDefaults<Locale>,
	extensions?: RouteExtensions<Queries>,
): NamedRoutes<Routes, Locale, Queries>;
export function createRoutes(
	manifest: Readonly<Record<string, string>>,
	defaults: RouteDefaults = {},
	extensions: RouteExtensions<QuerySchemas> = {},
): unknown {
	if (!isObject(manifest))
		fail("INVALID_MANIFEST", "Expected a name-to-pattern object");
	if (!isObject(defaults))
		fail("INVALID_OPTIONS", "Defaults must be an object");
	const entries = new Map<string, CompiledEntry>(
		Object.entries(manifest).map(([name, pattern]): [string, CompiledEntry] => {
			// biome-ignore lint/suspicious/noControlCharactersInRegex: rejecting control characters is the purpose of this check
			if (!name || /[\u0000- \u007f]/.test(name))
				fail("INVALID_NAME", `Invalid route name: ${name}`);
			const segments = parsePattern(pattern);
			return [
				name,
				{ pattern, segments, expected: new Set(patternParameters(segments)) },
			];
		}),
	);
	const prefix =
		defaults.basePath === undefined || defaults.basePath === ""
			? ""
			: staticPrefix(defaults.basePath, "basePath", "INVALID_BASE_PATH");
	const origin = originOf(defaults.origin);
	if (
		defaults.trailingSlash !== undefined &&
		typeof defaults.trailingSlash !== "boolean"
	)
		fail("INVALID_OPTIONS", "trailingSlash must be a boolean");
	const trailingSlash = defaults.trailingSlash === true;
	if (
		defaults.hrefs !== undefined &&
		defaults.hrefs !== "string" &&
		defaults.hrefs !== "typed"
	)
		fail("INVALID_OPTIONS", 'hrefs must be "string" or "typed"');
	const i18n =
		defaults.i18n === undefined
			? undefined
			: compileI18n(defaults.i18n, entries);
	if (!isObject(extensions))
		fail("INVALID_OPTIONS", "createRoutes extensions must be an object");
	if (
		extensions.validateQuery !== undefined &&
		typeof extensions.validateQuery !== "boolean"
	)
		fail("INVALID_OPTIONS", "validateQuery must be a boolean");
	const schemas = new Map<
		string,
		StandardSchemaV1<QueryShape, unknown>["~standard"]
	>();
	if (extensions.query !== undefined) {
		if (!isObject(extensions.query))
			fail("INVALID_QUERY", "query schemas must be an object");
		for (const [name, schema] of Object.entries(extensions.query)) {
			if (!entries.has(name))
				fail("INVALID_QUERY", `Query schema for unknown route: ${name}`, {
					route: name,
					option: "query",
					hint: closest(name, entries.keys())
						? `Did you mean "${closest(name, entries.keys())}"?`
						: "Keys of the query schemas must be route names.",
				});
			if (isObject(schema) && schema.kind === "query-type") continue;
			const standard = isObject(schema) ? schema["~standard"] : undefined;
			if (!isObject(standard) || typeof standard.validate !== "function")
				fail(
					"INVALID_QUERY",
					`Query schema for ${name} is not a Standard Schema or defineQuery.type()`,
					{
						route: name,
						option: "query",
					},
				);
			if (extensions.validateQuery !== false)
				schemas.set(
					name,
					standard as StandardSchemaV1<QueryShape, unknown>["~standard"],
				);
		}
	}
	function validateQuery(name: string, query: unknown) {
		const standard = schemas.get(name);
		if (!standard) return;
		const result = standard.validate(query ?? {});
		if (isThenable(result))
			fail(
				"INVALID_QUERY",
				`The query schema of ${name} is asynchronous; route() is synchronous`,
				{
					route: name,
					option: "query",
					hint: "Use a synchronous schema, or defineQuery.type<T>() for types only.",
				},
			);
		if (result.issues?.length) {
			const issues = result.issues.map((issue) => {
				const path = (issue.path ?? [])
					.map((part) => String(isObject(part) ? part.key : part))
					.join(".");
				return path ? `${path}: ${issue.message}` : issue.message;
			});
			fail("INVALID_QUERY", `Invalid query for ${name}: ${issues.join("; ")}`, {
				route: name,
				option: "query",
				hint: "Pass query values that satisfy the route's schema.",
			});
		}
	}
	function get(name: string) {
		const entry = entries.get(name);
		if (!entry) {
			const suggestion =
				typeof name === "string" ? closest(name, entries.keys()) : undefined;
			return fail("UNKNOWN_ROUTE", `Unknown named route: ${name}`, {
				route: String(name),
				hint: suggestion
					? `Did you mean "${suggestion}"?`
					: "Check the generated module is current (named-routes check) or list names with route.names().",
			});
		}
		return entry;
	}
	function checkLocale(locale: unknown) {
		if (!i18n)
			fail(
				"INVALID_LOCALE",
				"Configure i18n in createRoutes before passing a locale",
			);
		if (typeof locale !== "string" || !i18n.locales.has(locale))
			fail("INVALID_LOCALE", `Unknown locale: ${String(locale)}`);
		return locale;
	}
	function build(
		bound: string | undefined,
		name: string,
		params: Record<string, unknown> = {},
		options: RouteOptions<string> = {},
	) {
		if (!isObject(params))
			fail("INVALID_PARAMETER", "Parameters must be an object");
		if (!isObject(options))
			fail("INVALID_OPTIONS", "Options must be an object");
		if (options.query !== undefined && !isObject(options.query))
			fail("INVALID_QUERY", "query must be an object");
		if (options.hash !== undefined && typeof options.hash !== "string")
			fail("INVALID_HASH", "hash must be a string");
		const entry = get(name);
		validateQuery(name, options.query);
		for (const key of Object.keys(params))
			if (!entry.expected.has(key))
				fail(
					"UNKNOWN_PARAMETER",
					`Unexpected parameter ${key} for ${name}; pass query values in options.query`,
					{
						route: name,
						pattern: entry.pattern,
						hint: entry.expected.size
							? `${entry.pattern} accepts ${[...entry.expected].join(", ")}; move ${key} to options.query.`
							: `${entry.pattern} has no parameters; move ${key} to options.query.`,
					},
				);
		const locale =
			options.locale !== undefined ? checkLocale(options.locale) : bound;
		let segments = entry.segments;
		let localePath = "";
		let localeOrigin: string | undefined;
		if (locale !== undefined && i18n && !i18n.unlocalized.has(name)) {
			segments = i18n.pathnames.get(entry.pattern)?.get(locale) ?? segments;
			const domain = options.absolute
				? (i18n.domains.find((item) => item.defaultLocale === locale) ??
					i18n.domains.find((item) => item.locales.has(locale)))
				: undefined;
			localeOrigin = domain?.origin;
			const fallback = domain?.defaultLocale ?? i18n.defaultLocale;
			if (
				i18n.mode === "always" ||
				(i18n.mode === "as-needed" && locale !== fallback)
			)
				localePath = i18n.prefixes.get(locale) ?? `/${locale}`;
		}
		const value = (key: string) =>
			Object.hasOwn(params, key) ? params[key] : undefined;
		const missing = (key: string): never =>
			fail("MISSING_PARAMETER", `Missing parameter ${key} for ${name}`, {
				route: name,
				pattern: entry.pattern,
				hint: `Pass { ${key}: ... } as the second argument.`,
			});
		const parts = segments.flatMap((segment) => {
			if (segment.kind === "static") return [encodeURIComponent(segment.value)];
			if (segment.kind === "mixed")
				return [
					segment.parts
						.map((part) => {
							if (part.kind === "static") return encodeURIComponent(part.value);
							const item = value(part.name);
							return item === undefined || item === null
								? missing(part.name)
								: encode(item, part.name);
						})
						.join(""),
				];
			const item = value(segment.name);
			const optional =
				segment.kind === "optional" || segment.kind === "optionalDynamic";
			if (item === undefined || item === null)
				return optional ? [] : missing(segment.name);
			if (segment.kind === "dynamic" || segment.kind === "optionalDynamic")
				return [encode(item, segment.name)];
			if (
				!Array.isArray(item) ||
				(segment.kind === "catchAll" && item.length === 0)
			)
				fail(
					"INVALID_PARAMETER",
					`${segment.name} must be ${segment.kind === "catchAll" ? "a nonempty" : "an"} array`,
				);
			return item.map((part) => encode(part, segment.name));
		});
		let path =
			(options.basePath || options.absolute ? prefix : "") +
			localePath +
			(parts.length ? `/${parts.join("/")}` : "");
		if (!path) path = "/";
		if (!trailingSlash && path !== "/") path = path.replace(/\/$/, "");
		else if (trailingSlash && !path.endsWith("/")) path += "/";
		const query = new URLSearchParams();
		for (const [key, item] of Object.entries(options.query ?? {})) {
			for (const part of Array.isArray(item) ? item : [item]) {
				if (part === undefined || part === null) continue;
				if (
					!["string", "number", "boolean"].includes(typeof part) ||
					(typeof part === "number" && !Number.isFinite(part))
				)
					fail("INVALID_QUERY", `Invalid query value for ${key}`);
				query.append(key, String(part));
			}
		}
		const search = query.toString();
		if (search) path += `?${search}`;
		const hash = options.hash?.replace(/^#/, "");
		if (hash) path += `#${encodeURIComponent(hash)}`;
		if (options.absolute) {
			const base = localeOrigin ?? origin;
			if (!base)
				fail(
					"MISSING_ORIGIN",
					"Set origin in createRoutes before requesting absolute URLs",
				);
			path = base + path;
		}
		return path;
	}
	// ------------------------------------------------------ reverse routing
	interface Candidate {
		name: string;
		segments: PatternSegment[];
		order: number;
	}
	const weight = {
		static: 5,
		mixed: 4,
		dynamic: 3,
		optionalDynamic: 2,
		catchAll: 1,
		optional: 0,
	};
	let pools:
		| { internal: Candidate[]; byLocale: Map<string, Candidate[]> }
		| undefined;
	const compiledPools = () => {
		if (pools) return pools;
		const internal: Candidate[] = [];
		const byLocale = new Map<string, Candidate[]>();
		let order = 0;
		for (const [name, entry] of entries) {
			internal.push({ name, segments: entry.segments, order });
			if (i18n && !i18n.unlocalized.has(name))
				for (const locale of i18n.list) {
					const list = byLocale.get(locale) ?? [];
					list.push({
						name,
						segments:
							i18n.pathnames.get(entry.pattern)?.get(locale) ?? entry.segments,
						order,
					});
					byLocale.set(locale, list);
				}
			order++;
		}
		pools = { internal, byLocale };
		return pools;
	};
	const mixedPatterns = new WeakMap<PatternSegment, RegExp>();
	function matchMixed(
		segment: Extract<PatternSegment, { kind: "mixed" }>,
		part: string,
	) {
		let pattern = mixedPatterns.get(segment);
		if (!pattern) {
			pattern = new RegExp(
				`^${segment.parts
					.map((piece) =>
						piece.kind === "static"
							? piece.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
							: "(.+?)",
					)
					.join("")}$`,
				"s",
			);
			mixedPatterns.set(segment, pattern);
		}
		return pattern.exec(part);
	}
	/** Backtracking segment matcher; catch-alls try the longest span first. */
	function matchSegments(
		segments: readonly PatternSegment[],
		parts: readonly string[],
		si: number,
		pi: number,
		params: Record<string, string | string[]>,
	): boolean {
		if (si === segments.length) return pi === parts.length;
		const segment = segments[si];
		const next = (to: number) =>
			matchSegments(segments, parts, si + 1, to, params);
		if (segment.kind === "static")
			return pi < parts.length && parts[pi] === segment.value && next(pi + 1);
		if (segment.kind === "mixed") {
			if (pi >= parts.length) return false;
			const found = matchMixed(segment, parts[pi]);
			if (!found) return false;
			const names = segment.parts.flatMap((piece) =>
				piece.kind === "dynamic" ? [piece.name] : [],
			);
			names.forEach((name, index) => {
				params[name] = found[index + 1];
			});
			if (next(pi + 1)) return true;
			for (const name of names) delete params[name];
			return false;
		}
		const { name } = segment;
		if (segment.kind === "dynamic" || segment.kind === "optionalDynamic") {
			if (pi < parts.length) {
				params[name] = parts[pi];
				if (next(pi + 1)) return true;
				delete params[name];
			}
			return segment.kind === "optionalDynamic" && next(pi);
		}
		for (let end = parts.length; end > pi; end--) {
			params[name] = parts.slice(pi, end);
			if (next(end)) return true;
		}
		delete params[name];
		return segment.kind === "optional" && next(pi);
	}
	/** Negative when a is more specific than b. */
	function compare(a: Candidate, b: Candidate) {
		for (let index = 0; ; index++) {
			const left = a.segments[index];
			const right = b.segments[index];
			if (!left && !right) return a.order - b.order;
			if (!left) return -1;
			if (!right) return 1;
			const difference = weight[right.kind] - weight[left.kind];
			if (difference) return difference;
		}
	}
	interface Located {
		/** Raw (still encoded) path segments after basePath and locale prefix. */
		raw: string[];
		/** Encoded prefix removed before raw (basePath + locale prefix). */
		base: string;
		locale: string | undefined;
		pool: Candidate[];
	}
	function locate(input: string | URL, options: MatchOptions = {}) {
		if (!isObject(options))
			fail("INVALID_OPTIONS", "Match options must be an object");
		let url: URL;
		if (input instanceof URL) url = input;
		else if (typeof input === "string") {
			const absolute = /^[A-Za-z][A-Za-z0-9+.-]*:/.test(input);
			if (
				!absolute &&
				(!input.startsWith("/") ||
					input.startsWith("//") ||
					input.startsWith("/\\"))
			)
				return undefined;
			try {
				url = new URL(input, "http://named-routes.invalid");
			} catch {
				return undefined;
			}
			if (!absolute)
				url = new URL(
					`${url.pathname}${url.search}${url.hash}`,
					"http://named-routes.invalid",
				);
		} else return fail("INVALID_URL", "match() expects a path string or a URL");
		let domainLocale: string | undefined;
		if (url.origin !== "http://named-routes.invalid") {
			const domain = i18n?.domains.find((item) => item.origin === url.origin);
			if (domain) domainLocale = domain.defaultLocale;
			else if (url.origin !== origin) return undefined;
		}
		let pathname = url.pathname;
		let base = "";
		if (options.basePath && prefix) {
			if (pathname !== prefix && !pathname.startsWith(`${prefix}/`))
				return undefined;
			pathname = pathname.slice(prefix.length) || "/";
			base = prefix;
		}
		if (pathname.length > 1 && pathname.endsWith("/"))
			pathname = pathname.slice(0, -1);
		const split = (path: string) =>
			path === "/" || path === "" ? [] : path.slice(1).split("/");
		const attempts: Located[] = [];
		const { internal, byLocale } = compiledPools();
		if (i18n) {
			if (i18n.mode !== "never")
				for (const locale of [...i18n.list].sort(
					(a, b) =>
						(i18n.prefixes.get(b) ?? `/${b}`).length -
						(i18n.prefixes.get(a) ?? `/${a}`).length,
				)) {
					const localePrefix =
						i18n.prefixes.get(locale) ?? `/${encodeURIComponent(locale)}`;
					if (
						pathname === localePrefix ||
						pathname.startsWith(`${localePrefix}/`)
					)
						attempts.push({
							raw: split(pathname.slice(localePrefix.length) || "/"),
							base: base + localePrefix,
							locale,
							pool: byLocale.get(locale) ?? [],
						});
				}
			const fallback =
				domainLocale ??
				(i18n.mode === "always" ? undefined : i18n.defaultLocale);
			if (fallback !== undefined)
				attempts.push({
					raw: split(pathname),
					base,
					locale: fallback,
					pool: byLocale.get(fallback) ?? [],
				});
		}
		attempts.push({
			raw: split(pathname),
			base,
			locale: undefined,
			pool: internal,
		});
		return { url, attempts };
	}
	function decodeParts(raw: readonly string[]) {
		const parts: string[] = [];
		for (const part of raw) {
			if (!part) return undefined;
			try {
				parts.push(decodeURIComponent(part));
			} catch {
				return undefined;
			}
		}
		return parts;
	}
	function best(raw: readonly string[], pool: readonly Candidate[]) {
		const parts = decodeParts(raw);
		if (!parts) return undefined;
		let winner:
			| { candidate: Candidate; params: Record<string, string | string[]> }
			| undefined;
		for (const candidate of pool) {
			const params: Record<string, string | string[]> = {};
			if (!matchSegments(candidate.segments, parts, 0, 0, params)) continue;
			if (!winner || compare(candidate, winner.candidate) < 0)
				winner = { candidate, params };
		}
		return winner;
	}
	function freezeParams(params: Record<string, string | string[]>) {
		for (const value of Object.values(params))
			if (Array.isArray(value)) Object.freeze(value);
		return Object.freeze(params);
	}
	function matchUrl(input: string | URL, options?: MatchOptions) {
		const located = locate(input, options);
		if (!located) return null;
		for (const attempt of located.attempts) {
			const found = best(attempt.raw, attempt.pool);
			if (!found) continue;
			const query: Record<string, string | string[]> = {};
			for (const [key, value] of located.url.searchParams) {
				const previous = query[key];
				query[key] =
					previous === undefined
						? value
						: Array.isArray(previous)
							? [...previous, value]
							: [previous, value];
			}
			let hash = located.url.hash.replace(/^#/, "");
			try {
				hash = decodeURIComponent(hash);
			} catch {}
			const localized = !!i18n && !i18n.unlocalized.has(found.candidate.name);
			return Object.freeze({
				name: found.candidate.name,
				pattern: get(found.candidate.name).pattern,
				params: freezeParams(found.params),
				query: freezeParams(query),
				hash,
				locale: localized ? attempt.locale : undefined,
			});
		}
		return null;
	}
	function breadcrumbs(input: string | URL, options?: MatchOptions) {
		const located = locate(input, options);
		if (!located) return [];
		const target = matchUrl(input, options);
		const attempt =
			located.attempts.find(
				(item) =>
					target && item.locale === target.locale && best(item.raw, item.pool),
			) ?? located.attempts.at(-1);
		if (!attempt) return [];
		const trail: NonNullable<ReturnType<typeof matchUrl>>[] = [];
		for (let length = 0; length <= attempt.raw.length; length++) {
			const path = `${attempt.base}/${attempt.raw.slice(0, length).join("/")}`;
			const found = matchUrl(
				path === "/" || !path.endsWith("/") ? path : path.slice(0, -1) || "/",
				options,
			);
			if (found) trail.push(found);
		}
		return trail;
	}

	function helper(bound: string | undefined): unknown {
		const named = (
			name: string,
			params?: Record<string, unknown>,
			options?: RouteOptions<string>,
		) => build(bound, name, params, options);
		return Object.freeze(
			Object.assign(named, {
				has: (name: string) => typeof name === "string" && entries.has(name),
				names: () => [...entries.keys()],
				pattern: (name: string, locale?: string) => {
					const entry = get(name);
					if (locale === undefined) return entry.pattern;
					checkLocale(locale);
					const segments = i18n?.pathnames.get(entry.pattern)?.get(locale);
					return segments ? formatPattern(segments) : entry.pattern;
				},
				locales: () => [...(i18n?.list ?? [])],
				forLocale: (locale: string) => helper(checkLocale(locale)),
				match: matchUrl,
				is: (
					name: string,
					url: string | URL,
					options: MatchOptions & { exact?: boolean } = {},
				) => {
					get(name);
					if (options.exact === false)
						return breadcrumbs(url, options).some(
							(found) => found.name === name,
						);
					return matchUrl(url, options)?.name === name;
				},
				breadcrumbs,
			}),
		);
	}
	return helper(undefined);
}

/** Inverse of parsePattern. */
export function formatPattern(segments: readonly PatternSegment[]): string {
	return (
		"/" +
		segments
			.map((segment) => {
				if (segment.kind === "static") return segment.value;
				if (segment.kind === "mixed")
					return segment.parts
						.map((part) =>
							part.kind === "static" ? part.value : `[${part.name}]`,
						)
						.join("");
				const [open, close] = {
					dynamic: ["[", "]"],
					optionalDynamic: ["[[", "]]"],
					catchAll: ["[...", "]"],
					optional: ["[[...", "]]"],
				}[segment.kind];
				return `${open}${segment.name}${close}`;
			})
			.join("/")
	);
}
