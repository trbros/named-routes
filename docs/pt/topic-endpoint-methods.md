# api gerada — descritores HTTP

[Documentação](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-endpoint-methods.md) · [Português](../pt/topic-endpoint-methods.md) · [Español](../es/topic-endpoint-methods.md) · [日本語](../ja/topic-endpoint-methods.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="endpoint-methods"></a>

Ative includeApi: true. O export api contém apenas métodos declarados estaticamente. Next App Router, SvelteKit e Astro usam exports nomeados; Nuxt usa sufixos de método. Next Pages API, handlers genéricos, rotas cliente Vue, actions/loaders do React Router e rotas cliente do TanStack não permitem inferir métodos HTTP dessa forma. Métodos desconhecidos não são inventados. api.admin.post() retorna {method, url}, sem disparar uma requisição. Nomes aninhados são chaves como api["admin.alunos"].get().

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Tópicos relacionados

- [Ativar descoberta de APIs](topic-config-api.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Parâmetros dinâmicos de endpoints](topic-endpoint-dynamic.md)
- [Endpoints HTTP](topic-nextjs-endpoints.md)
- [Endpoints HTTP](topic-nuxt-endpoints.md)
- [Endpoints HTTP](topic-sveltekit-endpoints.md)
- [Endpoints HTTP](topic-astro-endpoints.md)

---

[Todos os tópicos](http-endpoints.md) · Próximo: [route.endpoint()](topic-helper-endpoint.md) →
