# Base path e deploy

Topic: `sveltekit-deployment` · Named Routes v2.2.0

Configure `paths.base` no SvelteKit. O route() gerado inclui a base e a âncora recebe /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

No SvelteKit 2 defina kit.paths.base em svelte.config.js e compartilhe o valor com namedRoutes; o exemplo de setup usa SvelteKit 3. Não passe uma URL já prefixada a outro helper que adiciona a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
