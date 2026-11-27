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
