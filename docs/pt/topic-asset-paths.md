# asset.paths()

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-paths.md) · [Português](../pt/topic-asset-paths.md) · [Español](../es/topic-asset-paths.md) · [日本語](../ja/topic-asset-paths.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-paths"></a>

Liste caminhos públicos codificados do manifesto. Sem manifesto configurado retorna lista vazia.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

## Tópicos relacionados

- [Assets tipados](topic-typed-assets.md)
- [asset() / route.asset()](topic-assets.md)
- [Versionamento de assets](topic-asset-versioning.md)

---

← Anterior: [asset.has()](topic-asset-has.md) · [Todos os tópicos](public-assets.md) · Próximo: [asset.info()](topic-asset-info.md) →
