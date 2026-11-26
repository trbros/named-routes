# Archivos públicos · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/public-assets.md) · [Português](../pt/public-assets.md) · [Español](../es/public-assets.md) · [日本語](../ja/public-assets.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [asset() / route.asset()](#assets)
- [assetBase y CDN](#asset-base)

<a id="assets"></a>

## asset() / route.asset()

Usa `asset(path, { absolute?: boolean })` o `route.asset()` para URLs públicas en cualquier framework compatible. A diferencia de las rutas nombradas, los assets incluyen el `basePath` efectivo por defecto. No dependen del idioma, trailingSlash, nombres de rutas ni esquemas de query. El helper solo construye URLs; no comprueba archivos, sube contenido, configura CDN ni sustituye importaciones, optimización de imágenes o hashing del bundler.

Coloca los archivos en `public/` para Next.js, Nuxt, Astro y las apps Vite habituales; SvelteKit utiliza `static/` por defecto. Pasa la ruta relativa a esa carpeta (con o sin una barra inicial), sin el nombre de la carpeta ni un prefijo ya aplicado. `asset("images/logo.svg")` incluye `/app` una vez cuando la base es `/app`. Unicode y espacios se codifican; las consultas y fragmentos se conservan. Valida las entradas no confiables en la aplicación.

Configura `defaults.assetBase` en named-routes.config para sobrescribir la base de assets: `"/files"`, `"/"` (raíz) o `"https://cdn.example.com/public"`. Por defecto se usa el `basePath` efectivo de Next, Nuxt o Astro, o la base del router configurada para Vite y manifiestos manuales. Si la base de Vite, CDN de Nuxt o assetPrefix de Next difiere, configura assetBase explícitamente: no se infieren prefijos específicos del bundler. Publica tú los archivos en esa URL. `absolute: true` requiere defaults.origin salvo si la URL o assetBase es absoluta; nunca utiliza el host de la petición o el dominio del idioma. Las URLs HTTP(S) válidas se conservan; se rechazan URLs sin protocolo, otros esquemas, credenciales, rutas ambiguas y segmentos de recorrido.

El módulo generado exporta `asset` junto a `route` y `routes`. Un manifiesto manual expone `route.asset`. Consulta la guía independiente assetBase y CDN para alojar archivos fuera de la base de navegación.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```ts
// Generated module (adjust the import path to your project):
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg with basePath: "/app"
asset("logo.svg?v=2#icon"); // /app/logo.svg?v=2#icon

// Manual manifest:
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
urls.asset("images/logo.svg", { absolute: true });
// https://example.com/app/images/logo.svg
```

<a id="asset-base"></a>

## assetBase y CDN

`defaults.assetBase` reemplaza el prefijo público independientemente de `basePath`. Usa una URL HTTP(S) de CDN, un prefijo relativo a la raíz o `/` para omitir la base de navegación. No despliega archivos ni configura un CDN. No incluyas secretos en defaults: se serializan en el módulo generado. En named-routes.config usa el mismo objeto defaults.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app",
  assetBase: "https://cdn.example.com/public",
  origin: "https://example.com",
});
urls.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
urls("about", {}, { basePath: true }); // /app/about
const rootAssets = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [Helpers de rutas](route-helpers.md) · [Volver al README](../../README.es.md) · Siguiente: [Referencia de la API](api-reference.md) →
