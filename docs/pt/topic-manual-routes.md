# Rotas manuais (React, Vue, qualquer router)

[Documentação](index.md) / [Rotas manuais](framework-manual.md)

[English](../en/topic-manual-routes.md) · [Português](../pt/topic-manual-routes.md) · [Español](../es/topic-manual-routes.md) · [日本語](../ja/topic-manual-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="manual-routes"></a>

Quando as rotas são declaradas em código (<Route> do React Router, array de rotas do vue-router, servidores no estilo Express), escreva o manifesto com createRoutes. Você recebe a mesma inferência de nomes, checagem de parâmetros, codificação, query/hash, basePath e opções de i18n; apenas a descoberta é manual.

Os padrões usam a sintaxe de colchetes independentemente da sintaxe do router: /users/:id vira /users/[id], um :id? opcional vira [[id]] e um splat * vira [...splat] ou [[...splat]]. Mantenha o objeto literal (ou as const) para que nomes e parâmetros sejam inferidos.

Com createRoutes() direto, includeBasePath é false por padrão. Use caminhos internos nos roteadores e route.url() para URLs públicas. Manifestos manuais gerados incluem a base por padrão; configure defaults.includeBasePath: false quando o roteador já adiciona o prefixo.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";

const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
route("users.show", { id: 42 }); // /users/42
route.url("users.show", { params: { id: 42 } }); // /app/users/42
```

## Tópicos relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Descoberta e diretórios](topic-config-discovery.md)
- [Adicionar rotas explícitas](topic-config-extra-routes.md)
- [asset() / route.asset()](topic-assets.md)

---

[Todos os tópicos](framework-manual.md)
