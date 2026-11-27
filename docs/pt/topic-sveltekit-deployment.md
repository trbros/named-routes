# Base path e deploy

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-deployment.md) · [Português](../pt/topic-sveltekit-deployment.md) · [Español](../es/topic-sveltekit-deployment.md) · [日本語](../ja/topic-sveltekit-deployment.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-deployment"></a>

Configure `paths.base` no SvelteKit. O route() gerado inclui a base e a âncora recebe /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

No SvelteKit 2 defina kit.paths.base em svelte.config.js e compartilhe o valor com namedRoutes; o exemplo de setup usa SvelteKit 3. Não passe uma URL já prefixada a outro helper que adiciona a base.

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
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [assetBase e CDN](topic-asset-base.md)

---

← Anterior: [Navegação — goto()](topic-sveltekit-programmatic.md) · [Todos os tópicos](framework-sveltekit.md) · Próximo: [Arquivos públicos](topic-sveltekit-assets.md) →
