# Asset versioning

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-versioning.md) · [Português](../pt/topic-asset-versioning.md) · [Español](../es/topic-asset-versioning.md) · [日本語](../ja/topic-asset-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-versioning"></a>

Use `{ version: true }` to append or replace v with the first 12 hexadecimal digits of the SHA-256 content hash. Existing query values and fragments remain. Enable asset discovery, then rebuild when content changes. Remote URLs and missing entries cannot be versioned. This is cache busting, not a cryptographic integrity guarantee or a CDN purge.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

---

← Previous: [asset.info()](topic-asset-info.md) · [All topics](public-assets.md)
