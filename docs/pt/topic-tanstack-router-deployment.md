# Base path e deploy

[Documentação](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-deployment.md) · [Português](../pt/topic-tanstack-router-deployment.md) · [Español](../es/topic-tanstack-router-deployment.md) · [日本語](../ja/topic-tanstack-router-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-deployment"></a>

Configure `basepath` no TanStack Router. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

Use createRouter({ routeTree, basepath: "/app" }) no roteador existente. Use o Link nativo tipado para os IDs próprios do TanStack.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [assetBase e CDN](topic-asset-base.md)

---

← Anterior: [Navegação — window.location.assign()](topic-tanstack-router-programmatic.md) · [Todos os tópicos](framework-tanstack-router.md) · Próximo: [Arquivos públicos](topic-tanstack-router-assets.md) →
