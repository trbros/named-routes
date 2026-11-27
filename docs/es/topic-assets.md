# asset() / route.asset()

[Documentación](index.md) / [Assets y CDN](public-assets.md)

[English](../en/topic-assets.md) · [Português](../pt/topic-assets.md) · [Español](../es/topic-assets.md) · [日本語](../ja/topic-assets.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="assets"></a>

Usa `asset(path, { absolute?: boolean })` o `route.asset()` para URLs públicas en cualquier framework compatible. A diferencia de las rutas nombradas, los assets incluyen el `basePath` efectivo por defecto. No dependen del idioma, trailingSlash, nombres de rutas ni esquemas de query. El helper solo construye URLs; no comprueba archivos, sube contenido, configura CDN ni sustituye importaciones, optimización de imágenes o hashing del bundler.

Coloca los archivos en `public/` para Next.js, Nuxt, Astro y las apps Vite habituales; SvelteKit utiliza `static/` por defecto. Pasa la ruta relativa a esa carpeta (con o sin una barra inicial), sin el nombre de la carpeta ni un prefijo ya aplicado. `asset("images/logo.svg")` incluye `/app` una vez cuando la base es `/app`. Unicode y espacios se codifican; las consultas y fragmentos se conservan. Valida las entradas no confiables en la aplicación.

Configura `defaults.assetBase` en named-routes.config para sobrescribir la base de assets: `"/files"`, `"/"` (raíz) o `"https://cdn.example.com/public"`. Por defecto se usa el `basePath` efectivo de Next, Nuxt o Astro, o la base del router configurada para Vite y manifiestos manuales. Si la base de Vite, CDN de Nuxt o assetPrefix de Next difiere, configura assetBase explícitamente: no se infieren prefijos específicos del bundler. Publica tú los archivos en esa URL. `absolute: true` requiere defaults.origin salvo si la URL o assetBase es absoluta; nunca utiliza el host de la petición o el dominio del idioma. Las URLs HTTP(S) válidas se conservan; se rechazan URLs sin protocolo, otros esquemas, credenciales, rutas ambiguas y segmentos de recorrido.

El módulo generado exporta `asset` junto a `route` y `routes`. Un manifiesto manual expone `route.asset`. Consulta la guía independiente assetBase y CDN para alojar archivos fuera de la base de navegación.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

<a id="without-base"></a>
## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

<a id="with-base"></a>
## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

## Temas relacionados

- [assetBase y CDN](topic-asset-base.md)
- [URL absolutas de assets](topic-asset-absolute.md)
- [Assets tipados](topic-typed-assets.md)
- [asset.has()](topic-asset-has.md)
- [Versionado de assets](topic-asset-versioning.md)

---

[Todos los temas](public-assets.md) · Siguiente: [route.asset()](topic-helper-route-asset.md) →
