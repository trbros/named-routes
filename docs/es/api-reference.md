# Referencia de la API · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Referencia de la API del runtime](#runtime-api)
- [Configuración del generador](#configuration)
- [Nombres estables opcionales](#stable-names)
- [API programática del generador](#generator-api)

<a id="runtime-api"></a>

## Referencia de la API del runtime

route(nombre, params?, opciones?) devuelve un string de URL. params solo es opcional cuando el patrón no tiene parámetros obligatorios. options contiene query, hash, absolute, basePath y locale. route.has(nombre) comprueba que exista y restringe un string a un nombre conocido; route.names() devuelve los nombres disponibles; route.pattern(nombre, locale?) devuelve el patrón original o localizado; route.locales() lista los idiomas; route.forLocale(locale) devuelve un helper ligado a un idioma. route.match(url), route.is(nombre, url) y route.breadcrumbs(url) convierten URLs de vuelta en nombres (consulta Enrutamiento inverso).

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, assetBase, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

route.localize(url, locale?, options?: LocalizeOptions): string | null — traduce una URL existente entre alias configurados. Opciones: sourceLocale, basePath (entrada con base), includeBasePath (salida con base), absolute (origin/dominio configurado). Conserva query y hash sin revalidar schemas de query.

`route.asset(path, options?)` y la exportación generada `asset` resuelven archivos públicos independientemente del idioma, los esquemas de query y los nombres de rutas. `AssetHelper` y `AssetOptions` son tipos exportados. `route.localize(url, locale, options?)` traduce URLs conocidas; `route.match()` busca nombre y parámetros; `route.parseQuery()` valida la query si hay esquemas en runtime.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

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

Descubrimiento: discovery ("framework" por defecto desde la 2.0: la tabla de rutas del propio framework cuando la publica, si no los archivos; "files" para el escáner de la 1.x), framework (auto por defecto, o next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app o pages), appDir/pagesDir (carpetas personalizadas de Next.js o false), routesDir (carpeta de páginas/rutas personalizada en otros frameworks), pageExtensions (valores por defecto de cada framework; funcionan extensiones compuestas como page.tsx), includeApi (false), exclude (globs relativos a la raíz con *, ** y ?).

Nombres: names (patrón de URL → nombre personalizado; cada ruta debe existir), extraRoutes (nombre → patrón explícito, por ejemplo destinos de rewrites), naming (separator, paramPrefix, home, transform) e i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Salida: output (por defecto src/routes.generated.ts; .ts, .mts, .js o .mjs, nunca dentro de un archivo enrutable), importSource (módulo desde el que el archivo generado importa createRoutes; por defecto, el nombre del paquete), exportNames (renombra routes, route, asset, RouteName y RouteLocale), defaults (basePath, assetBase, trailingSlash y origin públicos; solo se serializan estas claves), hrefs ("typed" por defecto desde la 2.0, o "string"; solo de tipos), query (módulo de schemas de query por ruta) y validateQuery (empaqueta y ejecuta esos schemas; por defecto false). Los plugins añaden watch (por defecto true); withNamedRoutes también acepta watchInterval (750 ms, 25–60000) y watchMode (auto, native o poll). Las opciones pasadas al plugin prevalecen sobre el archivo de configuración.

`defaults.assetBase` reemplaza solo el prefijo de archivos públicos. Omítelo para heredar el `basePath` efectivo; usa `"/"` o `""` para archivos en la raíz del dominio, o una URL HTTP(S) de CDN. No cambia la navegación, la localización ni la búsqueda inversa.

`exportNames.asset` cambia el nombre de la exportación generada (por defecto `asset`). Si una exportación anterior ya utiliza ese nombre, se elige un alias libre `$asset`; `route.asset` sigue disponible. No incluyas secretos en los defaults públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  discovery: "framework",            // or "files" (1.x)
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", asset: "publicAsset", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", assetBase: "https://cdn.example.com/public", trailingSlash: false },
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

← Anterior: [Archivos públicos](public-assets.md) · [Volver al README](../../README.es.md) · Siguiente: [Guías](guides.md) →
