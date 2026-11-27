# asset.has() / paths() / info()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-metadata.md) · [Português](../pt/topic-asset-metadata.md) · [Español](../es/topic-asset-metadata.md) · [日本語](../ja/topic-asset-metadata.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-metadata"></a>

Inspect the generated manifest, not the deployed server. has accepts a local path with an optional leading slash/query/hash; paths returns encoded names; info returns path, extension, size in bytes and version, or null. Without asset discovery these methods report an empty manifest.

## Example

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

## Related topics

- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Typed assets](topic-typed-assets.md)

---

← Previous: [Typed assets](topic-typed-assets.md) · [All topics](public-assets.md) · Next: [asset.has()](topic-asset-has.md) →
