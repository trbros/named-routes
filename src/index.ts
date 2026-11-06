/** Browser-safe URL generation. Node-only discovery lives in ./generator. */
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
}
type ParamName<K extends string> = K extends `${string}[${string}` | `${string}]${string}` | ""
  ? never
  : K;
type Mixed<S extends string> = S extends `${string}[${infer K}]${infer Rest}`
  ? { [P in ParamName<K>]: RouteValue } & Mixed<Rest>
  : {};
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
          : {};
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
type Args<Path extends string, Locale extends string> = string extends Path
  ? [params?: LooseParams, options?: RouteOptions<Locale>]
  : {} extends Collect<Path>
    ? [params?: RouteParams<Path>, options?: RouteOptions<Locale>]
    : [params: RouteParams<Path>, options?: RouteOptions<Locale>];
export interface NamedRoutes<
  Routes extends Readonly<Record<string, string>>,
  Locale extends string = never,
> {
  <Name extends keyof Routes & string>(
    name: Name,
    ...args: Args<Routes[Name], Locale>
  ): string;
  has(name: string): name is keyof Routes & string;
  names(): (keyof Routes & string)[];
  pattern<Name extends keyof Routes & string>(name: Name): Routes[Name];
  /** Localized pattern for a locale (falls back to the internal pattern). */
  pattern<Name extends keyof Routes & string>(name: Name, locale: Locale): string;
  /** Configured locales, or an empty list without i18n. */
  locales(): Locale[];
  /** A helper whose calls use this locale unless options.locale overrides it. */
  forLocale(locale: Locale): NamedRoutes<Routes, Locale>;
}

type Param = { kind: "dynamic"; name: string };
export type PatternSegment =
  | { kind: "static"; value: string }
  | { kind: "dynamic" | "optionalDynamic" | "catchAll" | "optional"; name: string }
  | { kind: "mixed"; parts: readonly ({ kind: "static"; value: string } | Param)[] };

export class NamedRouteError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "NamedRouteError";
    this.code = code;
  }
}
function fail(code: string, message: string): never {
  throw new NamedRouteError(code, message);
}
const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const NAME = /^[A-Za-z_][A-Za-z0-9_-]*$/;
const LOCALE = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/;

export function parsePattern(pattern: string): PatternSegment[] {
  if (
    typeof pattern !== "string" ||
    !pattern.startsWith("/") ||
    pattern.startsWith("//") ||
    /[?#\\\u0000- \u007f]/.test(pattern)
  )
    fail("INVALID_PATTERN", `Invalid route pattern: ${String(pattern)}`);
  const parts =
    pattern === "/" ? [] : pattern.replace(/\/$/, "").slice(1).split("/");
  const names = new Set<string>();
  const declare = (name: string) => {
    if (names.has(name) || !NAME.test(name))
      fail("INVALID_PATTERN", `Invalid or repeated parameter ${name} in ${pattern}`);
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
      const kinds = ["optional", "optionalDynamic", "catchAll", "dynamic"] as const;
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
        fail("INVALID_PATTERN", `Adjacent parameters need a separator in ${pattern}`);
      if (text) pieces.push({ kind: "static", value: text });
      pieces.push({ kind: "dynamic", name: declare(name) });
      rest = rest.slice(close + 1);
    }
    return { kind: "mixed", parts: pieces };
  });
}

/** Parameter names declared by a pattern, in order. */
export function patternParameters(segments: readonly PatternSegment[]): string[] {
  return segments.flatMap((segment) =>
    segment.kind === "static"
      ? []
      : segment.kind === "mixed"
        ? segment.parts.flatMap((part) => (part.kind === "dynamic" ? [part.name] : []))
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
  if (typeof value !== "string")
    fail(code, `${label} must be a string`);
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
      .map((segment) => encodeURIComponent((segment as { value: string }).value))
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
    if (!isObject(prefix.prefixes)) bad("i18n.localePrefix.prefixes must be an object");
    for (const [locale, path] of Object.entries(prefix.prefixes)) {
      known(locale, `Prefix locale ${locale}`);
      const normalized = staticPrefix(path, `Prefix for ${locale}`, "INVALID_I18N");
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
        const url = new URL(`${domain.http ? "http" : "https"}://${domain.domain}`);
        if (url.host !== domain.domain.toLowerCase() || url.pathname !== "/")
          throw new Error();
        origin = url.origin;
      } catch {
        return bad(`Invalid i18n domain: ${domain.domain}`);
      }
      const defaultForDomain = known(domain.defaultLocale, `Default locale of ${domain.domain}`);
      const domainLocales = new Set([defaultForDomain]);
      if (domain.locales !== undefined) {
        if (!Array.isArray(domain.locales)) bad(`Locales of ${domain.domain} must be an array`);
        for (const locale of domain.locales)
          domainLocales.add(known(locale, `Locale of ${domain.domain}`));
      }
      domains.push({ origin, defaultLocale: defaultForDomain, locales: domainLocales });
    }
  }
  const unlocalized = new Set<string>();
  if (config.unlocalized !== undefined) {
    if (!Array.isArray(config.unlocalized)) bad("i18n.unlocalized must be an array");
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
      if (!expected) bad(`i18n.pathnames key is not a route pattern: ${internal}`);
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
          bad(`Localized pathname ${String(pattern)} must declare the parameters of ${internal}`);
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

export function createRoutes<
  const Routes extends Readonly<Record<string, string>>,
  const Locale extends string = never,
>(manifest: Routes, defaults: RouteDefaults<Locale> = {}): NamedRoutes<Routes, Locale> {
  if (!isObject(manifest))
    fail("INVALID_MANIFEST", "Expected a name-to-pattern object");
  if (!isObject(defaults))
    fail("INVALID_OPTIONS", "Defaults must be an object");
  const entries = new Map<string, CompiledEntry>(
    Object.entries(manifest).map(([name, pattern]): [string, CompiledEntry] => {
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
  if (defaults.trailingSlash !== undefined && typeof defaults.trailingSlash !== "boolean")
    fail("INVALID_OPTIONS", "trailingSlash must be a boolean");
  const trailingSlash = defaults.trailingSlash === true;
  const i18n =
    defaults.i18n === undefined
      ? undefined
      : compileI18n(defaults.i18n, entries);
  function get(name: string) {
    const entry = entries.get(name);
    if (!entry) return fail("UNKNOWN_ROUTE", `Unknown named route: ${name}`);
    return entry;
  }
  function checkLocale(locale: unknown) {
    if (!i18n)
      fail("INVALID_LOCALE", "Configure i18n in createRoutes before passing a locale");
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
    for (const key of Object.keys(params))
      if (!entry.expected.has(key))
        fail(
          "UNKNOWN_PARAMETER",
          `Unexpected parameter ${key} for ${name}; pass query values in options.query`,
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
      fail("MISSING_PARAMETER", `Missing parameter ${key} for ${name}`);
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
      if (!Array.isArray(item) || (segment.kind === "catchAll" && item.length === 0))
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
      }),
    );
  }
  return helper(undefined) as NamedRoutes<Routes, Locale>;
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
            .map((part) => (part.kind === "static" ? part.value : `[${part.name}]`))
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
