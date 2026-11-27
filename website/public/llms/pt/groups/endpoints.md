# Endpoints HTTP

# api gerada — descritores HTTP

Topic: `endpoint-methods` · Named Routes v2.2.0

Ative includeApi: true. O export api contém apenas métodos declarados estaticamente. Next App Router, SvelteKit e Astro usam exports nomeados; Nuxt usa sufixos de método. Next Pages API, handlers genéricos, rotas cliente Vue, actions/loaders do React Router e rotas cliente do TanStack não permitem inferir métodos HTTP dessa forma. Métodos desconhecidos não são inventados. api.admin.post() retorna {method, url}, sem disparar uma requisição. Nomes aninhados são chaves como api["admin.alunos"].get().

## Sem base path

URL no navegador: `/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

## Com base path

URL no navegador: `/app/api/admin`.

```ts
// app/api/admin/route.ts exports GET and POST; includeApi: true
// In a separate consumer module:
import { api } from "@/routes.generated";

const { method, url } = api.admin.post();
await fetch(url, { method, body: JSON.stringify({ name: "Ana" }),
  headers: { "Content-Type": "application/json" } });
```

Related topic IDs: config-api, helper-endpoint, endpoint-dynamic, nextjs-endpoints, nuxt-endpoints, sveltekit-endpoints, astro-endpoints
---

# route.endpoint()

Topic: `helper-endpoint` · Named Routes v2.2.0

Associe um método HTTP explícito a uma rota conhecida. A função retornada produz um descritor readonly com método e URL; não verifica o servidor nem executa uma requisição. Prefira descritores api gerados quando a descoberta conhece os métodos.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

Related topic IDs: endpoint-methods, public-url
---

# Parâmetros dinâmicos de endpoints

Topic: `endpoint-dynamic` · Named Routes v2.2.0

As chaves de api gerada são nomes planos sem o prefixo api. Uma chave com pontos ou caracteres especiais usa colchetes. No modo por caminho, /api/admin/alunos/[aluno] vira api.admin.alunos.$aluno no manifesto e admin.alunos.$aluno no export api.

## Sem base path

URL no navegador: `/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

## Com base path

URL no navegador: `/app/api/admin/alunos/42`.

```ts
import { api } from "@/routes.generated";
const { method, url } = api["admin.alunos.$aluno"].get({ params: { aluno: 42 } });
```

Related topic IDs: endpoint-methods, helper-endpoint, semantic-names
