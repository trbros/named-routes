# Referencia de la API · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Referencia de la API del runtime](#runtime-api)
- [Configuración del generador](#configuration)
- [Nombres estables opcionales](#stable-names)
- [API programática del generador](#generator-api)

<a id="runtime-api"></a>

## Referencia de la API del runtime

route(nombre, params?, opciones?) devuelve un string de URL. params solo es opcional cuando el patrón no tiene parámetros obligatorios. options contiene query, hash, absolute, basePath y locale. route.has(nombre) comprueba que exista y restringe un string a un nombre conocido; route.names() devuelve los nombres disponibles; route.pattern(nombre, locale?) devuelve el patrón original o localizado; route.locales() lista los idiomas; route.forLocale(locale) devuelve un helper ligado a un idioma.

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({
  "users.show": "/users/[user]",
  search: "/search/[[...terms]]",
});
route("users.show", { user: 1 });
route.names(); // ["users.show", "search"]
route.pattern("users.show"); // /users/[user]
const input: string = "search";
if (route.has(input)) console.log(route.pattern(input));
```

<a id="configuration"></a>

## Configuración del generador

No se requiere ningún archivo de configuración. Los archivos opcionales se buscan en este orden: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. Las configuraciones TypeScript necesitan Node.js 22.18+ (eliminación de tipos integrada); usa .mjs en versiones anteriores. Exporta defineConfig({...}) de @triooo/named-routes/config para tener autocompletado. La opción --config de la CLI selecciona otro archivo; root dentro de un archivo de configuración es relativo a ese archivo. Las opciones desconocidas o mal escritas fallan con INVALID_CONFIG.

Descubrimiento: framework (auto por defecto, o next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app o pages), appDir/pagesDir (carpetas personalizadas de Next.js o false), routesDir (carpeta de páginas/rutas personalizada en otros frameworks), pageExtensions (valores por defecto de cada framework; funcionan extensiones compuestas como page.tsx), includeApi (false), exclude (globs relativos a la raíz con *, ** y ?).

Nombres: names (patrón de URL → nombre personalizado; cada ruta debe existir), extraRoutes (nombre → patrón explícito, por ejemplo destinos de rewrites), naming (separator, paramPrefix, home, transform) e i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Salida: output (por defecto src/routes.generated.ts; .ts, .mts, .js o .mjs, nunca dentro de un archivo enrutable), importSource (módulo desde el que el archivo generado importa createRoutes; por defecto, el nombre del paquete), exportNames (renombra routes, route, RouteName y RouteLocale) y defaults (basePath, trailingSlash y origin públicos; solo se serializan estas claves). Los plugins añaden watch (por defecto true); withNamedRoutes también acepta watchInterval (750 ms, 25–60000). Las opciones pasadas al plugin prevalecen sobre el archivo de configuración.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", trailingSlash: false },
});
```

<a id="stable-names"></a>

## Nombres estables opcionales

Los nombres automáticos siguen la estructura de la URL. Si una refactorización mueve una URL pública y necesitas un nombre semántico estable, actualiza el mapa opcional names. Cada ruta con alias debe existir. Las rutas no listadas conservan sus nombres automáticos. Los nombres duplicados y los errores de escritura hacen fallar la generación en lugar de crear enlaces rotos en silencio.

Un nombre personalizado reemplaza el nombre automático de esa ruta; no añade automáticamente un segundo alias. Es útil para nombres al estilo Laravel como posts.show, pero no es necesario para el uso normal.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

<a id="generator-api"></a>

## API programática del generador

discoverRoutes(opciones?) devuelve root, framework, directories, routes, entries y los defaults del runtime sin escribir nada. Cada entrada tiene name, path, file, router, framework y, opcionalmente, variant y localized. Las rutas extra explícitas tienen file: null y router: explicit.

generateRoutes(opciones?, { check?: boolean }?) devuelve además output y changed. El modo check rechaza la salida desactualizada sin modificarla. validateOptions(opciones) lanza INVALID_CONFIG ante claves desconocidas. Importa /generator y /config solo en herramientas de Node, nunca en código de cliente. withNamedRoutes viene de /next y namedRoutes de /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```

---

← Anterior: [Construye con rutas](build-with-routes.md) · [Volver al README](../../README.es.md) · Siguiente: [Guías](guides.md) →
