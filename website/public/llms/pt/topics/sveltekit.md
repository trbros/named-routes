# SvelteKit: configuração

Topic: `sveltekit` · Named Routes v2.2.0

Adicione namedRoutes() antes de sveltekit() no vite.config. Gerar o módulo em src/lib permite importá-lo como $lib/routes.generated em qualquer componente, função load ou endpoint.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Esta configuração é para SvelteKit 3. No SvelteKit 2 defina kit.paths.base em svelte.config.js e compartilhe o prefixo com routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
