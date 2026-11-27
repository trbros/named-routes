# Rotas manuais (React, Vue, qualquer router)

Topic: `manual-routes` · Named Routes v2.2.0

Quando as rotas são declaradas em código (<Route> do React Router, array de rotas do vue-router, servidores no estilo Express), escreva o manifesto com createRoutes. Você recebe a mesma inferência de nomes, checagem de parâmetros, codificação, query/hash, basePath e opções de i18n; apenas a descoberta é manual.

Os padrões usam a sintaxe de colchetes independentemente da sintaxe do router: /users/:id vira /users/[id], um :id? opcional vira [[id]] e um splat * vira [...splat] ou [[...splat]]. Mantenha o objeto literal (ou as const) para que nomes e parâmetros sejam inferidos.

Com createRoutes() direto, includeBasePath é false por padrão. Use caminhos internos nos roteadores e route.url() para URLs públicas. Manifestos manuais gerados incluem a base por padrão; configure defaults.includeBasePath: false quando o roteador já adiciona o prefixo.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: helper-create-routes, public-url, config-discovery, config-extra-routes, assets
