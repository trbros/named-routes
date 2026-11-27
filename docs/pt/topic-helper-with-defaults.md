# route.withDefaults()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-with-defaults.md) · [Português](../pt/topic-helper-with-defaults.md) · [Español](../es/topic-helper-with-defaults.md) · [日本語](../ja/topic-helper-with-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-defaults"></a>

Crie um helper isolado com origin, basePath, assetBase ou trailingSlash diferentes. Rotas, idiomas, idioma vinculado, manifesto e schemas permanecem disponíveis. O helper original não muda; use configuração de tenant confiável no servidor, não cabeçalhos Host arbitrários. O retorno usa string para hrefs de forma conservadora.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [URLs absolutas e origin](topic-absolute-urls.md)
- [createRoutes()](topic-helper-create-routes.md)

---

← Anterior: [createRoutes()](topic-helper-create-routes.md) · [Todos os tópicos](route-helpers.md) · Próximo: [parsePattern()](topic-helper-parse-pattern.md) →
