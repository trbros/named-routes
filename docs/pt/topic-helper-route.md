# route()

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-helper-route.md) · [Português](../pt/topic-helper-route.md) · [Español](../es/topic-helper-route.md) · [日本語](../ja/topic-helper-route.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-route"></a>

route(nome, params?, options?) retorna uma string de URL de uma rota conhecida; não navega. Parâmetros obrigatórios são tipados e validados. Query, hash e locale ficam no terceiro argumento. Para URL pública ou objeto de opções nomeadas use route.url().

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

## Tópicos relacionados

- [route.url() — URLs públicas](topic-public-url.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [Base path — URL interna e pública](topic-base-path.md)

---

[Todos os tópicos](build-with-routes.md) · Próximo: [route.url() — URLs públicas](topic-public-url.md) →
