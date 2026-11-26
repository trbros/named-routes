# API reference · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Runtime API reference](#runtime-api)
- [Generator configuration](#configuration)
- [Optional stable names](#stable-names)
- [Programmatic generator API](#generator-api)

<a id="runtime-api"></a>

## Runtime API reference

route(name, params?, options?) returns a URL string. params is optional only when the pattern has no required parameters. options contains query, hash, absolute, basePath and locale. route.has(name) checks existence and narrows a string to a known name; route.names() returns available names; route.pattern(name, locale?) returns the original or localized pattern; route.locales() lists locales; route.forLocale(locale) returns a helper bound to a locale. route.match(url), route.is(name, url) and route.breadcrumbs(url) map URLs back to names (see Reverse routing).

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, assetBase, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

route.localize(url, locale?, options?: LocalizeOptions): string | null — localizes an existing URL across configured pathname aliases. Options: sourceLocale, basePath (input includes base), includeBasePath (output includes base), absolute (configured origin/domain). It preserves the query and hash without revalidating query schemas.

`route.asset(path, options?)` and the generated `asset` export resolve public files independently of locale, query schemas and route names. `AssetHelper` and `AssetOptions` are exported types. `route.localize(url, locale, options?)` translates known URLs; `route.match()` finds the name and parameters; `route.parseQuery()` validates query input when runtime schemas are available.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({
  "users.show": "/users/[user]",
  search: "/search/[[...terms]]",
});
route("users.show", { user: 1 });
route.names(); // ["users.show", "search"]
route.pattern("users.show"); // /users/[user]
const input: string = "search";
if (route.has(input)) console.log(route.pattern(input));
```

<a id="configuration"></a>

## Generator configuration

No configuration file is required. Optional files are searched in this order: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. TypeScript configs need Node.js 22.18+ (built-in type stripping); use .mjs on older versions. Export defineConfig({...}) from @triooo/named-routes/config for autocomplete. The CLI --config flag selects another file; root inside a config file is relative to that file. Unknown or misspelled options fail with INVALID_CONFIG.

Discovery: discovery ("framework" by default since 2.0: the framework's own route table where it publishes one, else the files; "files" for the 1.x scanner), framework (auto by default, or next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app or pages), appDir/pagesDir (Next.js custom folders or false), routesDir (custom pages/routes folder for other frameworks), pageExtensions (framework defaults; multi-part extensions such as page.tsx work), includeApi (false), exclude (globs relative to root with *, ** and ?).

Names: names (URL pattern → custom name, every path must exist), extraRoutes (explicit name → pattern, e.g. rewrite destinations), naming (separator, paramPrefix, home, transform) and i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Output: output (default src/routes.generated.ts; .ts, .mts, .js or .mjs, never inside a routable file), importSource (module the generated file imports createRoutes from, default the package name), exportNames (rename routes, route, asset, RouteName and RouteLocale), defaults (public basePath, assetBase, trailingSlash and origin; only these keys are serialized), hrefs ("typed" by default since 2.0, or "string"; type-only), query (module of per-route query schemas) and validateQuery (bundle and run those schemas, default false). Plugins add watch (default true); withNamedRoutes also accepts watchInterval (750 ms, 25–60000) and watchMode (auto, native or poll). Inline plugin options override the config file.

`defaults.assetBase` overrides only the asset URL prefix. Omit it to inherit the effective `basePath`; use `"/"` or `""` for domain-root assets, or an HTTP(S) CDN URL. Navigation, localization and reverse matching remain unchanged.

`exportNames.asset` renames the generated named export (default `asset`). If a legacy custom export already uses that name, an unused `$asset` alias is selected; `route.asset` is always available on the route helper. Public defaults are serialized, so never put secrets in them.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  discovery: "framework",            // or "files" (1.x)
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", asset: "publicAsset", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", assetBase: "https://cdn.example.com/public", trailingSlash: false },
});
```

<a id="stable-names"></a>

## Optional stable names

Automatic names follow URL structure. If a refactor moves a public URL and you need a stable semantic name, update the optional names map. Every aliased path must exist. Unlisted routes keep automatic names. Duplicate names and typos fail generation instead of silently creating broken links.

A custom name replaces the automatic name for that path; it does not add a second alias automatically. This is useful for Laravel-style names such as posts.show, but it is not required for normal use.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

<a id="generator-api"></a>

## Programmatic generator API

discoverRoutes(options?) returns root, framework, directories, routes, entries and the runtime defaults without writing. Each entry has name, path, file, router, framework and optionally variant and localized. Explicit extra routes have file: null and router: explicit.

generateRoutes(options?, { check?: boolean }?) additionally returns output and changed. check mode rejects stale output without modifying it. validateOptions(options) throws INVALID_CONFIG for unknown keys. Import /generator and /config only in Node tooling, never in client code. withNamedRoutes comes from /next and namedRoutes from /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```

---

← Previous: [Public assets](public-assets.md) · [Back to README](../../README.md) · Next: [Guides](guides.md) →
