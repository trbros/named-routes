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
