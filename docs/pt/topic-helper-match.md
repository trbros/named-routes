# route.match()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-match.md) · [Português](../pt/topic-helper-match.md) · [Español](../es/topic-helper-match.md) · [日本語](../ja/topic-helper-match.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-match"></a>

`route.match(url, options?)` reconhece um caminho e retorna um resultado discriminado com name, pattern, params, locale e query bruta, ou null. Use `{ basePath: true }` quando a entrada incluir a base configurada. Os parâmetros são refinados pelo nome; use parseQuery para conversão por schema. Reconhecer uma rota não é autorização.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Tópicos relacionados

- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Roteamento reverso e rota ativa](topic-reverse-routing.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.is()](topic-helper-is.md) →
