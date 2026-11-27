# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` verifica se uma URL corresponde à rota nomeada. Use `exact: false` para incluir descendentes correspondentes e `{ basePath: true }` para URLs públicas com base. Ideal para menus ativos, não para controle de acesso. Nomes desconhecidos são rejeitados.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
