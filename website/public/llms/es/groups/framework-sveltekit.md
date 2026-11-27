# SvelteKit

# SvelteKit: configuración

Topic: `sveltekit` · Named Routes v2.2.0

Añade namedRoutes() antes de sveltekit() en vite.config. Escribir el módulo en src/lib te permite importarlo como $lib/routes.generated desde cualquier componente, función load o endpoint.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. Esta configuración es para SvelteKit 3. En SvelteKit 2 configura kit.paths.base y comparte el prefijo con routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Crea `src/routes/users/[id]/+page.svelte`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** src/routes con +page.svelte, +page.ts o +page.server.ts (se fusionan en una ruta); las carpetas (grupo) se omiten; [id=matcher] conserva el parámetro y descarta el matcher; [[lang]] es opcional; [...rest] acepta cero o más segmentos ([[...rest]]) y puede ir antes de segmentos estáticos; los reinicios de layout +page@ son páginas normales; los escapes [x+2f] y [u+0041] se decodifican. Los endpoints +server son opcionales con includeApi.

**Verificación.** Las pruebas de convención y la integración examples/sveltekit cubren descubrimiento y navegación; el ejemplo actual usa SvelteKit 3 con Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `sveltekit-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Con base path

URL en el navegador: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, sveltekit-programmatic
---

# Navegación — goto()

Topic: `sveltekit-programmatic` · Named Routes v2.2.0

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

Related topic IDs: sveltekit-navigation, sveltekit-deployment, public-url
---

# Base path y despliegue

Topic: `sveltekit-deployment` · Named Routes v2.2.0

Configura `paths.base` en SvelteKit. route() incluye la base.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

En SvelteKit 2 usa kit.paths.base en svelte.config.js y comparte el valor; el ejemplo de configuración usa SvelteKit 3.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Archivos públicos

Topic: `sveltekit-assets` · Named Routes v2.2.0

Coloca un archivo en `static/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `sveltekit-i18n` · Named Routes v2.2.0

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

# Endpoints HTTP

Topic: `sveltekit-endpoints` · Named Routes v2.2.0

Activa includeApi: true y crea `src/routes/api/admin/+server.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
