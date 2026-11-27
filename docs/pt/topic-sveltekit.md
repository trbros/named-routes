# SvelteKit: configuração

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit.md) · [Português](../pt/topic-sveltekit.md) · [Español](../es/topic-sveltekit.md) · [日本語](../ja/topic-sveltekit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit"></a>

Adicione namedRoutes() antes de sveltekit() no vite.config. Gerar o módulo em src/lib permite importá-lo como $lib/routes.generated em qualquer componente, função load ou endpoint.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-sveltekit-conventions.md)
- [Links e navegação](topic-sveltekit-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-sveltekit.md) · Próximo: [Convenções de arquivos e descoberta](topic-sveltekit-conventions.md) →
