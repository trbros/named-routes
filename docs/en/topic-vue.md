# Vue Router: setup

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue.md) · [Português](../pt/topic-vue.md) · [Español](../es/topic-vue.md) · [日本語](../ja/topic-vue.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue"></a>

For Vue apps with file-based routing (Vue Router 5 vue-router/vite, or unplugin-vue-router on Vue Router 4), add namedRoutes() before VueRouter() and vue() in vite.config. users/_parent.vue is treated as the non-matchable parent of users/, as in Vue Router 5.0.3+. The framework is detected from unplugin-vue-router or vue-router; src/pages is scanned unless routesDir says otherwise. Apps that declare a routes array by hand should use a manual manifest instead.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Related topics

- [File conventions & discovery](topic-vue-conventions.md)
- [Links & navigation](topic-vue-navigation.md)
- [Installation](topic-installation.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](framework-vue.md) · Next: [File conventions & discovery](topic-vue-conventions.md) →
