# Helpers avanzados de URL · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/advanced-helpers.md) · [Português](../pt/advanced-helpers.md) · [Español](../es/advanced-helpers.md) · [日本語](../ja/advanced-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Assets tipados](#typed-assets)
- [asset.has() / paths() / info()](#asset-metadata)
- [Versionado de assets](#asset-versioning)
- [route.withQuery()](#helper-with-query)
- [route.alternates()](#helper-alternates)
- [route.canonical()](#helper-canonical)
- [route.withDefaults()](#helper-with-defaults)
- [Auditoría de rutas y assets](#audit)
- [Playground de helpers](#helpers-playground)

<a id="typed-assets"></a>

## Assets tipados

Activa `assets` en named-routes.config. El generador escanea public/ (static/ en SvelteKit), ignora archivos ocultos y enlaces simbólicos, admite globs *, ** y ? en exclude y escribe un manifiesto de rutas relativas codificadas con hashes SHA-256. strict: true comprueba los literales del export asset generado; route.asset() valida en runtime. Se permiten URLs HTTP(S) remotas. No se suben archivos. Usa assets.directory para una carpeta pública personalizada. Build/check actualizan el manifiesto; watch de la CLI vigila la carpeta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

<a id="asset-metadata"></a>

## asset.has() / paths() / info()

Consulta el manifiesto generado, no el servidor publicado. has acepta una ruta local con barra inicial, query o hash opcionales; paths devuelve nombres codificados; info devuelve path, extensión, tamaño en bytes y versión, o null. Sin descubrimiento de assets, el manifiesto está vacío.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

<a id="asset-versioning"></a>

## Versionado de assets

Usa `{ version: true }` para añadir o reemplazar v con los primeros 12 dígitos hexadecimales del SHA-256 del contenido. Conserva query y fragmento. Activa el descubrimiento y regenera al cambiar el contenido. URLs remotas y entradas ausentes no se pueden versionar. Es cache busting, no garantía criptográfica ni purga de CDN.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="helper-with-query"></a>

## route.withQuery()

Actualiza una URL relativa a la raíz o HTTP(S) sin recrear la ruta ni el hash. Usa null o [] para eliminar, undefined para preservar y arrays para reemplazar valores repetidos. Los demás valores repetidos se conservan. URLSearchParams normaliza la codificación. Usa { name, basePath: true } para validar una ruta conocida con prefijo; el patch usa el tipo del esquema. Si hay esquema runtime para la ruta encontrada, se valida toda la query. Los esquemas solo de tipos no validan en runtime.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```

<a id="helper-alternates"></a>

## route.alternates()

Genera un mapa de URLs por idioma usando pathnames, domains, parámetros y query existentes. Por defecto URLs absolutas con la base. Rutas no localizadas o sin i18n devuelven mapa vacío. Úsalo para hreflang y sitemaps multilingües; proporciona parámetros dinámicos reales. Los slugs no se traducen automáticamente.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="helper-canonical"></a>

## route.canonical()

Genera URL absoluta para metadatos con idioma explícito, vinculado o predeterminado (si se configuró). La URL incluye la base de navegación. Query y hash solo si se proporcionan. No decide qué contenido es canónico ni elimina parámetros de seguimiento automáticamente.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app", origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

<a id="helper-with-defaults"></a>

## route.withDefaults()

Crea un helper aislado con origin, basePath, assetBase o trailingSlash distintos. Rutas, idiomas, idioma vinculado, manifiesto y esquemas siguen disponibles. El helper original no cambia; usa configuración de tenant confiable, no cabeceras Host arbitrarias. Los hrefs del resultado se tipan como string de forma conservadora.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, { origin: "https://example.com" });
const tenant = urls.withDefaults({
  origin: "https://tenant.example.com", basePath: "/dashboard",
  assetBase: "https://cdn.tenant.example.com",
});
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
urls.canonical("about"); // https://example.com/about
```

<a id="audit"></a>

## Auditoría de rutas y assets

Ejecuta audit en el proyecto consumidor para encontrar referencias literales desconocidas, diferencias de mayúsculas, prefijos duplicados y rutas hardcoded. Escanea fuentes, ignora outputs y nunca reescribe archivos. Es una auditoría léxica conservadora, no un parser completo: alias, expresiones multilínea y URLs dinámicas pueden escapar; revisa advertencias de rutas hardcoded y src. Los errores devuelven 1, --strict también falla con avisos y --json produce diagnósticos para máquinas.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

<a id="helpers-playground"></a>

## Playground de helpers

Abre /playground y busca el laboratorio de helpers. Cambia basePath, origin, CDN, idioma, ruta, query, strict y version. Ejecuta el runtime real con metadatos ilustrativos. El navegador no escanea archivos locales; usa la CLI audit en el proyecto.

---

← Anterior: [Proyecto](project.md) · [Volver al README](../../README.es.md)
