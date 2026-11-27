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
