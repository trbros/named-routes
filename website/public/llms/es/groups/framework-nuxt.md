# Nuxt

# Nuxt: configuración

Topic: `nuxt` · Named Routes v2.2.0

Añade "@triooo/named-routes/nuxt" a modules en nuxt.config. El módulo nombra las rutas que resuelve el propio Nuxt (el hook pages:resolved), así que definePageMeta({ path, alias }) y las páginas añadidas por otros módulos se incluyen, y vuelve a generar cuando añades, mueves o eliminas páginas durante nuxt dev. Mantén la salida dentro del directorio de código e impórtala con el alias ~: con Nuxt 4 (srcDir app/) usa output app/routes.generated.ts e importa ~/routes.generated. Las opciones van en named-routes.config (compartido con la CLI) o en namedRoutes dentro de nuxt.config.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

Related topic IDs: nuxt-conventions, nuxt-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `nuxt-conventions` · Named Routes v2.2.0

Crea `app/pages/users/[id].vue`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** app/pages o pages: index.vue, [id], [[id]] opcional, [...slug] (también acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), segmentos mixtos como v[major]-[minor] y anidamiento parent.vue + parent/ fusionado en una sola ruta. Los archivos que empiezan por - se ignoran. Con includeApi se escanean server/api (con prefijo /api) y server/routes y se quitan los sufijos .get/.post.

**Límites y verificación.** El módulo también escribe .nuxt/named-routes/pages.json, así que named-routes check y generate ven las mismas rutas después de nuxt prepare. Ponlo antes de @nuxtjs/i18n en modules, para que vea las rutas antes de que se localicen. El plugin de Vite sigue funcionando en Nuxt, pero solo ve los archivos. Los nombres siguen el estilo con puntos de este paquete (users.$id), no los nombres de ruta de Nuxt (users-id). Verificado con tests de convenciones y con examples/nuxt, que compila y se ejecuta con Nuxt 4, incluida una página con definePageMeta({ path }).

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `nuxt-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## Con base path

URL en el navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, nuxt-programmatic
---

# Navegación — navigateTo()

Topic: `nuxt-programmatic` · Named Routes v2.2.0

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

Related topic IDs: nuxt-navigation, nuxt-deployment, public-url
---

# Base path y despliegue

Topic: `nuxt-deployment` · Named Routes v2.2.0

Configura `app.baseURL` en Nuxt. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

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

Topic: `nuxt-assets` · Named Routes v2.2.0

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `nuxt-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

**Navegación e i18n.** Usa la URL con NuxtLink :to, navigateTo o useRouter().push. Con @nuxtjs/i18n, configura aquí los mismos idiomas: la estrategia prefix_except_default corresponde a localePrefix as-needed, prefix (o prefix_and_default) a always y no_prefix a never. Así route(nombre, params, { locale }) devuelve la URL localizada; sin locale obtienes la ruta interna para localePath(). Las rutas traducidas con defineI18nRoute deben repetirse en i18n.pathnames.

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

# Endpoints HTTP

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Activa includeApi: true y crea `server/api/admin.get.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
