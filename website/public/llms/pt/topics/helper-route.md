# route()

Topic: `helper-route` · Named Routes v2.2.0

route(nome, params?, options?) retorna uma string de URL de uma rota conhecida; não navega. Parâmetros obrigatórios são tipados e validados. Query, hash e locale ficam no terceiro argumento. Para URL pública ou objeto de opções nomeadas use route.url().

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
