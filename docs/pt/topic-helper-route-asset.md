# route.asset()

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-helper-route-asset.md) · [Português](../pt/topic-helper-route-asset.md) · [Español](../es/topic-helper-route-asset.md) · [日本語](../ja/topic-helper-route-asset.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route-asset"></a>

O helper de assets fica disponível em route.asset em todos os helpers de runtime, inclusive tipados. O módulo gerado também exporta asset diretamente por padrão; ambos compartilham defaults e manifesto.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

## Tópicos relacionados

- [asset() / route.asset()](topic-assets.md)
- [assetBase e CDN](topic-asset-base.md)

---

← Anterior: [asset() / route.asset()](topic-assets.md) · [Todos os tópicos](public-assets.md) · Próximo: [assetBase e CDN](topic-asset-base.md) →
