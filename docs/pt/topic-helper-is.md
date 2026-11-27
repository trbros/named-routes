# route.is()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-is.md) · [Português](../pt/topic-helper-is.md) · [Español](../es/topic-helper-is.md) · [日本語](../ja/topic-helper-is.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-is"></a>

`route.is(name, url, options?)` verifica se uma URL corresponde à rota nomeada. Use `exact: false` para incluir descendentes correspondentes e `{ basePath: true }` para URLs públicas com base. Ideal para menus ativos, não para controle de acesso. Nomes desconhecidos são rejeitados.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

## Tópicos relacionados

- [route.match()](topic-helper-match.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

← Anterior: [route.match()](topic-helper-match.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.breadcrumbs()](topic-helper-breadcrumbs.md) →
