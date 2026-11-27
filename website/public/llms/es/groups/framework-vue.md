# Vue Router

# Vue Router: configuración

Topic: `vue` · Named Routes v2.2.0

Para apps Vue con enrutamiento por archivos (vue-router/vite de Vue Router 5, o unplugin-vue-router en Vue Router 4), añade namedRoutes() antes de VueRouter() y vue() en vite.config. users/_parent.vue se trata como el padre no navegable de users/, como en Vue Router 5.0.3+. El framework se detecta por unplugin-vue-router o vue-router; se escanea src/pages salvo que routesDir indique otra carpeta. Las apps que declaran un array de rutas a mano deben usar un manifiesto manual.

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

Related topic IDs: vue-conventions, vue-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `vue-conventions` · Named Routes v2.2.0

Crea `src/pages/users/[id].vue`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** index.vue y (nombre).vue son rutas index; los puntos anidan (users.edit.vue es /users/edit); [id] y [[id]]; [id]+ es un parámetro repetible de uno o más ([...id]) y [[id]]+ de cero o más ([[...id]]); [...path] también acepta un resto vacío ([[...path]]); las carpetas (grupo) se omiten; el anidamiento parent.vue + parent/ se fusiona; los segmentos mixtos como v[major]-[minor] funcionan.

**Verificado.** Los nombres salen del typed-router.d.ts que escribe Vue Router 5 (opción dts), así que las rutas sobrescritas con definePage({ path }) se nombran por la URL que sirven; antes de que exista, se recorren los archivos. Un servidor Vite real con estas convenciones se ejecuta en CI, y examples/vue se compila, se ejecuta y se recorre en un navegador con Vue Router 5 (vue-router/vite), incluido un layout users/_parent.vue y una página con definePage({ path }).

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `vue-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## Con base path

URL en el navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, vue-programmatic
---

# Navegación — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
---

# Base path y despliegue

Topic: `vue-deployment` · Named Routes v2.2.0

Configura `history base` en Vue Router. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En src/main.ts configura createWebHistory(import.meta.env.BASE_URL).

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Archivos públicos

Topic: `vue-assets` · Named Routes v2.2.0

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `vue-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Límites de HTTP

Topic: `vue-endpoints` · Named Routes v2.2.0

Las rutas cliente de Vue Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
