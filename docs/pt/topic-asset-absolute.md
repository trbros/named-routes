# URLs absolutas de assets

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-absolute.md) · [Português](../pt/topic-asset-absolute.md) · [Español](../es/topic-asset-absolute.md) · [日本語](../ja/topic-asset-absolute.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-absolute"></a>

Passe absolute: true para combinar a origem confiável com o caminho do asset. Se assetBase for um CDN absoluto, a URL já é absoluta. Locale não afeta assets.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

## Tópicos relacionados

- [asset() / route.asset()](topic-assets.md)
- [assetBase e CDN](topic-asset-base.md)
- [URLs absolutas e origin](topic-absolute-urls.md)

---

← Anterior: [assetBase e CDN](topic-asset-base.md) · [Todos os tópicos](public-assets.md) · Próximo: [Assets tipados](topic-typed-assets.md) →
