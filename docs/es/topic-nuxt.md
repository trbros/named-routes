# Nuxt: configuración

[Documentación](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt.md) · [Português](../pt/topic-nuxt.md) · [Español](../es/topic-nuxt.md) · [日本語](../ja/topic-nuxt.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt"></a>

Añade "@triooo/named-routes/nuxt" a modules en nuxt.config. El módulo nombra las rutas que resuelve el propio Nuxt (el hook pages:resolved), así que definePageMeta({ path, alias }) y las páginas añadidas por otros módulos se incluyen, y vuelve a generar cuando añades, mueves o eliminas páginas durante nuxt dev. Mantén la salida dentro del directorio de código e impórtala con el alias ~: con Nuxt 4 (srcDir app/) usa output app/routes.generated.ts e importa ~/routes.generated. Las opciones van en named-routes.config (compartido con la CLI) o en namedRoutes dentro de nuxt.config.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## Temas relacionados

- [Convenciones y descubrimiento](topic-nuxt-conventions.md)
- [Enlaces y navegación](topic-nuxt-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-nuxt.md) · Siguiente: [Convenciones y descubrimiento](topic-nuxt-conventions.md) →
