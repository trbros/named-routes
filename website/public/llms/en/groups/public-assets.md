# Assets & CDN

# asset() / route.asset()

Topic: `assets` · Named Routes v2.2.0

Use `asset(path, { absolute?: boolean })` or `route.asset()` for public URLs in any supported framework. Unlike named routes, public asset URLs include the effective `basePath` by default. They are unaffected by locale, trailingSlash, route names and query schemas. The helper builds URLs only; it does not check the filesystem, upload files, configure the CDN or replace imported assets, image optimization or bundler hashing.

Put files in `public/` for Next.js, Nuxt, Astro and the usual Vite apps; SvelteKit uses `static/` by default. Supply the file path relative to that directory (with or without one initial slash), not the directory name or an already prefixed path. For example `asset("images/logo.svg")` includes `/app` once when the base is `/app`. Unicode and spaces are URL-encoded; query strings and fragments are preserved. Do not pass untrusted URL input without application-level validation.

Set `defaults.assetBase` in named-routes.config to override the route base for assets: `"/files"`, `"/"` (root), or `"https://cdn.example.com/public"`. The default is the effective `basePath` from Next, Nuxt or Astro, or the router base configured for Vite and manual manifests. If Vite base, Nuxt CDN URL, or Next assetPrefix differs from that path, configure assetBase explicitly: bundler-specific prefixes are not inferred. Deploy the public files at that URL yourself. `absolute: true` requires defaults.origin unless the URL or assetBase is already absolute; it never uses the request host or locale domain. Valid HTTP(S) URLs passed directly are unchanged; protocol-relative URLs, non-HTTP schemes, credentials, ambiguous paths and traversal segments are rejected.

The generated module exports `asset` alongside `route` and `routes`. A manual manifest exposes `route.asset`. See the separate assetBase & CDN guide for hosting files outside the navigation base.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

## Without base path

Public file URL: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

## With base path

Public file URL: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: asset-base, asset-absolute, typed-assets, asset-has, asset-versioning
---

# route.asset()

Topic: `helper-route-asset` · Named Routes v2.2.0

The bound asset helper is exposed as route.asset on every runtime helper, including typed helpers. A generated module normally also exports asset directly; both share the same defaults and manifest.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

Related topic IDs: assets, asset-base
---

# assetBase & CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` overrides the public file prefix independently of `basePath`. Use an HTTP(S) CDN URL, a root-relative prefix, or `/` to opt out of the navigation base. It does not deploy files or configure a CDN. Keep secrets out of defaults; they are serialized to the generated module. In named-routes.config use the same defaults object.

## Without base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## With base path

Public file URL: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
---

# Absolute asset URLs

Topic: `asset-absolute` · Named Routes v2.2.0

Pass absolute: true to combine the trusted origin with the asset path. If assetBase is an absolute CDN URL, it is already absolute. Locale does not affect asset URLs.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

Related topic IDs: assets, asset-base, absolute-urls
---

# Typed assets

Topic: `typed-assets` · Named Routes v2.2.0

Enable `assets` in named-routes.config. The generator scans public/ (static/ in SvelteKit), ignores hidden files and symlinks, supports *, ** and ? exclude globs, and writes an encoded relative path manifest with SHA-256 hashes. Set strict: true for literal path checking on the generated asset export; route.asset() checks the manifest at runtime. Remote HTTP(S) URLs remain allowed. No files are uploaded. Change assets.directory for a custom public directory. Build/check regenerate the manifest; the CLI watch watches it recursively.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
---

# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

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

Related topic IDs: asset-has, asset-paths, asset-info, typed-assets
---

# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

Check whether a local path is in the generated asset manifest. This is not a network request and does not verify deployment.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

List encoded public paths from the asset manifest. An unconfigured manifest returns an empty list.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.info()

Topic: `asset-info` · Named Routes v2.2.0

Read metadata (path, extension, size and version) for a known public file; unknown paths return null.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# Asset versioning

Topic: `asset-versioning` · Named Routes v2.2.0

Use `{ version: true }` to append or replace v with the first 12 hexadecimal digits of the SHA-256 content hash. Existing query values and fragments remain. Enable asset discovery, then rebuild when content changes. Remote URLs and missing entries cannot be versioned. This is cache busting, not a cryptographic integrity guarantee or a CDN purge.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

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
