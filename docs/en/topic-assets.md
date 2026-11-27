# asset() / route.asset()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-assets.md) · [Português](../pt/topic-assets.md) · [Español](../es/topic-assets.md) · [日本語](../ja/topic-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="assets"></a>

Use `asset(path, { absolute?: boolean })` or `route.asset()` for public URLs in any supported framework. Unlike named routes, public asset URLs include the effective `basePath` by default. They are unaffected by locale, trailingSlash, route names and query schemas. The helper builds URLs only; it does not check the filesystem, upload files, configure the CDN or replace imported assets, image optimization or bundler hashing.

Put files in `public/` for Next.js, Nuxt, Astro and the usual Vite apps; SvelteKit uses `static/` by default. Supply the file path relative to that directory (with or without one initial slash), not the directory name or an already prefixed path. For example `asset("images/logo.svg")` includes `/app` once when the base is `/app`. Unicode and spaces are URL-encoded; query strings and fragments are preserved. Do not pass untrusted URL input without application-level validation.

Set `defaults.assetBase` in named-routes.config to override the route base for assets: `"/files"`, `"/"` (root), or `"https://cdn.example.com/public"`. The default is the effective `basePath` from Next, Nuxt or Astro, or the router base configured for Vite and manual manifests. If Vite base, Nuxt CDN URL, or Next assetPrefix differs from that path, configure assetBase explicitly: bundler-specific prefixes are not inferred. Deploy the public files at that URL yourself. `absolute: true` requires defaults.origin unless the URL or assetBase is already absolute; it never uses the request host or locale domain. Valid HTTP(S) URLs passed directly are unchanged; protocol-relative URLs, non-HTTP schemes, credentials, ambiguous paths and traversal segments are rejected.

The generated module exports `asset` alongside `route` and `routes`. A manual manifest exposes `route.asset`. See the separate assetBase & CDN guide for hosting files outside the navigation base.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

<a id="without-base"></a>
## Without base path

Public file URL: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## With base path

Public file URL: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

## Related topics

- [assetBase & CDN](topic-asset-base.md)
- [Absolute asset URLs](topic-asset-absolute.md)
- [Typed assets](topic-typed-assets.md)
- [asset.has()](topic-asset-has.md)
- [Asset versioning](topic-asset-versioning.md)

---

[All topics](public-assets.md) · Next: [route.asset()](topic-helper-route-asset.md) →
