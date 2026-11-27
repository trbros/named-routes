# asset.has()

[Documentation](index.md) / [Assets & CDN](public-assets.md)

[English](../en/topic-asset-has.md) · [Português](../pt/topic-asset-has.md) · [Español](../es/topic-asset-has.md) · [日本語](../ja/topic-asset-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-has"></a>

Check whether a local path is in the generated asset manifest. This is not a network request and does not verify deployment.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

## Related topics

- [Typed assets](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Asset versioning](topic-asset-versioning.md)

---

← Previous: [asset.has() / paths() / info()](topic-asset-metadata.md) · [All topics](public-assets.md) · Next: [asset.paths()](topic-asset-paths.md) →
