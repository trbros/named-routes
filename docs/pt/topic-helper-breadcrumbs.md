# route.breadcrumbs()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-breadcrumbs.md) · [Português](../pt/topic-helper-breadcrumbs.md) · [Español](../es/topic-helper-breadcrumbs.md) · [日本語](../ja/topic-helper-breadcrumbs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-breadcrumbs"></a>

`route.breadcrumbs(url, options?)` retorna correspondências conhecidas dos caminhos ancestrais, da raiz à folha. Não inventa rotas ausentes nem rótulos; associe os nomes a textos traduzidos na aplicação. Passe `{ basePath: true }` quando a URL contiver a base.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

## Tópicos relacionados

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)

---

← Anterior: [route.is()](topic-helper-is.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.has()](topic-helper-has.md) →
