# route.endpoint()

[Documentação](index.md) / [Endpoints HTTP](http-endpoints.md)

[English](../en/topic-helper-endpoint.md) · [Português](../pt/topic-helper-endpoint.md) · [Español](../es/topic-helper-endpoint.md) · [日本語](../ja/topic-helper-endpoint.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-endpoint"></a>

Associe um método HTTP explícito a uma rota conhecida. A função retornada produz um descritor readonly com método e URL; não verifica o servidor nem executa uma requisição. Prefira descritores api gerados quando a descoberta conhece os métodos.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/api/users/42" }
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ "api.users": "/api/users/[id]" }, { basePath: "/app" });
const updateUser = route.endpoint("api.users", "PATCH");
updateUser({ params: { id: 42 } }); // { method: "PATCH", url: "/app/api/users/42" }
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [api gerada — descritores HTTP](topic-endpoint-methods.md) · [Todos os tópicos](http-endpoints.md) · Próximo: [Parâmetros dinâmicos de endpoints](topic-endpoint-dynamic.md) →
