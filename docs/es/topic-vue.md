# Vue Router: configuración

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue.md) · [Português](../pt/topic-vue.md) · [Español](../es/topic-vue.md) · [日本語](../ja/topic-vue.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue"></a>

Para apps Vue con enrutamiento por archivos (vue-router/vite de Vue Router 5, o unplugin-vue-router en Vue Router 4), añade namedRoutes() antes de VueRouter() y vue() en vite.config. users/_parent.vue se trata como el padre no navegable de users/, como en Vue Router 5.0.3+. El framework se detecta por unplugin-vue-router o vue-router; se escanea src/pages salvo que routesDir indique otra carpeta. Las apps que declaran un array de rutas a mano deben usar un manifiesto manual.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

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
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. En src/main.ts usa createWebHistory(import.meta.env.BASE_URL).

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

## Temas relacionados

- [Convenciones y descubrimiento](topic-vue-conventions.md)
- [Enlaces y navegación](topic-vue-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-vue.md) · Siguiente: [Convenciones y descubrimiento](topic-vue-conventions.md) →
