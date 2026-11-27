# asset.info()

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-info.md) · [Português](../pt/topic-asset-info.md) · [Español](../es/topic-asset-info.md) · [日本語](../ja/topic-asset-info.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-info"></a>

Leia metadados (path, extensão, tamanho e versão) de um arquivo conhecido; caminho desconhecido retorna null.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

## Tópicos relacionados

- [Assets tipados](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

← Anterior: [asset.paths()](topic-asset-paths.md) · [Todos os tópicos](public-assets.md) · Próximo: [Versionamento de assets](topic-asset-versioning.md) →
