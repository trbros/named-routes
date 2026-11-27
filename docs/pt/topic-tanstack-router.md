# TanStack Router: configuração

[Documentação](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router.md) · [Português](../pt/topic-tanstack-router.md) · [Español](../es/topic-tanstack-router.md) · [日本語](../ja/topic-tanstack-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router"></a>

Adicione namedRoutes() junto do tanstackRouter() de @tanstack/router-plugin no vite.config. O plugin lê src/routes (ou app/routes) e escreve src/routes.generated.ts por padrão, fora da pasta de rotas, então ele nunca vira uma rota.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Na configuração do roteador existente use createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-tanstack-router-conventions.md)
- [Links e navegação](topic-tanstack-router-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-tanstack-router.md) · Próximo: [Convenções de arquivos e descoberta](topic-tanstack-router-conventions.md) →
