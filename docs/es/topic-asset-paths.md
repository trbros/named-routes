# asset.paths()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-paths.md) · [Português](../pt/topic-asset-paths.md) · [Español](../es/topic-asset-paths.md) · [日本語](../ja/topic-asset-paths.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-paths"></a>

Enumera rutas públicas codificadas del manifiesto. Sin manifiesto devuelve una lista vacía.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

## Temas relacionados

- [Assets tipados](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [asset.has()](topic-asset-has.md) · [Todos los temas](public-assets.md) · Siguiente: [asset.info()](topic-asset-info.md) →
