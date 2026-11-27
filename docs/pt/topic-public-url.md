# route.url() — URLs públicas

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-public-url.md) · [Português](../pt/topic-public-url.md) · [Español](../es/topic-public-url.md) · [日本語](../ja/topic-public-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="public-url"></a>

Assinatura: route.url(nome, { params?, query?, hash?, locale?, absolute?, basePath? }). O objeto é opcional somente quando o caminho e a query permitem. A base configurada é incluída por padrão; use basePath: false para o caminho interno. Retorna string; para Link nativo tipado use route().

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Base path — URL interna e pública](topic-base-path.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Anterior: [route()](topic-helper-route.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Parâmetros obrigatórios e encoding](topic-parameters.md) →
