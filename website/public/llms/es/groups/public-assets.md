# Assets y CDN

# asset() / route.asset()

Topic: `assets` · Named Routes v2.2.0

Usa `asset(path, { absolute?: boolean })` o `route.asset()` para URLs públicas en cualquier framework compatible. A diferencia de las rutas nombradas, los assets incluyen el `basePath` efectivo por defecto. No dependen del idioma, trailingSlash, nombres de rutas ni esquemas de query. El helper solo construye URLs; no comprueba archivos, sube contenido, configura CDN ni sustituye importaciones, optimización de imágenes o hashing del bundler.

Coloca los archivos en `public/` para Next.js, Nuxt, Astro y las apps Vite habituales; SvelteKit utiliza `static/` por defecto. Pasa la ruta relativa a esa carpeta (con o sin una barra inicial), sin el nombre de la carpeta ni un prefijo ya aplicado. `asset("images/logo.svg")` incluye `/app` una vez cuando la base es `/app`. Unicode y espacios se codifican; las consultas y fragmentos se conservan. Valida las entradas no confiables en la aplicación.

Configura `defaults.assetBase` en named-routes.config para sobrescribir la base de assets: `"/files"`, `"/"` (raíz) o `"https://cdn.example.com/public"`. Por defecto se usa el `basePath` efectivo de Next, Nuxt o Astro, o la base del router configurada para Vite y manifiestos manuales. Si la base de Vite, CDN de Nuxt o assetPrefix de Next difiere, configura assetBase explícitamente: no se infieren prefijos específicos del bundler. Publica tú los archivos en esa URL. `absolute: true` requiere defaults.origin salvo si la URL o assetBase es absoluta; nunca utiliza el host de la petición o el dominio del idioma. Las URLs HTTP(S) válidas se conservan; se rechazan URLs sin protocolo, otros esquemas, credenciales, rutas ambiguas y segmentos de recorrido.

El módulo generado exporta `asset` junto a `route` y `routes`. Un manifiesto manual expone `route.asset`. Consulta la guía independiente assetBase y CDN para alojar archivos fuera de la base de navegación.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
import { asset } from "@/routes.generated";

asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: asset-base, asset-absolute, typed-assets, asset-has, asset-versioning
---

# route.asset()

Topic: `helper-route-asset` · Named Routes v2.2.0

route.asset está disponible en todos los helpers. El módulo generado también exporta asset directamente; comparten configuración y manifiesto.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" });
route.asset("logo.svg"); // /logo.svg
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/" }, { basePath: "/app" });
route.asset("logo.svg"); // /app/logo.svg
```

Related topic IDs: assets, asset-base
---

# assetBase y CDN

Topic: `asset-base` · Named Routes v2.2.0

`defaults.assetBase` reemplaza el prefijo público independientemente de `basePath`. Usa una URL HTTP(S) de CDN, un prefijo relativo a la raíz o `/` para omitir la base de navegación. No despliega archivos ni configura un CDN. No incluyas secretos en defaults: se serializan en el módulo generado. En named-routes.config usa el mismo objeto defaults.

## Sin base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /about
```

## Con base path

URL del archivo público: `https://cdn.example.com/public/logo.svg`.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", assetBase: "https://cdn.example.com/public" });

route.asset("logo.svg"); // https://cdn.example.com/public/logo.svg
route.url("about"); // /app/about
const rootAssets = route.withDefaults({ assetBase: "/" });
rootAssets.asset("logo.svg"); // /logo.svg
```
---

# URL absolutas de assets

Topic: `asset-absolute` · Named Routes v2.2.0

Pasa absolute: true para combinar el origen con la ruta. Un assetBase de CDN ya es absoluto. El idioma no afecta assets.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/images/logo.svg
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, { basePath: "/app", origin: "https://example.com" });
asset("images/logo.svg", { absolute: true }); // https://example.com/app/images/logo.svg
```

Related topic IDs: assets, asset-base, absolute-urls
---

# Assets tipados

Topic: `typed-assets` · Named Routes v2.2.0

Activa `assets` en named-routes.config. El generador escanea public/ (static/ en SvelteKit), ignora archivos ocultos y enlaces simbólicos, admite globs *, ** y ? en exclude y escribe un manifiesto de rutas relativas codificadas con hashes SHA-256. strict: true comprueba los literales del export asset generado; route.asset() valida en runtime. Se permiten URLs HTTP(S) remotas. No se suben archivos. Usa assets.directory para una carpeta pública personalizada. Build/check actualizan el manifiesto; watch de la CLI vigila la carpeta recursivamente.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```
---

# asset.has() / paths() / info()

Topic: `asset-metadata` · Named Routes v2.2.0

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

Related topic IDs: asset-has, asset-paths, asset-info, typed-assets
---

# asset.has()

Topic: `asset-has` · Named Routes v2.2.0

Comprueba la ruta en el manifiesto local; no verifica el despliegue.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.has("missing.svg"); // false
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.paths()

Topic: `asset-paths` · Named Routes v2.2.0

Enumera rutas públicas codificadas del manifiesto. Sin manifiesto devuelve una lista vacía.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.paths(); // ["images/logo.svg"]
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# asset.info()

Topic: `asset-info` · Named Routes v2.2.0

Lee metadatos de un archivo conocido; una ruta desconocida devuelve null.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
const logo = asset.info("images/logo.svg");
console.log(logo?.size); // 64
asset.info("missing.svg"); // null
```

Related topic IDs: typed-assets, assets, asset-versioning
---

# Versionado de assets

Topic: `asset-versioning` · Named Routes v2.2.0

Usa `{ version: true }` para añadir o reemplazar v con los primeros 12 dígitos hexadecimales del SHA-256 del contenido. Conserva query y fragmento. Activa el descubrimiento y regenera al cambiar el contenido. URLs remotas y entradas ausentes no se pueden versionar. Es cache busting, no garantía criptográfica ni purga de CDN.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /css/custom.css?theme=dark&v=a8f32c910123#top
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

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
