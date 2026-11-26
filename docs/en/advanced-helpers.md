# Advanced URL helpers · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/advanced-helpers.md) · [Português](../pt/advanced-helpers.md) · [Español](../es/advanced-helpers.md) · [日本語](../ja/advanced-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Typed assets](#typed-assets)
- [asset.has() / paths() / info()](#asset-metadata)
- [Asset versioning](#asset-versioning)
- [route.withQuery()](#helper-with-query)
- [route.alternates()](#helper-alternates)
- [route.canonical()](#helper-canonical)
- [route.withDefaults()](#helper-with-defaults)
- [Audit routes and assets](#audit)
- [Helpers playground](#helpers-playground)

<a id="typed-assets"></a>

## Typed assets

Enable `assets` in named-routes.config. The generator scans public/ (static/ in SvelteKit), ignores hidden files and symlinks, supports *, ** and ? exclude globs, and writes an encoded relative path manifest with SHA-256 hashes. Set strict: true for literal path checking on the generated asset export; route.asset() checks the manifest at runtime. Remote HTTP(S) URLs remain allowed. No files are uploaded. Change assets.directory for a custom public directory. Build/check regenerate the manifest; the CLI watch watches it recursively.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

<a id="asset-metadata"></a>

## asset.has() / paths() / info()

Inspect the generated manifest, not the deployed server. has accepts a local path with an optional leading slash/query/hash; paths returns encoded names; info returns path, extension, size in bytes and version, or null. Without asset discovery these methods report an empty manifest.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

<a id="asset-versioning"></a>

## Asset versioning

Use `{ version: true }` to append or replace v with the first 12 hexadecimal digits of the SHA-256 content hash. Existing query values and fragments remain. Enable asset discovery, then rebuild when content changes. Remote URLs and missing entries cannot be versioned. This is cache busting, not a cryptographic integrity guarantee or a CDN purge.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="helper-with-query"></a>

## route.withQuery()

Update a root-relative or HTTP(S) URL without recreating its path or hash. Set null or [] to remove a key, undefined to preserve it, and an array to replace repeated values. Unchanged repeated values remain. Query encoding is normalized by URLSearchParams. Pass { name, basePath: true } when validating a known prefixed route; named patches use the route query input type. When a runtime schema is available for the matched route, the complete resulting query is validated. Type-only schemas do not validate at runtime.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```

<a id="helper-alternates"></a>

## route.alternates()

Build a map of locale URLs using existing pathnames, domains, params and query options. Absolute by default, with the base included. For nonlocalized routes or no i18n, returns an empty map. Use for hreflang and multilingual sitemaps; provide actual dynamic parameters. Locale slugs are not automatically translated.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="helper-canonical"></a>

## route.canonical()

Generate an absolute URL for metadata, using the explicit, bound or default locale (if configured). Canonical URLs always include the navigation base. Query and hash are included only if explicitly provided. It does not decide which content is canonical or remove tracking parameters automatically.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app", origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

<a id="helper-with-defaults"></a>

## route.withDefaults()

Create an isolated helper with origin, basePath, assetBase or trailingSlash overrides. Routes, locale rules, bound locale, manifest and query schemas remain available. The original helper is unchanged; use a trusted tenant configuration on the server, not arbitrary Host headers. The returned helper conservatively types generated hrefs as string.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, { origin: "https://example.com" });
const tenant = urls.withDefaults({
  origin: "https://tenant.example.com", basePath: "/dashboard",
  assetBase: "https://cdn.tenant.example.com",
});
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
urls.canonical("about"); // https://example.com/about
```

<a id="audit"></a>

## Audit routes and assets

Run audit in the consumer project to detect literal unknown route/asset references, case mismatches, duplicate base prefixes and hardcoded paths. Scans source files, skips build outputs and never rewrites them. This is a conservative lexical audit, not a full language parser: aliases, multiline expressions and dynamic URLs may be missed; hardcoded references and src warnings require review. Errors exit 1; --strict makes warnings fail, and --json gives machine-readable diagnostics.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

<a id="helpers-playground"></a>

## Helpers playground

Open /playground and scroll to the URL helpers lab. Change basePath, origin, CDN, locale, path, query and strict/version settings. Results run the real package runtime with illustrative asset metadata. The browser does not scan local files; use the CLI audit in the project.

---

← Previous: [Project](project.md) · [Back to README](../../README.md)
