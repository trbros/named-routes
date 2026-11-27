# Base path e deploy

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-deployment.md) · [Português](../pt/topic-nuxt-deployment.md) · [Español](../es/topic-nuxt-deployment.md) · [日本語](../ja/topic-nuxt-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-deployment"></a>

Configure `app.baseURL` no Nuxt. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

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

← Anterior: [Navegação — navigateTo()](topic-nuxt-programmatic.md) · [Todos os tópicos](framework-nuxt.md) · Próximo: [Arquivos públicos](topic-nuxt-assets.md) →
