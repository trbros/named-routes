# asset.has() / paths() / info()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-asset-metadata.md) · [Português](../pt/topic-asset-metadata.md) · [Español](../es/topic-asset-metadata.md) · [日本語](../ja/topic-asset-metadata.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-metadata"></a>

Consulta el manifiesto generado, no el servidor publicado. has acepta una ruta local con barra inicial, query o hash opcionales; paths devuelve nombres codificados; info devuelve path, extensión, tamaño en bytes y versión, o null. Sin descubrimiento de assets, el manifiesto está vacío.

## Ejemplo

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

## Temas relacionados

- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Assets tipados](topic-typed-assets.md)

---

← Anterior: [Assets tipados](topic-typed-assets.md) · [Todos los temas](public-assets.md) · Siguiente: [asset.has()](topic-asset-has.md) →
