# Primeros pasos

# Qué hace

Topic: `overview` · Named Routes v2.2.0

Named Routes genera helpers de URL tipados desde las rutas que tu framework ya conoce. Usa nombres estables en vez de reconstruir rutas. No reemplaza el router, no navega ni realiza peticiones HTTP. Empieza por la instalación y elige tu framework.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
---

# Instalación

Topic: `installation` · Named Routes v2.2.0

Instala con tu gestor de paquetes. El generador requiere Node.js 22.12+ y los tipos TypeScript 5.4+. El runtime del navegador no tiene dependencias externas; el generador usa un parser de endpoints.

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

Related topic IDs: frameworks, quick-start, configuration, mcp-installation
---

# Elige tu framework

Topic: `frameworks` · Named Routes v2.2.0

Instala el paquete una vez. Usa la integración de tu framework, crea una página e importa el helper generado. Los enlaces llevan a guías de configuración, convenciones, navegación, despliegue, assets, localización y endpoints.

Related topic IDs: nextjs, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual-routes
---

# Tu primera ruta con nombre (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Configuración mínima de Next.js: añade el wrapper en next.config.ts, inicia el servidor y sigue la guía de navegación de Next.js. Para otro framework usa su guía.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
---

# Reglas de nombres automáticos

Topic: `naming` · Named Routes v2.2.0

Los segmentos estáticos de la URL se unen con puntos. Los parámetros dinámicos, opcionales, catch-all y catch-all opcionales usan $ seguido del nombre del parámetro; los segmentos mixtos como v[major]-[minor] se convierten en v$major-$minor. La página raíz es home. El signo de dólar distingue un parámetro dinámico de un segmento literal.

Los nombres de archivo del framework (page.tsx, index, +page.svelte, _index, route.tsx) no se convierten en segmentos del nombre. Los grupos de rutas, los slots paralelos y los layouts sin ruta se omiten. Crear, mover o eliminar una página cambia el nombre público inferido; los alias opcionales mantienen un nombre estable cuando las URLs cambian.

El estilo se configura con naming: separator (por defecto "."), paramPrefix (por defecto "$", puede estar vacío) y home (por defecto "home"). En una configuración JavaScript o TypeScript, naming.transform(route) puede devolver otro nombre para cualquier ruta automática.

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```
---

# Lee el manifiesto generado

Topic: `generated-source` · Named Routes v2.2.0

Cada entrada indica el archivo relativo. Las claves normales son literales; __proto__ conserva la clave computada por seguridad. Regenera en vez de editar el archivo.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
---

# Comparación con alternativas

Topic: `comparison` · Named Routes v2.2.0

Varios paquetes y funciones de los frameworks también generan URLs tipadas. Se diferencian en de dónde salen las rutas, si las rutas tienen nombre, qué frameworks cubren y si los idiomas forman parte del modelo. Las tablas resumen lo que cada proyecto documenta o publica; las cifras de npm son la última versión y las descargas del último mes, recogidas el 2026-11-05. ✓ significa compatible, ½ parcial, — no ofrecido o no documentado.

**En qué se diferencia este paquete.** Los nombres se infieren de los archivos que ya tienes y son idénticos en Next.js, Nuxt, Vue, SvelteKit, Astro, React Router y TanStack Router; los idiomas (prefijos, rutas traducidas, dominios) forman parte de la misma llamada tipada; y route() devuelve un string simple que funciona fuera de cualquier router: redirects, emails, sitemaps o un paquete compartido por varias apps en un monorepo.

**Cuándo encaja mejor otra opción.** Si usas un solo framework y te basta con identificar las rutas por su ruta, su función integrada no requiere dependencias extra. Si necesitas validar los search params contra un esquema (Zod, Valibot), next-typesafe-url y next-safe-navigation lo hacen y este paquete no. Si tus rutas viven en un backend Laravel, Ziggy es la opción natural. next-routes está pensado para el Pages Router heredado con React 15/16, y el paquete named-routes sin scope es un proyecto de 2022 sin relación, solo con un nombre parecido.

**Integrado en los frameworks.** typedRoutes de Next.js, href() de React Router, resolve() de SvelteKit y TanStack Router tipan rutas escritas con la sintaxis de ese framework; typedPages de Nuxt tipa los nombres de ruta de Nuxt. Funcionan dentro de un framework y no comparten nombres ni un modelo de idiomas con otros. getRelativeLocaleUrl() de Astro construye URLs de idioma a partir de una ruta sin tipar.

**Paquetes**

| Paquete | Frameworks | Rutas desde | Nombres | Parámetros tipados | i18n | Generador de URL | npm (última · mes) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**Integrado en los frameworks**

| Framework | Función | Clave de ruta | Parámetros tipados | Nombres compartidos entre frameworks | Idiomas |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |
---

# Cómo funciona la generación

Topic: `architecture` · Named Routes v2.2.0

El generador Node lee archivos y tablas de rutas. Analiza declaraciones de endpoints sin ejecutar handlers. Puede usar el comando de listado del framework. El runtime del navegador no importa Node.js; el framework sirve las páginas.

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
