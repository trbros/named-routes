# Vue Router: configuração

Topic: `vue` · Named Routes v2.2.0

Para apps Vue com roteamento por arquivos (vue-router/vite do Vue Router 5, ou unplugin-vue-router no Vue Router 4), adicione namedRoutes() antes de VueRouter() e vue() no vite.config. users/_parent.vue é tratado como o pai não navegável de users/, como no Vue Router 5.0.3+. O framework é detectado por unplugin-vue-router ou vue-router; src/pages é lido, a menos que routesDir indique outra pasta. Apps que declaram um array de rotas manualmente devem usar um manifesto manual.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), VueRouter(), vue()],
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Em src/main.ts use createWebHistory(import.meta.env.BASE_URL).

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});
```

Related topic IDs: vue-conventions, vue-navigation, installation, configuration
