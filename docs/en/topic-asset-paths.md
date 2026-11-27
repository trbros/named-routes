# asset.paths()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-paths.md) · [Português](../pt/topic-asset-paths.md) · [Español](../es/topic-asset-paths.md) · [日本語](../ja/topic-asset-paths.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-paths"></a>

List encoded public paths from the asset manifest. An unconfigured manifest returns an empty list.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

## Related topics

- [Typed assets](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Asset versioning](topic-asset-versioning.md)

---

← Previous: [asset.has()](topic-asset-has.md) · [All topics](public-assets.md) · Next: [asset.info()](topic-asset-info.md) →
