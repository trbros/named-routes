# assetBase e CDN

[Documentação](index.md) / [Assets e CDN](public-assets.md)

[English](../en/topic-asset-base.md) · [Português](../pt/topic-asset-base.md) · [Español](../es/topic-asset-base.md) · [日本語](../ja/topic-asset-base.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="asset-base"></a>

`defaults.assetBase` sobrescreve o prefixo público independentemente de `basePath`. Use uma URL HTTP(S) de CDN, um prefixo relativo à raiz ou `/` para ignorar a base de navegação. Não publica arquivos nem configura CDN. Não coloque segredos em defaults: eles são serializados no módulo gerado. Em named-routes.config use o mesmo objeto defaults.

<a id="without-base"></a>
## Sem base path

URL do arquivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

<a id="with-base"></a>
## Com base path

URL do arquivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [route.asset()](topic-helper-route-asset.md) · [Todos os tópicos](public-assets.md) · Próximo: [URLs absolutas de assets](topic-asset-absolute.md) →
