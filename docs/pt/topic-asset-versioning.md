# Versionamento de assets

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-versioning.md) · [Português](../pt/topic-asset-versioning.md) · [Español](../es/topic-asset-versioning.md) · [日本語](../ja/topic-asset-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-versioning"></a>

Use `{ version: true }` para adicionar ou substituir v pelos primeiros 12 dígitos hexadecimais do SHA-256 do conteúdo. Query e fragmento são preservados. Ative a descoberta e gere novamente quando mudar o conteúdo. URLs remotas e entradas ausentes não podem ser versionadas. É cache busting, não garantia criptográfica de integridade nem purge de CDN.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

---

← Anterior: [asset.info()](topic-asset-info.md) · [Todos os tópicos](public-assets.md)
