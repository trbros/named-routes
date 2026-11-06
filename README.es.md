# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json and docs/locales.json; run pnpm docs. -->

## Contenido

**v1.0.0**

[Guía de instalación local (en portugués)](LOCAL-DEVELOPMENT.pt-BR.md)

- [Qué hace](#overview)
- [Comparación con alternativas](#comparison)
- [Instalación](#installation)
- [Configuración única en Next.js](#quick-start)
- [Otros frameworks (plugin de Vite)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Rutas manuales (React, Vue, cualquier router)](#manual-routes)
- [Reglas de nombres automáticos](#naming)
- [Recetas para el App Router](#app-router)
- [Recetas para el Pages Router](#pages-router)
- [Parámetros y codificación](#parameters)
- [Query strings y fragmentos](#query-hash)
- [basePath, barras finales y orígenes](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript y typedRoutes de Next](#typescript)
- [Referencia de la API del runtime](#runtime-api)
- [Configuración del generador](#configuration)
- [Nombres estables opcionales](#stable-names)
- [Casos límite del descubrimiento](#discovery)
- [Actualizaciones automáticas en desarrollo](#development)
- [CLI e integración continua](#cli)
- [API programática del generador](#generator-api)
- [Errores y solución de problemas](#errors)
- [Rewrites y límites](#boundaries)
- [Sitio de documentación](#website)
- [Pruébalo: demos por framework](#demos)
- [Contribuye paso a paso](#contributing)
- [Versiones y actualizaciones](#versioning)

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

**Cuándo encaja mejor otra opción.** Si usas un solo framework y te basta con identificar las rutas por su ruta, su función integrada no requiere dependencias extra. Si necesitas validar los search params contra un esquema (Zod, Valibot), next-typesafe-url y next-safe-navigation lo hacen y este paquete no. Si tus rutas viven en un backend Laravel, Ziggy es la opción natural. next-routes está pensado para el Pages Router heredado con React 15/16, y el paquete next-named-routes sin scope es un proyecto de 2022 sin relación, solo con un nombre parecido.

**Integrado en los frameworks.** typedRoutes de Next.js, href() de React Router, resolve() de SvelteKit y TanStack Router tipan rutas escritas con la sintaxis de ese framework; typedPages de Nuxt tipa los nombres de ruta de Nuxt. Funcionan dentro de un framework y no comparten nombres ni un modelo de idiomas con otros. getRelativeLocaleUrl() de Astro construye URLs de idioma a partir de una ruta sin tipar.

**Paquetes**

| Paquete | Frameworks | Rutas desde | Nombres | Parámetros tipados | i18n | Generador de URL | npm (última · mes) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/next-named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| next-named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

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
npm install @triooo/next-named-routes
# pnpm
pnpm add @triooo/next-named-routes
# Yarn
yarn add @triooo/next-named-routes
# Bun
bun add @triooo/next-named-routes
```


<a id="quick-start"></a>

## Configuración única en Next.js

Envuelve la configuración de Next existente una sola vez. No necesitas mapa de rutas, anotaciones en las páginas ni un comando de watcher aparte. Se admiten objetos de configuración, Promises y funciones de configuración asíncronas.

El módulo generado está por defecto en src/routes.generated.ts y exporta routes, route y RouteName. Se crea antes de que empiecen dev/build. Usa el helper generado desde Server Components, Client Components o código del Pages Router.

El alias de import @/routes.generated de abajo supone que @/* apunta a src/*. Si tu alias apunta a la raíz del proyecto, usa @/src/routes.generated o un import relativo. La configuración de Next puede seguir siendo next.config.mjs o usar next.config.ts.

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/next-named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// In your application:
import { route } from "@/routes.generated";
route("user.profile");
route("users.$user", { user: "ana" });
```


<a id="frameworks"></a>

## Otros frameworks (plugin de Vite)

Añade namedRoutes() de @triooo/next-named-routes/vite a los plugins de Vite de Nuxt (vite.plugins en nuxt.config), Vue, SvelteKit, Astro (vite.plugins en astro.config), React Router o TanStack Router. Genera cuando Vite arranca o compila y regenera cuando se añaden, eliminan o renombran archivos, usando el propio watcher de Vite.

El framework se detecta a partir de package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev o @remix-run/dev, plugin/CLI/Start de TanStack Router, unplugin-vue-router o vue-router). Define framework explícitamente en monorepos o cuando la detección sea ambigua. Ejecuta npx named-routes init para crear una configuración para el framework detectado.

Las convenciones se convierten a la sintaxis del runtime. Nuxt y Vue: index, [id], [[id]] opcional, [...slug] (acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), anidamiento parent.vue + parent/, segmentos mixtos como v[major]-[minor]; Vue además trata los puntos como anidamiento (users.edit.vue) y admite parámetros repetibles [id]+. Nuxt ignora los archivos que empiezan por - y, con includeApi, escanea server/api (con prefijo /api) y server/routes, quitando los sufijos .get/.post.

SvelteKit: archivos +page.*, [id=matcher] (el matcher se descarta), [[lang]], [...rest] (cero o más segmentos), (grupo), escapes [x+2f] y endpoints +server con includeApi. Astro: src/pages con .astro/.md/.mdx/.html, archivos _privados ignorados, parámetros [...slug] y endpoints .ts/.js con includeApi.

Flat routes de React Router / Remix (app/routes): los puntos anidan, _index, $param, ($opcional), splat $ (llamado splat), layouts _sin-ruta, exclusión con nombre_, escapes [.] y módulos carpeta/route.tsx. TanStack Router (src/routes): archivos planos y en carpetas, index/route, $param, {-$opcional}, prefijo{$param}, splat $ (llamado _splat), _layouts, archivos -ignorados, (grupos) y archivos .lazy. Los segmentos estáticos opcionales como (beta) no pueden nombrarse; excluye el archivo o usa extraRoutes.

Las rutas declaradas dentro de componentes (definePageMeta({ path }) de Nuxt, routes.ts de React Router) no son visibles para un escáner de archivos: mapea esas URLs con extraRoutes o usa el manifiesto manual que se describe a continuación.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({ plugins: [namedRoutes()] });

// nuxt.config.ts
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/utils/routes.ts" })] },
});

// astro.config.mjs
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

// Any component:
import { route } from "~/utils/routes"; // or your output path
route("users.$id", { id: 42 }); // /users/42
```


<a id="nextjs"></a>

## Next.js

Envuelve next.config con withNamedRoutes de @triooo/next-named-routes/next. El módulo se genera antes de next dev y next build, se mantiene al día con un watcher dentro de next dev y nunca se escribe durante next start, así que los despliegues de solo lectura son seguros. El wrapper hereda pageExtensions, basePath, trailingSlash y la configuración i18n del Pages Router.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Navegación.** El helper devuelve strings simples para next/link, useRouter de next/navigation o next/router y redirect. Link y el router añaden el basePath por su cuenta; pasa { basePath: true } solo para enlaces simples o fetch. Con next-intl, pasa tu objeto routing como i18n: app/[locale]/about se convierte en about y el Link de next-intl recibe la ruta interna.

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

```tsx
import { withNamedRoutes } from "@triooo/next-named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// app/users/[user]/page.tsx → users.$user
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("users.$user", { user: "ana" })}>Ana</Link>;
```


<a id="nuxt"></a>

## Nuxt

Añade namedRoutes() a vite.plugins en nuxt.config. Mantén la salida dentro de tu directorio de código e impórtala con el alias ~: con Nuxt 4 (srcDir app/) usa output app/routes.generated.ts e importa ~/routes.generated. El plugin regenera mientras añades, mueves o eliminas páginas durante nuxt dev.

**Convenciones.** app/pages o pages: index.vue, [id], [[id]] opcional, [...slug] (también acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), segmentos mixtos como v[major]-[minor] y anidamiento parent.vue + parent/ fusionado en una sola ruta. Los archivos que empiezan por - se ignoran. Con includeApi se escanean server/api (con prefijo /api) y server/routes y se quitan los sufijos .get/.post.

**Navegación e i18n.** Usa la URL con NuxtLink :to, navigateTo o useRouter().push. Con @nuxtjs/i18n, configura aquí los mismos idiomas: la estrategia prefix_except_default corresponde a localePrefix as-needed, prefix (o prefix_and_default) a always y no_prefix a never. Así route(nombre, params, { locale }) devuelve la URL localizada; sin locale obtienes la ruta interna para localePath(). Las rutas traducidas con defineI18nRoute deben repetirse en i18n.pathnames.

**Límites y verificación.** Las rutas cambiadas con definePageMeta({ path }) no son visibles para el escáner; añádelas con extraRoutes. Los nombres siguen el estilo con puntos de este paquete (users.$id), no los nombres de ruta propios de Nuxt (users-id). Verificado con pruebas de convención y con examples/nuxt, que compila y se ejecuta con Nuxt 4.

```vue
// nuxt.config.ts
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/routes.generated.ts" })] },
});

<!-- app/pages/users/[id].vue → users.$id -->
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">User 42</NuxtLink>
</template>
```


<a id="vue"></a>

## Vue Router

Para apps Vue con enrutamiento por archivos (convenciones de unplugin-vue-router), añade namedRoutes() antes de VueRouter() y vue() en vite.config. El framework se detecta por unplugin-vue-router o vue-router; se escanea src/pages salvo que routesDir indique otra carpeta. Las apps que declaran un array de rutas a mano deben usar un manifiesto manual.

**Convenciones.** index.vue y (nombre).vue son rutas index; los puntos anidan (users.edit.vue es /users/edit); [id] y [[id]]; [id]+ es un parámetro repetible de uno o más ([...id]) y [[id]]+ de cero o más ([[...id]]); [...path] también acepta un resto vacío ([[...path]]); las carpetas (grupo) se omiten; el anidamiento parent.vue + parent/ se fusiona; los segmentos mixtos como v[major]-[minor] funcionan.

**Navegación.** Pasa la URL a RouterLink :to o router.push. Vue Router resuelve el string como cualquier ruta, así que el paquete no necesita acceso a la instancia del router.

**Verificado.** Un servidor real de Vite 7 con estas convenciones se ejecuta en CI, y examples/vue compila y se ejecuta con unplugin-vue-router.

```ts
// vite.config.ts
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({ plugins: [namedRoutes(), VueRouter(), vue()] });

// src/pages/users/[id].vue → users.$id
<RouterLink :to="route('users.$id', { id: 42 })">User 42</RouterLink>
```


<a id="sveltekit"></a>

## SvelteKit

Añade namedRoutes() antes de sveltekit() en vite.config. Escribir el módulo en src/lib te permite importarlo como $lib/routes.generated desde cualquier componente, función load o endpoint.

**Convenciones.** src/routes con +page.svelte, +page.ts o +page.server.ts (se fusionan en una ruta); las carpetas (grupo) se omiten; [id=matcher] conserva el parámetro y descarta el matcher; [[lang]] es opcional; [...rest] acepta cero o más segmentos ([[...rest]]) y puede ir antes de segmentos estáticos; los reinicios de layout +page@ son páginas normales; los escapes [x+2f] y [u+0041] se decodifican. Los endpoints +server son opcionales con includeApi.

**Navegación.** Usa <a href={route(...)}>, goto(route(...)) o redirect(303, route(...)). SvelteKit no añade paths.base a los enlaces simples, así que define defaults.basePath con el mismo valor y pasa { basePath: true } cuando despliegues bajo una ruta base.

**Verificado.** Pruebas de convención y examples/sveltekit, que compila y se ejecuta con SvelteKit 2 y Svelte 5.

```svelte
// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "src/lib/routes.generated.ts" }), sveltekit()],
});

<!-- src/routes/blog/[slug]/+page.svelte → blog.$slug -->
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("blog.$slug", { slug: "hello" })}>Hello</a>
```


<a id="astro"></a>

## Astro

Añade namedRoutes() a vite.plugins en astro.config. El módulo se genera por defecto en src/routes.generated.ts y puede importarse en el frontmatter .astro, en islas de framework y en endpoints.

**Convenciones.** src/pages con páginas .astro, .md, .mdx, .markdown y .html; los archivos y carpetas que empiezan por _ son privados; [id]; [...slug] acepta cero o más segmentos ([[...slug]]); segmentos mixtos como [lang]-[version]. Los endpoints .ts/.js son opcionales con includeApi y conservan su extensión interna (api/data.json.ts es /api/data.json).

**i18n.** Las carpetas físicas de idioma de Astro (src/pages/pt/about.astro) se fusionan en la misma ruta con nombre que src/pages/about.astro cuando el idioma está en i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed y true a always.

**Límites y verificación.** Las compilaciones estáticas siguen necesitando getStaticPaths en las páginas dinámicas: el paquete construye URLs, no enumera parámetros. Verificado con pruebas de convención y con examples/astro, que compila y se ejecuta con Astro 5.

```astro
// astro.config.mjs
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

---
// src/pages/docs/[...slug].astro → docs.$slug
import { route } from "../../routes.generated";
---
<a href={route("docs.$slug", { slug: ["guide", "install"] })}>Install guide</a>
```


<a id="react-router"></a>

## React Router / Remix

Para React Router 7 en modo framework (y Remix v2) con flat routes, añade namedRoutes() antes de reactRouter() en vite.config y mantén app/routes.ts como flatRoutes() de @react-router/fs-routes. Una buena salida es app/routes.generated.ts, fuera de app/routes.

**Convenciones.** Los puntos anidan (concerts.$city.tsx es /concerts/[city]); _index es el índice; $param; ($lang) es opcional ([[lang]]); un $ solo es un splat llamado splat ([[...splat]]); los prefijos _auth son layouts sin ruta; concerts_ excluye el anidamiento; los escapes [.] conservan caracteres; una carpeta con route.tsx es una ruta y las carpetas más profundas se ignoran. Un layout y su _index comparten URL y se fusionan.

**Navegación.** Usa <Link to={route(...)}>, useNavigate() o redirect() en loaders y actions.

**Límites y verificación.** Las rutas declaradas en código dentro de app/routes.ts (route(), index(), layout()) no son archivos: usa un manifiesto manual o extraRoutes. Los segmentos estáticos opcionales como (beta) no pueden nombrarse; el generador se detiene con un error claro para que excluyas el archivo. Verificado con pruebas de convención y con examples/react-router, que compila y se ejecuta con React Router 7.

```tsx
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});

// app/routes/concerts.$city.tsx → concerts.$city
import { Link } from "react-router";
import { route } from "../routes.generated";
<Link to={route("concerts.$city", { city: "lisbon" })}>Lisbon</Link>;
```


<a id="tanstack-router"></a>

## TanStack Router

Añade namedRoutes() junto a tanstackRouter() de @tanstack/router-plugin en vite.config. El plugin escanea src/routes (o app/routes) y escribe src/routes.generated.ts por defecto, fuera de la carpeta de rutas, así que nunca se convierte en una ruta.

**Convenciones.** __root se omite; index y route.tsx son la ruta de la carpeta; los archivos planos (posts.$postId.tsx) y en carpetas se combinan; $param; {-$locale} es opcional ([[locale]]); prefijo{$id}sufijo se convierte en un segmento mixto; un $ solo es un splat llamado _splat ([[..._splat]]); _layout no tiene ruta; posts_ excluye el anidamiento; los archivos con prefijo - y las carpetas (grupo) se ignoran; los archivos .lazy pertenecen a la misma ruta.

**Cuándo usarlo.** TanStack Router ya tipa su propio <Link to> por id de ruta. Usa route() donde haga falta un string simple: <a href>, redirects a otras apps, emails, sitemaps, analítica, URLs con prefijo de idioma y nombres compartidos con otros frameworks en un monorepo.

**Verificado.** Pruebas de convención y examples/tanstack-router, que compila y se ejecuta con el plugin de router de TanStack.

```tsx
// vite.config.ts
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes(), tanstackRouter({ target: "react" }), react()],
});

// src/routes/posts/$postId.tsx → posts.$postId
import { route } from "../../routes.generated";
<a href={route("posts.$postId", { postId: 42 }, { absolute: true })}>Share</a>;
```


<a id="manual-routes"></a>

## Rutas manuales (React, Vue, cualquier router)

Cuando las rutas se declaran en código (<Route> de React Router, un array de rutas de vue-router, servidores tipo Express), escribe tú mismo el manifiesto con createRoutes. Obtienes la misma inferencia de nombres, comprobación de parámetros, codificación, query/hash, basePath e i18n; solo el descubrimiento es manual.

Los patrones usan la sintaxis de corchetes sin importar la sintaxis del router: /users/:id se convierte en /users/[id], un :id? opcional en [[id]] y un splat * en [...splat] o [[...splat]]. Mantén el objeto literal (o as const) para que se infieran los nombres y los parámetros.

Para compartir un módulo generado de todos modos (por ejemplo, desde un paquete de un monorepo), define framework: "manual" y lista las rutas en extraRoutes; el generador escribe el mismo módulo tipado sin escanear.

```tsx
// src/routes.ts
import { createRoutes } from "@triooo/next-named-routes";
export const route = createRoutes({
  home: "/",
  "users.show": "/users/[id]",       // <Route path="/users/:id">
  "docs.page": "/docs/[[...path]]",   // <Route path="/docs/*">
});

// React Router
<Link to={route("users.show", { id: 42 })}>Ana</Link>
// Vue Router
<RouterLink :to="route('users.show', { id: 42 })">Ana</RouterLink>
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


<a id="app-router"></a>

## Recetas para el App Router

El helper devuelve un string de URL normal. Úsalo con next/link, redirect o el hook useRouter del App Router de next/navigation. Ejecuta los redirects desde el flujo de servidor o de eventos adecuado; las rutas con nombre no cambian la semántica de los redirects de Next.js.

Cada nombre de estos fragmentos supone que existe la página correspondiente: posts/page.tsx, posts/[post]/page.tsx y posts/[post]/edit/page.tsx.

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```


<a id="pages-router"></a>

## Recetas para el Pages Router

Usa el mismo helper generado. En las aplicaciones con Pages Router, el hook del router viene de next/router. Link no necesita un adaptador propio. El descubrimiento puede escanear ambos directorios de router durante una migración, pero las URLs canónicas en conflicto hacen fallar la generación.

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
```


<a id="parameters"></a>

## Parámetros y codificación

[id] requiere un string no vacío o un número finito. [[id]] (Nuxt, Vue, SvelteKit, React Router, TanStack) es un escalar opcional; omitirlo elimina el segmento. [...slug] requiere un array no vacío de strings/números. [[...slug]] acepta un array opcional; un valor omitido, null o [] elimina la parte catch-all. Los segmentos mixtos requieren todos los parámetros que contienen.

Cada segmento de parámetro se codifica por separado. Una barra dentro de un escalar se codifica, mientras que un array catch-all produce segmentos de ruta separados. Los parámetros extra, los valores obligatorios vacíos, NaN, Infinity, los objetos y los segmentos . o .. aislados fallan. Estas comprobaciones validan la construcción de la URL, no los identificadores de negocio de tu aplicación.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```


<a id="query-hash"></a>

## Query strings y fragmentos

Pasa query y hash en el tercer argumento. Los valores de query pueden ser strings, números finitos, booleanos o arrays de solo lectura con esos valores. null y undefined se omiten, también dentro de arrays. Los arrays repiten la clave; no usan notación de corchetes.

El hash es un string sin el # inicial y el helper lo codifica. Permanece en el navegador y no se envía al servidor. Los strings de hash y los objetos de query se validan en runtime.

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```


<a id="base-path"></a>

## basePath, barras finales y orígenes

Next Link y la navegación del router añaden el basePath por su cuenta. Las URLs relativas del helper lo omiten por defecto para evitar prefijos duplicados. Para enlaces simples, fetch u otros consumidores, pide basePath: true. absolute: true siempre incluye el basePath y requiere defaults.origin.

withNamedRoutes hereda basePath y trailingSlash de la configuración de Next. Una opción defaults explícita prevalece sobre los valores heredados. El origin debe ser un origen HTTP(S) sin credenciales, ruta distinta de la raíz, query ni hash; nunca se adivina a partir de una petición o de window.

Todos los defaults se serializan en el módulo generado, que es público. Nunca pongas secretos en ellos. trailingSlash da formato a las rutas generadas; Next sigue siendo responsable de los redirects y de la normalización final.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```


<a id="i18n"></a>

## Idiomas e i18n

Configura i18n con locales, defaultLocale y, opcionalmente, localePrefix, pathnames y domains. La forma coincide con defineRouting() de next-intl, así que puedes pasar ese objeto routing directamente; las claves exclusivas de next-intl como localeCookie se aceptan y se ignoran. En proyectos Next.js con Pages Router, withNamedRoutes hereda automáticamente el i18n de next.config (localePrefix as-needed, dominios incluidos).

Una primera carpeta dinámica llamada locale o lang (app/[locale]/…, pages/[lang]/…, cámbialo con localeParam) se elimina de los nombres y patrones: app/[locale]/about/page.tsx se convierte en about → /about. Las carpetas físicas de idioma (src/pages/pt/about.astro) se fusionan en la misma ruta. Sin carpeta de idioma (i18n del Pages Router, @nuxtjs/i18n, rewrites de middleware), todas las páginas se localizan. Los endpoints y las rutas fuera de [locale] se listan como unlocalized y nunca reciben prefijo.

route(nombre, params) sin locale devuelve la ruta interna, que es lo que esperan el Link de next-intl, el Link del Pages Router y el localePath de @nuxtjs/i18n. Pasa { locale } para enlaces simples, redirects, sitemaps, emails o selectores de idioma. route.forLocale(locale) devuelve un helper ligado a ese idioma y route.locales() lista los idiomas configurados.

localePrefix: always (por defecto) pone prefijo a todos los idiomas; as-needed omite el idioma por defecto; never omite todos los prefijos; { mode, prefixes: { "en-US": "/us" } } los personaliza. pathnames asigna a un patrón interno patrones localizados con los mismos parámetros. Con absolute: true, un idioma servido por un dominio configurado usa ese dominio como origen. Los idiomas están tipados: el módulo generado exporta RouteLocale y los idiomas desconocidos son errores de tipos y de runtime.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```


<a id="typescript"></a>

## TypeScript y typedRoutes de Next

Los patrones literales infieren uniones de nombres y objetos de parámetros. Los parámetros obligatorios se comprueban en tiempo de compilación; las rutas catch-all opcionales pueden llamarse sin parámetros. El runtime sigue validando las llamadas desde JavaScript.

route() devuelve string, no el tipo Route generado por Next. Cuando typedRoutes de Next está activado, su validación de Link puede requerir una aserción a Route. El paquete sigue comprobando el nombre de la ruta y los parámetros. No hagas aserciones de entradas arbitrarias no confiables a un nombre de ruta para saltarte la validación.

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```


<a id="runtime-api"></a>

## Referencia de la API del runtime

route(nombre, params?, opciones?) devuelve un string de URL. params solo es opcional cuando el patrón no tiene parámetros obligatorios. options contiene query, hash, absolute, basePath y locale. route.has(nombre) comprueba que exista y restringe un string a un nombre conocido; route.names() devuelve los nombres disponibles; route.pattern(nombre, locale?) devuelve el patrón original o localizado; route.locales() lista los idiomas; route.forLocale(locale) devuelve un helper ligado a un idioma.

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

```ts
import { createRoutes } from "@triooo/next-named-routes";
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

No se requiere ningún archivo de configuración. Los archivos opcionales se buscan en este orden: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. Las configuraciones TypeScript necesitan Node.js 22.18+ (eliminación de tipos integrada); usa .mjs en versiones anteriores. Exporta defineConfig({...}) de @triooo/next-named-routes/config para tener autocompletado. La opción --config de la CLI selecciona otro archivo; root dentro de un archivo de configuración es relativo a ese archivo. Las opciones desconocidas o mal escritas fallan con INVALID_CONFIG.

Descubrimiento: framework (auto por defecto, o next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app o pages), appDir/pagesDir (carpetas personalizadas de Next.js o false), routesDir (carpeta de páginas/rutas personalizada en otros frameworks), pageExtensions (valores por defecto de cada framework; funcionan extensiones compuestas como page.tsx), includeApi (false), exclude (globs relativos a la raíz con *, ** y ?).

Nombres: names (patrón de URL → nombre personalizado; cada ruta debe existir), extraRoutes (nombre → patrón explícito, por ejemplo destinos de rewrites), naming (separator, paramPrefix, home, transform) e i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Salida: output (por defecto src/routes.generated.ts; .ts, .mts, .js o .mjs, nunca dentro de un archivo enrutable), importSource (módulo desde el que el archivo generado importa createRoutes; por defecto, el nombre del paquete), exportNames (renombra routes, route, RouteName y RouteLocale) y defaults (basePath, trailingSlash y origin públicos; solo se serializan estas claves). Los plugins añaden watch (por defecto true); withNamedRoutes también acepta watchInterval (750 ms, 25–60000). Las opciones pasadas al plugin prevalecen sobre el archivo de configuración.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/next-named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/next-named-routes",
  exportNames: { route: "url", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", trailingSlash: false },
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


<a id="discovery"></a>

## Casos límite del descubrimiento

Next.js: el escáner considera app y pages a la vez. El directorio app de la raíz tiene prioridad sobre src/app, de forma independiente de la misma regla entre pages y src/pages. Los demás frameworks usan sus carpetas estándar (Nuxt app/pages o pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) salvo que se defina routesDir. No se siguen los enlaces simbólicos de directorios, las carpetas ocultas ni node_modules; los archivos .d.ts se ignoran.

App Router: por defecto solo se incluyen los archivos page. Los grupos y los slots no forman parte de las URLs. Las intercepciones se resuelven a rutas canónicas y las variantes equivalentes se consolidan. Las carpetas privadas _ se ignoran; %5F produce un guion bajo público. Los archivos layout, loading, default, error y de metadatos se excluyen.

Pages Router: _app, _document y _error de la raíz se excluyen; las demás páginas con guion bajo siguen siendo válidas. index se elimina. Las API Routes, los Route Handlers y los endpoints de otros frameworks son opcionales mediante includeApi o --api. Las URLs no modelan métodos HTTP, permisos ni validación de endpoints.

Las formas de URL en conflicto (por ejemplo, [id] y [slug] en el mismo lugar) y las colisiones de nombres inferidos hacen fallar la generación. En Next.js, las URLs canónicas duplicadas y los conflictos de especificidad con catch-all opcional también fallan, igual que en Next. En los routers con layouts anidados (Nuxt, Vue, React Router, TanStack), un layout y su index que comparten URL se fusionan en una sola ruta.


<a id="development"></a>

## Actualizaciones automáticas en desarrollo

Next.js: el wrapper genera antes de que Next arranque y luego ejecuta un watcher por sondeo, serializado, dentro del proceso de desarrollo. Detecta páginas añadidas, eliminadas y renombradas; el módulo solo cambia cuando cambia su contenido. No se modifican hooks de webpack ni de Turbopack. Nunca escribe durante next start (servidor de producción), así que los despliegues de solo lectura son seguros.

Frameworks con Vite: el plugin genera en buildStart y reacciona a los eventos add/unlink del watcher de Vite, además de los cambios en el archivo de configuración de named-routes. Encuentra la raíz del proyecto subiendo desde la raíz de Vite hasta package.json, así que el srcDir de Nuxt funciona.

Los watchers no se ejecutan durante las compilaciones de producción y no mantienen el proceso vivo por sí mismos. Un error de generación durante la edición conserva el último módulo válido y registra el error. Los cambios en módulos importados por la configuración requieren reiniciar. watch: false solo desactiva las actualizaciones continuas, no la generación inicial.


<a id="cli"></a>

## CLI e integración continua

El binario se llama named-routes (next-named-routes es un alias). generate (por defecto) escribe el manifiesto. list imprime las entradas descubiertas en JSON. check compara sin escribir y sale con código 1 cuando está desactualizado. watch genera al inicio y sondea hasta SIGINT/SIGTERM. init escribe named-routes.config.mjs para el framework detectado y nunca sobrescribe una configuración existente.

Opciones: --root <directorio>, --config <archivo>, --framework <nombre>, --output <archivo>, --routes-dir <carpeta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --version (-v), --help (-h). Ejecuta los comandos desde el proyecto consumidor con el paquete instalado localmente.

Si versionas el archivo generado, ejecuta check antes del build. Las integraciones regeneran durante el build, así que un check posterior no puede detectar un archivo versionado que ya estaba desactualizado. La generación es determinista, atómica y sin marcas de tiempo. Los archivos existentes sin la firma del generador nunca se sobrescriben.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```


<a id="generator-api"></a>

## API programática del generador

discoverRoutes(opciones?) devuelve root, framework, directories, routes, entries y los defaults del runtime sin escribir nada. Cada entrada tiene name, path, file, router, framework y, opcionalmente, variant y localized. Las rutas extra explícitas tienen file: null y router: explicit.

generateRoutes(opciones?, { check?: boolean }?) devuelve además output y changed. El modo check rechaza la salida desactualizada sin modificarla. validateOptions(opciones) lanza INVALID_CONFIG ante claves desconocidas. Importa /generator y /config solo en herramientas de Node, nunca en código de cliente. withNamedRoutes viene de /next y namedRoutes de /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/next-named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```


<a id="errors"></a>

## Errores y solución de problemas

NamedRouteError extiende Error y expone un code estable. UNKNOWN_ROUTE indica que el nombre no existe; MISSING_PARAMETER, que se omitió un valor obligatorio; UNKNOWN_PARAMETER, que una clave extra pertenece a la query o está mal escrita; INVALID_PARAMETER, que un valor tiene una forma incorrecta o contiene un segmento prohibido; INVALID_LOCALE, que se pasó un idioma sin i18n o que no está configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identifican definiciones de ruta mal formadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identifican opciones inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rechazan defaults de URL. MISSING_ORIGIN exige un origin antes de pedir URLs absolutas. GENERATION_ERROR cubre conflictos de descubrimiento, salidas inseguras y checks desactualizados; INVALID_CONFIG cubre configuraciones ausentes, mal formadas o mal escritas.

No se encuentra routes.generated: confirma que la integración se ejecuta, ejecuta generate y revisa output y los alias de import. basePath o idioma duplicados: usa URLs relativas con los enlaces del framework y pasa basePath/locale solo para URLs simples. Nombres desactualizados: confirma que el watcher está activo y revisa los errores de la terminal. Un error de tipos después de mover una página es lo esperado: actualiza el nombre inferido o define un nombre estable.

La generación se niega a sobrescribir un archivo de salida escrito a mano. Elige otro output en lugar de añadir la firma de generado a código no relacionado. Mantén la salida generada fuera de los archivos enrutables. La interpolación dinámica no autoriza una petición; valida los permisos y las entradas de la aplicación en el destino.

```ts
import { NamedRouteError } from "@triooo/next-named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```


<a id="boundaries"></a>

## Rewrites y límites

Es un constructor de URLs, no un reemplazo del router, un middleware, un sistema de autorización ni un cliente HTTP. No crea rutas en runtime, no valida que existan los recursos, no detecta el idioma del visitante ni hace peticiones al backend.

Los redirects, los rewrites, la detección de idioma por middleware y las rutas declaradas en el código de los componentes siguen siendo responsabilidad de la aplicación. Mapea explícitamente con extraRoutes cualquier patrón externo o reescrito que necesites y evita aplicar el idioma o el basePath dos veces. El escáner no lee los archivos de configuración del framework; usa withNamedRoutes o las opciones para pasar ajustes.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```


<a id="website"></a>

## Sitio de documentación

Esta documentación es una app Next.js en website/. Es el sitio público del proyecto, construido con el propio paquete: todos los enlaces internos usan route(), el playground y las páginas de destino son rutas reales del App Router, y el contenido en inglés, portugués, español y japonés sale del mismo docs/content.json que genera los README.

La página principal muestra cada framework compatible como una línea de un mapa de transporte, un panel de salidas alimentado con resultados reales del generador, una tabla de compatibilidad y un recorrido de instalación. Las animaciones son finitas o las inicia el usuario, se pausan fuera de pantalla y se desactivan con prefers-reduced-motion.

Para desplegar en Vercel, crea un proyecto con Root Directory en website y deja activada la opción "Include files outside the root directory". website/vercel.json instala el repositorio, compila el paquete y después compila el sitio. No se necesitan variables de entorno.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```


<a id="demos"></a>

## Pruébalo: demos por framework

examples/ contiene una pequeña app ejecutable para cada configuración compatible: app-router y pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router y react (rutas declaradas a mano con createRoutes). Cada una enlaza por nombre a una página estática, una página dinámica de usuarios y una página catch-all de documentación.

Las demos dependen del paquete mediante file:../.., así que compila el paquete una vez en la raíz del repositorio y después instala y ejecuta cualquier demo con npm. El módulo generado aparece en la primera ejecución de dev o build y cambia a medida que añades páginas. Cada demo compila con su framework real.

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```


<a id="contributing"></a>

## Contribuye paso a paso

**1. Requisitos.** Instala Node.js 20.19 o superior (22.18+ si quieres cargar archivos named-routes.config.ts), Git y Python 3 (solo se usa para generar los README). Activa pnpm 12.16.1, la versión fijada en package.json: corepack enable o npm install --global pnpm@12.16.1.

**2. Clona y compila.** Clona el repositorio, ejecuta pnpm install en la raíz y luego pnpm build. El build limpia dist/ y compila src/*.ts a JavaScript ESM, declaraciones y source maps. Vuelve a ejecutar pnpm build después de cada cambio en src/: el sitio y las demos usan dist/, no los fuentes TypeScript.

**3. Conoce la estructura.** src/index.ts es el runtime que funciona en el navegador (createRoutes, i18n, patrones); src/frameworks.ts contiene los adaptadores de convenciones de archivos; src/generator.ts descubre, valida y escribe el módulo; src/config.ts carga named-routes.config.*; src/next.ts y src/vite.ts son las integraciones; src/cli.ts es el binario named-routes. tests/ tiene la suite de Node y los smoke tests. docs/locales.json lista los idiomas, docs/content.json guarda la documentación multilingüe y website/messages/<código>.json los textos de la interfaz. website/ es este sitio, examples/ tiene una demo por framework y scripts/ tiene las utilidades de versiones, documentación e idiomas.

**4. Prueba mientras trabajas.** pnpm check compila y ejecuta todas las pruebas de Node y los contratos TypeScript positivos y negativos; es lo que la CI ejecuta en Node 20, 22, 24 y 26. pnpm test:next inicia servidores reales de Next.js (instala antes examples/app-router con pnpm --dir examples/app-router install). pnpm test:vite inicia un servidor real de Vite. pnpm test:package empaqueta el tarball y lo instala en un proyecto limpio. pnpm release:check ejecuta todo lo anterior.

**5. Edita la documentación.** docs/content.json es la fuente única del sitio y de todos los README. Cada sección tiene id, title.<código>, paragraphs.<código> (una lista de párrafos por idioma), code y language; los códigos son en, pt, es y ja. El inglés es el idioma de origen: escribe primero el texto en inglés y mantén el mismo número de párrafos en todos los idiomas. **texto** se muestra en negrita en el sitio y en el README. Una sección nueva también debe añadirse a un grupo de website/lib/docs.ts (con título en todos los idiomas); si no, no aparece en la barra lateral. Su página es /docs/<id>.

**6. Traduce y sincroniza los idiomas.** Ejecuta pnpm locales (node scripts/sync-locales.mjs) después de cambiar texto en inglés. Compara cada idioma con el inglés en docs/content.json y website/messages/*.json, completa lo que falte con el texto en inglés para que el sitio siga funcionando, elimina las claves de interfaz que ya no existen en inglés, reordena las claves según en.json e imprime la lista "Needs translation". Traduce cada elemento listado en su idioma y luego ejecuta pnpm locales:check (node scripts/sync-locales.mjs --check): no modifica nada y falla si faltan títulos o párrafos, si el número de párrafos es distinto, si los marcadores **negrita** están desbalanceados, si faltan o sobran claves de interfaz, si difieren placeholders ICU como {count}, si las claves están fuera de orden o si falta un idioma en website/lib/locales.ts. La CI ejecuta esta comprobación. node scripts/sync-locales.mjs --untranslated también lista los textos que siguen siendo idénticos al inglés, útil para revisar un idioma antes de publicar.

**7. Sincroniza los README.** Ejecuta pnpm docs (python3 scripts/sync-docs.py) para regenerar README.md, README.pt-BR.md, README.es.md y README.ja.md a partir de docs/content.json y docs/locales.json, y versiónalos todos. pnpm docs:check falla cuando algún README está desactualizado; la CI lo ejecuta, así que nunca edites los README a mano. El orden habitual es: editar el inglés, pnpm locales, traducir, pnpm locales:check, pnpm docs.

**8. Añade un idioma nuevo.** (a) Añade una entrada en docs/locales.json con code, name, htmlLang, readme (por ejemplo README.fr.md) y las etiquetas del README contents, references y localGuide. (b) Añade el código a la unión Locale de website/lib/locales.ts y un título para él en cada grupo de website/lib/docs.ts. (c) Ejecuta pnpm locales: crea website/messages/<código>.json y completa docs/content.json con el texto en inglés como provisional. (d) Traduce cada elemento que liste. (e) Añade el nuevo README a la lista files de package.json. (f) Si la escritura necesita otras fuentes o un salto de línea distinto (como el japonés), añade reglas para html[lang="<código>"] en website/app/transit.css. (g) Ejecuta pnpm locales:check, pnpm docs, pnpm --dir website check:i18n y pnpm --dir website build. El selector de idioma del header muestra el idioma nuevo automáticamente.

**9. Edita los textos del sitio.** Las cadenas de la interfaz están en website/messages/<código>.json dentro de ui, con las mismas claves en todos los archivos; la sintaxis ICU se comprueba, así que evita llaves sin escapar y mantén los placeholders idénticos. Añade las claves nuevas primero en en.json, luego ejecuta pnpm locales y tradúcelas. pnpm --dir website check:i18n valida todos los catálogos. Los datos de frameworks de la página principal (filas del panel, líneas del mapa, tabla de compatibilidad) están en website/lib/transit.ts y deben coincidir con resultados reales del generador.

**10. Ejecuta el sitio.** Después de pnpm build en la raíz, ejecuta pnpm --dir website install una vez y pnpm --dir website dev (o pnpm website). El sitio depende del paquete mediante link:.., así que recompila el paquete y reinicia el servidor de desarrollo al cambiar src/. Cambia de idioma con EN, PT, ES y JA en el header. Antes de un pull request ejecuta pnpm --dir website typecheck y pnpm --dir website build.

**11. Prueba una demo.** Cada carpeta de examples/ es una app pequeña: cd examples/sveltekit (o nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Añade una página y mira cómo cambia su routes.generated.ts. Las demos de Next.js usan pnpm.

**12. Añade un framework.** Escribe el adaptador en src/frameworks.ts (sources, extensions, skipDirectory, map) y enseña a detectFramework a reconocer su paquete; añade pruebas de convención en tests/frameworks.test.mjs; añade una demo en examples/ y en la matriz del workflow de demos; documéntalo en docs/content.json en todos los idiomas; añade su línea en website/lib/transit.ts solo cuando la demo compile.

**13. Abre un pull request.** Mantén el cambio acotado, añade pruebas de regresión, actualiza CHANGELOG.md en la próxima versión, ejecuta pnpm release:check, pnpm locales:check y pnpm docs:check, y nunca versiones archivos generados (dist/, routes.generated.ts, .next/, salida de build de las demos); .gitignore ya los excluye.

**14. Publicaciones (mantenedores).** Sube version en package.json, mueve la entrada del CHANGELOG a esa versión, ejecuta pnpm release:check y publica una release en GitHub con la etiqueta next-named-routes-vX.Y.Z. El workflow de publicación valida la etiqueta, vuelve a ejecutar la CI y publica en npm con provenance mediante trusted publishing de npm (no se guarda ningún token de npm). Se aplica la Licencia Apache 2.0; las fuentes incluidas conservan sus licencias OFL.

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> next-named-routes && cd next-named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.md, .pt-BR, .es, .ja
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json website/lib/locales.ts website/lib/docs.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```


<a id="versioning"></a>

## Versiones y actualizaciones

La versión 1.x define el contrato público de los nombres inferidos, la generación tipada de URLs, los adaptadores de framework, i18n, el wrapper de Next.js, el plugin de Vite y la CLI.

Las versiones de parche preservan la API documentada mientras corrigen errores. Las versiones menores añaden funcionalidad compatible, como nuevos adaptadores de framework. Los cambios incompatibles requieren una nueva versión mayor. Revisa el changelog antes de actualizar.

Después de actualizar, reinicia el servidor de desarrollo para regenerar el manifiesto y ejecuta la comprobación de tipos y las pruebas de navegación de tu aplicación. Si mueves una página y necesitas conservar su nombre de ruta público, usa un alias explícito.

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

## Referencias oficiales

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
