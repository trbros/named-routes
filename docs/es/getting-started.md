# Primeros pasos · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/getting-started.md) · [Português](../pt/getting-started.md) · [Español](../es/getting-started.md) · [日本語](../ja/getting-started.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Qué hace](#overview)
- [Comparación con alternativas](#comparison)
- [Instalación](#installation)
- [Configuración única en Next.js](#quick-start)
- [Reglas de nombres automáticos](#naming)

<a id="overview"></a>

## Qué hace

Triooo Named Routes descubre las páginas que tu framework ya enruta y genera helpers de URL tipados. Crea una página, importa route y navega por su nombre inferido. El sistema de archivos sigue siendo la fuente de verdad.

Next.js (App Router, Pages Router, carpetas src y migraciones mixtas) se integra mediante withNamedRoutes. Nuxt, el enrutamiento por archivos de Vue Router, SvelteKit, Astro, las flat routes de React Router/Remix y TanStack Router se descubren con adaptadores de convención y se mantienen al día con un plugin de Vite. Las apps que declaran rutas a mano usan el mismo runtime tipado con un manifiesto escrito a mano.

Todos los frameworks se traducen a una sola sintaxis de patrones y una sola regla de nombres, así que app/users/[user]/page.tsx, pages/users/[user].vue, src/routes/users/[user]/+page.svelte y app/routes/users.$user.tsx se convierten en users.$user. Las URLs con idioma (next-intl, i18n del Pages Router, @nuxtjs/i18n y similares) son compatibles desde la v1.

El runtime de URLs funciona en el navegador sin imports de framework ni de Node.js. El generador, solo para Node, lee rutas de archivos; nunca ejecuta tus páginas. Las herramientas requieren Node.js 20.19+ y los tipos exportados, TypeScript 5+. Next 16 y Vite 7 están cubiertos por pruebas de integración reales.

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```

<a id="comparison"></a>

## Comparación con alternativas

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

<a id="installation"></a>

## Instalación

Instala el paquete con tu gestor de paquetes favorito. No tiene dependencias en runtime. El generador requiere Node.js 20.19 o superior.

Después conéctalo una sola vez: withNamedRoutes en next.config para Next.js, o el plugin de Vite namedRoutes() para los frameworks basados en Vite. También puedes usar la CLI named-routes (generate, check, watch) en cualquier proyecto.

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

<a id="quick-start"></a>

## Configuración única en Next.js

Envuelve la configuración de Next existente una sola vez. No necesitas mapa de rutas, anotaciones en las páginas ni un comando de watcher aparte. Se admiten objetos de configuración, Promises y funciones de configuración asíncronas.

El módulo generado está por defecto en src/routes.generated.ts y exporta routes, route y RouteName. Se crea antes de que empiecen dev/build. Usa el helper generado desde Server Components, Client Components o código del Pages Router.

El alias de import @/routes.generated de abajo supone que @/* apunta a src/*. Si tu alias apunta a la raíz del proyecto, usa @/src/routes.generated o un import relativo. La configuración de Next puede seguir siendo next.config.mjs o usar next.config.ts.

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// In your application:
import { route } from "@/routes.generated";
route("user.profile");
route("users.$user", { user: "ana" });
```

<a id="naming"></a>

## Reglas de nombres automáticos

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

[Volver al README](../../README.es.md) · Siguiente: [Frameworks](frameworks.md) →
