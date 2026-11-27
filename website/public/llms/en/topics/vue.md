# Vue Router: setup

Topic: `vue` · Named Routes v2.2.0

For Vue apps with file-based routing (Vue Router 5 vue-router/vite, or unplugin-vue-router on Vue Router 4), add namedRoutes() before VueRouter() and vue() in vite.config. users/_parent.vue is treated as the non-matchable parent of users/, as in Vue Router 5.0.3+. The framework is detected from unplugin-vue-router or vue-router; src/pages is scanned unless routesDir says otherwise. Apps that declare a routes array by hand should use a manual manifest instead.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), VueRouter(), vue()],
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes. In src/main.ts use createWebHistory(import.meta.env.BASE_URL).

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
