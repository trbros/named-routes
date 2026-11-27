# asset.has() / paths() / info()

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-metadata.md) · [Português](../pt/topic-asset-metadata.md) · [Español](../es/topic-asset-metadata.md) · [日本語](../ja/topic-asset-metadata.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-metadata"></a>

Consulte o manifesto gerado, não o servidor publicado. has aceita caminho local com barra inicial, query ou hash opcionais; paths retorna nomes codificados; info retorna path, extensão, tamanho em bytes e versão, ou null. Sem descoberta de assets, o manifesto é vazio.

## Exemplo

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

## Tópicos relacionados

- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Assets tipados](topic-typed-assets.md)

---

← Anterior: [Assets tipados](topic-typed-assets.md) · [Todos os tópicos](public-assets.md) · Próximo: [asset.has()](topic-asset-has.md) →
