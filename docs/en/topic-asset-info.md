# asset.info()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-info.md) · [Português](../pt/topic-asset-info.md) · [Español](../es/topic-asset-info.md) · [日本語](../ja/topic-asset-info.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-info"></a>

Read metadata (path, extension, size and version) for a known public file; unknown paths return null.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

## Related topics

- [Typed assets](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Asset versioning](topic-asset-versioning.md)

---

← Previous: [asset.paths()](topic-asset-paths.md) · [All topics](public-assets.md) · Next: [Asset versioning](topic-asset-versioning.md) →
