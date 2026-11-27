# TanStack Router

# TanStack Router: configuración

Topic: `tanstack-router` · Named Routes v2.2.0

Añade namedRoutes() junto a tanstackRouter() de @tanstack/router-plugin en vite.config. El plugin escanea src/routes (o app/routes) y escribe src/routes.generated.ts por defecto, fuera de la carpeta de rutas, así que nunca se convierte en una ruta.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas. En el router usa createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

Related topic IDs: tanstack-router-conventions, tanstack-router-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Crea `src/routes/users/$id.tsx`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** __root se omite; index y route.tsx son la ruta de la carpeta; los archivos planos (posts.$postId.tsx) y en carpetas se combinan; $param; {-$locale} es opcional ([[locale]]); prefijo{$id}sufijo se convierte en un segmento mixto; un $ solo es un splat llamado _splat ([[..._splat]]); _layout no tiene ruta; posts_ excluye el anidamiento; los archivos con prefijo - y las carpetas (grupo) se ignoran; los archivos .lazy pertenecen a la misma ruta.

**Verificado.** Los nombres salen del routeTree.gen.ts que genera el plugin o la CLI de TanStack Router (sus rutas navegables); antes de que exista, se recorren los archivos. Tests de convenciones y examples/tanstack-router, que compila y se ejecuta con el plugin de TanStack Router.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

**Cuándo usarlo.** TanStack Router ya tipa su propio <Link to> por id de ruta. Usa route() donde haga falta un string simple: <a href>, redirects a otras apps, emails, sitemaps, analítica, URLs con prefijo de idioma y nombres compartidos con otros frameworks en un monorepo.

## Sin base path

URL en el navegador: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
---

# Navegación — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Úsalo para navegar el documento completo. Para SPA usa navigate/Link nativo con ID y params.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
---

# Base path y despliegue

Topic: `tanstack-router-deployment` · Named Routes v2.2.0

Configura `basepath` en TanStack Router. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

Configura el mismo prefijo en namedRoutes({ routerBase: "/app" }). La base de Vite no es automáticamente la del router; inheritViteBase: true es una alternativa si coinciden.

Usa createRouter({ routeTree, basepath: "/app" }) y Link nativo para sus IDs.

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

Topic: `tanstack-router-assets` · Named Routes v2.2.0

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `tanstack-router-i18n` · Named Routes v2.2.0

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

# Límites de HTTP

Topic: `tanstack-router-endpoints` · Named Routes v2.2.0

Las rutas cliente de TanStack Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
