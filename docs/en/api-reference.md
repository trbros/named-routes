# API reference · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Runtime API reference](#runtime-api)
- [Generator configuration](#configuration)
- [Optional stable names](#stable-names)
- [Programmatic generator API](#generator-api)

<a id="runtime-api"></a>

## Runtime API reference

route(name, params?, options?) returns a URL string. params is optional only when the pattern has no required parameters. options contains query, hash, absolute, basePath and locale. route.has(name) checks existence and narrows a string to a known name; route.names() returns available names; route.pattern(name, locale?) returns the original or localized pattern; route.locales() lists locales; route.forLocale(locale) returns a helper bound to a locale.

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

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

Discovery: framework (auto by default, or next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app or pages), appDir/pagesDir (Next.js custom folders or false), routesDir (custom pages/routes folder for other frameworks), pageExtensions (framework defaults; multi-part extensions such as page.tsx work), includeApi (false), exclude (globs relative to root with *, ** and ?).

Names: names (URL pattern → custom name, every path must exist), extraRoutes (explicit name → pattern, e.g. rewrite destinations), naming (separator, paramPrefix, home, transform) and i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Output: output (default src/routes.generated.ts; .ts, .mts, .js or .mjs, never inside a routable file), importSource (module the generated file imports createRoutes from, default the package name), exportNames (rename routes, route, RouteName and RouteLocale) and defaults (public basePath, trailingSlash and origin; only these keys are serialized). Plugins add watch (default true); withNamedRoutes also accepts watchInterval (750 ms, 25–60000). Inline plugin options override the config file.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", trailingSlash: false },
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

← Previous: [Build with routes](build-with-routes.md) · [Back to README](../../README.md) · Next: [Guides](guides.md) →
