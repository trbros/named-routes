# Base path e deploy

[Documentação](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-deployment.md) · [Português](../pt/topic-vue-deployment.md) · [Español](../es/topic-vue-deployment.md) · [日本語](../ja/topic-vue-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-deployment"></a>

Configure `history base` no Vue Router. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

Em src/main.ts configure createWebHistory(import.meta.env.BASE_URL) para usar o base do Vite do exemplo.

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

← Anterior: [Navegação — router.push()](topic-vue-programmatic.md) · [Todos os tópicos](framework-vue.md) · Próximo: [Arquivos públicos](topic-vue-assets.md) →
