# Next.js

# Next.js: configuración

Topic: `nextjs` · Named Routes v2.2.0

Envuelve next.config con withNamedRoutes de @triooo/named-routes/next. El módulo se genera antes de next dev y next build, se mantiene al día con un watcher dentro de next dev y nunca se escribe durante next start, así que los despliegues de solo lectura son seguros. El wrapper hereda pageExtensions, basePath, trailingSlash y la configuración i18n del Pages Router.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
---

# Convenciones y descubrimiento

Topic: `nextjs-conventions` · Named Routes v2.2.0

Crea `app/users/[user]/page.tsx`. El nombre en modo de rutas por camino es `users.$user`. El framework sigue renderizando la página.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
---

# Enlaces y navegación

Topic: `nextjs-navigation` · Named Routes v2.2.0

Importa el helper generado en un componente fuera de la página de destino. El ejemplo supone el archivo de convenciones y nombres por camino. Ajusta el alias de importación.

## Sin base path

URL en el navegador: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## Con base path

URL en el navegador: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url
---

# Base path y despliegue

Topic: `nextjs-deployment` · Named Routes v2.2.0

Configura `basePath` en Next.js. route() devuelve la ruta interna; route.url() devuelve la ruta pública.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Archivos públicos

Topic: `nextjs-assets` · Named Routes v2.2.0

Coloca un archivo en `public/images/logo.svg`. Importa asset del módulo generado. Con base /app devuelve /app/images/logo.svg. El CDN es independiente del router.

## Sin base path

URL del archivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Con base path

URL del archivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Enlaces localizados

Topic: `nextjs-i18n` · Named Routes v2.2.0

Configura locales y pathnames en named-routes.config. El framework selecciona el idioma. Usa route.url con locale para URL públicas; no dupliques prefijos.

## Sin base path

URL en el navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

## Con base path

URL en el navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Endpoints HTTP

Topic: `nextjs-endpoints` · Named Routes v2.2.0

Activa includeApi: true y crea `app/api/admin/route.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
---

# Recetas para el App Router

Topic: `app-router` · Named Routes v2.2.0

El helper devuelve un string de URL normal. Úsalo con next/link, redirect o el hook useRouter del App Router de next/navigation. Ejecuta los redirects desde el flujo de servidor o de eventos adecuado; las rutas con nombre no cambian la semántica de los redirects de Next.js.

Cada nombre de estos fragmentos supone que existe la página correspondiente: posts/page.tsx, posts/[post]/page.tsx y posts/[post]/edit/page.tsx.

**Base y URLs traducidas.** El wrapper hereda basePath. Mantén Next Link y navegación del router internos; añade basePath: true para enlaces normales. Para redirigir alias traducidos entrantes, usa route.localize() con el idioma ya seleccionado en el proxy o middleware; consulta i18n.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

## Sin base path

URL en el navegador: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## Con base path

URL en el navegador: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-router-push, nextjs-redirect, nextjs-deployment
---

# Recetas para el Pages Router

Topic: `pages-router` · Named Routes v2.2.0

Usa el mismo helper generado. En las aplicaciones con Pages Router, el hook del router viene de next/router. Link no necesita un adaptador propio. El descubrimiento puede escanear ambos directorios de router durante una migración, pero las URLs canónicas en conflicto hacen fallar la generación.

**Base e i18n.** Next Link y next/router usan basePath y locale configurados. Mantén route() interno para estos consumidores. Usa basePath: true y, cuando corresponda, locale en URLs públicas normales; route.localize() requiere i18n y no instala redirects automáticamente.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

## Sin base path

URL en el navegador: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## Con base path

URL en el navegador: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
---

# Hrefs tipados para typedRoutes de Next.js

Topic: `typed-hrefs` · Named Routes v2.2.0

route() devuelve tipos template literal en lugar de string (el valor por defecto desde la 2.0): route("users.$user", { user: 42 }) tiene el tipo `/users/${string}`. typedRoutes de Next.js acepta estos valores en <Link href>, router.push(), replace() y prefetch() en ambos routers sin cast, y otros routers tipados los aceptan como strings. Solo cambian los tipos: las URLs son idénticas.

Las llamadas con query o hash devuelven la ruta más `?${string}` o `#${string}`. Las llamadas con absolute, basePath y locale devuelven string, porque Next añade basePath e idiomas por su cuenta y rechaza URLs absolutas en enlaces tipados. Los segmentos opcionales se convierten en uniones, así que /shop/[[...path]] sin parámetros tiene el tipo "/shop"; el propio typedRoutes de Next.js rechaza esa ruta base de un catch-all opcional, incluso como literal, así que pasa un segmento en ese caso.

Un tipo de retorno más estrecho puede romper código que guarda una ruta en una variable reasignada después a otro string, como useState(route(...)) seguido de setState(window.location.href): anota la variable como string, o usa hrefs: "string" para mantener el tipo de la 1.x (named-routes migrate --to 2 lo hace). Con hrefs: "string" y typedRoutes, withNamedRoutes() imprime un aviso y named-routes doctor también lo señala. Verificado con next typegen y tsc reales en Next 16 (App Router y Pages Router, webpack y Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
---

# App Router — navegación programática

Topic: `nextjs-router-push` · Named Routes v2.2.0

En un Client Component usa useRouter de next/navigation con una ruta interna. El router aplica basePath.

## Sin base path

URL en el navegador: `/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## Con base path

URL en el navegador: `/app/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

Related topic IDs: app-router, nextjs-navigation, helper-route
---

# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Usa redirect de Next.js en contexto de servidor. Named Routes solo construye la URL.

## Sin base path

URL en el navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Con base path

URL en el navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
