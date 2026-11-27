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
