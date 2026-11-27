# route.breadcrumbs()

Topic: `helper-breadcrumbs` · Named Routes v2.2.0

`route.breadcrumbs(url, options?)` retorna correspondências conhecidas dos caminhos ancestrais, da raiz à folha. Não inventa rotas ausentes nem rótulos; associe os nomes a textos traduzidos na aplicação. Passe `{ basePath: true }` quando a URL contiver a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

Related topic IDs: helper-match, helper-is
