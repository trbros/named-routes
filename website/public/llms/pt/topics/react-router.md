# React Router / Remix: configuração

Topic: `react-router` · Named Routes v2.2.0

Para o modo framework do React Router 7 e 8 (e Remix v2), adicione namedRoutes() antes de reactRouter() no vite.config. Os nomes vêm de react-router routes --json, a resolução do próprio framework para app/routes.ts, então arquivos de flatRoutes() e rotas declaradas com route(), index(), layout() e prefix() são todos descobertos. Uma boa saída é app/routes.generated.ts, fora de app/routes.

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

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
