# React Router / Remix: configuração

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router.md) · [Português](../pt/topic-react-router.md) · [Español](../es/topic-react-router.md) · [日本語](../ja/topic-react-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router"></a>

Para o modo framework do React Router 7 e 8 (e Remix v2), adicione namedRoutes() antes de reactRouter() no vite.config. Os nomes vêm de react-router routes --json, a resolução do próprio framework para app/routes.ts, então arquivos de flatRoutes() e rotas declaradas com route(), index(), layout() e prefix() são todos descobertos. Uma boa saída é app/routes.generated.ts, fora de app/routes.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Em react-router.config.ts defina basename: "/app"; no Remix use a configuração equivalente.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }), reactRouter()],
});
```

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-react-router-conventions.md)
- [Links e navegação](topic-react-router-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-react-router.md) · Próximo: [Convenções de arquivos e descoberta](topic-react-router-conventions.md) →
