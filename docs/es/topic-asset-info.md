# asset.info()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-info.md) · [Português](../pt/topic-asset-info.md) · [Español](../es/topic-asset-info.md) · [日本語](../ja/topic-asset-info.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-info"></a>

Lee metadatos de un archivo conocido; una ruta desconocida devuelve null.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

## Temas relacionados

- [Assets tipados](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Versionado de assets](topic-asset-versioning.md)

---

← Anterior: [asset.paths()](topic-asset-paths.md) · [Todos los temas](public-assets.md) · Siguiente: [Versionado de assets](topic-asset-versioning.md) →
