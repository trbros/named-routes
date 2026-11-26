# Public assets · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/public-assets.md) · [Português](../pt/public-assets.md) · [Español](../es/public-assets.md) · [日本語](../ja/public-assets.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [asset() / route.asset()](#assets)
- [assetBase & CDN](#asset-base)

<a id="assets"></a>

## asset() / route.asset()

Use `asset(path, { absolute?: boolean })` or `route.asset()` for public URLs in any supported framework. Unlike named routes, public asset URLs include the effective `basePath` by default. They are unaffected by locale, trailingSlash, route names and query schemas. The helper builds URLs only; it does not check the filesystem, upload files, configure the CDN or replace imported assets, image optimization or bundler hashing.

Put files in `public/` for Next.js, Nuxt, Astro and the usual Vite apps; SvelteKit uses `static/` by default. Supply the file path relative to that directory (with or without one initial slash), not the directory name or an already prefixed path. For example `asset("images/logo.svg")` includes `/app` once when the base is `/app`. Unicode and spaces are URL-encoded; query strings and fragments are preserved. Do not pass untrusted URL input without application-level validation.

Set `defaults.assetBase` in named-routes.config to override the route base for assets: `"/files"`, `"/"` (root), or `"https://cdn.example.com/public"`. The default is the effective `basePath` from Next, Nuxt or Astro, or the router base configured for Vite and manual manifests. If Vite base, Nuxt CDN URL, or Next assetPrefix differs from that path, configure assetBase explicitly: bundler-specific prefixes are not inferred. Deploy the public files at that URL yourself. `absolute: true` requires defaults.origin unless the URL or assetBase is already absolute; it never uses the request host or locale domain. Valid HTTP(S) URLs passed directly are unchanged; protocol-relative URLs, non-HTTP schemes, credentials, ambiguous paths and traversal segments are rejected.

The generated module exports `asset` alongside `route` and `routes`. A manual manifest exposes `route.asset`. See the separate assetBase & CDN guide for hosting files outside the navigation base.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

```ts
// Generated module (adjust the import path to your project):
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg with basePath: "/app"
asset("logo.svg?v=2#icon"); // /app/logo.svg?v=2#icon

// Manual manifest:
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
urls.asset("images/logo.svg", { absolute: true });
// https://example.com/app/images/logo.svg
```

<a id="asset-base"></a>

## assetBase & CDN

`defaults.assetBase` overrides the public file prefix independently of `basePath`. Use an HTTP(S) CDN URL, a root-relative prefix, or `/` to opt out of the navigation base. It does not deploy files or configure a CDN. Keep secrets out of defaults; they are serialized to the generated module. In named-routes.config use the same defaults object.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app",
  assetBase: "https://cdn.example.com/public",
  origin: "https://example.com",
});
urls.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
urls("about", {}, { basePath: true }); // /app/about
const rootAssets = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Previous: [Route helpers](route-helpers.md) · [Back to README](../../README.md) · Next: [API reference](api-reference.md) →
