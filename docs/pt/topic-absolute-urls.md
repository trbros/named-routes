# URLs absolutas e origin

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-absolute-urls.md) · [Português](../pt/topic-absolute-urls.md) · [Español](../es/topic-absolute-urls.md) · [日本語](../ja/topic-absolute-urls.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="absolute-urls"></a>

Defina defaults.origin como uma origem HTTP(S) confiável, sem credenciais, caminho, query ou hash. absolute: true inclui a base. O runtime não adivinha a origem por window ou headers; não coloque segredos na configuração pública.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [route.canonical()](topic-helper-canonical.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Anterior: [Base path — URL interna e pública](topic-base-path.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Barras finais](topic-trailing-slash.md) →
