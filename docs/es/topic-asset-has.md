# asset.has()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-has.md) · [Português](../pt/topic-asset-has.md) · [Español](../es/topic-asset-has.md) · [日本語](../ja/topic-asset-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-has"></a>

Comprueba la ruta en el manifiesto local; no verifica el despliegue.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

## Temas relacionados

- [Assets tipados](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [asset.has() / paths() / info()](topic-asset-metadata.md) · [Todos los temas](public-assets.md) · Siguiente: [asset.paths()](topic-asset-paths.md) →
