# Base path e deploy

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-deployment.md) · [Português](../pt/topic-nextjs-deployment.md) · [Español](../es/topic-nextjs-deployment.md) · [日本語](../ja/topic-nextjs-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-deployment"></a>

Configure `basePath` no Next.js. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [assetBase e CDN](topic-asset-base.md)

---

← Anterior: [Links e navegação](topic-nextjs-navigation.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [Arquivos públicos](topic-nextjs-assets.md) →
