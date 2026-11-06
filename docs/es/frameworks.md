# Frameworks · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/frameworks.md) · [Português](../pt/frameworks.md) · [Español](../es/frameworks.md) · [日本語](../ja/frameworks.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Otros frameworks (plugin de Vite)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Rutas manuales (React, Vue, cualquier router)](#manual-routes)

<a id="frameworks"></a>

## Otros frameworks (plugin de Vite)

Añade namedRoutes() de @triooo/named-routes/vite a los plugins de Vite de Nuxt (vite.plugins en nuxt.config), Vue, SvelteKit, Astro (vite.plugins en astro.config), React Router o TanStack Router. Genera cuando Vite arranca o compila y regenera cuando se añaden, eliminan o renombran archivos, usando el propio watcher de Vite.

El framework se detecta a partir de package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev o @remix-run/dev, plugin/CLI/Start de TanStack Router, unplugin-vue-router o vue-router). Define framework explícitamente en monorepos o cuando la detección sea ambigua. Ejecuta npx named-routes init para crear una configuración para el framework detectado.

Las convenciones se convierten a la sintaxis del runtime. Nuxt y Vue: index, [id], [[id]] opcional, [...slug] (acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), anidamiento parent.vue + parent/, segmentos mixtos como v[major]-[minor]; Vue además trata los puntos como anidamiento (users.edit.vue) y admite parámetros repetibles [id]+. Nuxt ignora los archivos que empiezan por - y, con includeApi, escanea server/api (con prefijo /api) y server/routes, quitando los sufijos .get/.post.

SvelteKit: archivos +page.*, [id=matcher] (el matcher se descarta), [[lang]], [...rest] (cero o más segmentos), (grupo), escapes [x+2f] y endpoints +server con includeApi. Astro: src/pages con .astro/.md/.mdx/.html, archivos _privados ignorados, parámetros [...slug] y endpoints .ts/.js con includeApi.

Flat routes de React Router / Remix (app/routes): los puntos anidan, _index, $param, ($opcional), splat $ (llamado splat), layouts _sin-ruta, exclusión con nombre_, escapes [.] y módulos carpeta/route.tsx. TanStack Router (src/routes): archivos planos y en carpetas, index/route, $param, {-$opcional}, prefijo{$param}, splat $ (llamado _splat), _layouts, archivos -ignorados, (grupos) y archivos .lazy. Los segmentos estáticos opcionales como (beta) no pueden nombrarse; excluye el archivo o usa extraRoutes.

Las rutas declaradas dentro de componentes (definePageMeta({ path }) de Nuxt, routes.ts de React Router) no son visibles para un escáner de archivos: mapea esas URLs con extraRoutes o usa el manifiesto manual que se describe a continuación.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
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

Envuelve next.config con withNamedRoutes de @triooo/named-routes/next. El módulo se genera antes de next dev y next build, se mantiene al día con un watcher dentro de next dev y nunca se escribe durante next start, así que los despliegues de solo lectura son seguros. El wrapper hereda pageExtensions, basePath, trailingSlash y la configuración i18n del Pages Router.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Navegación.** El helper devuelve strings simples para next/link, useRouter de next/navigation o next/router y redirect. Link y el router añaden el basePath por su cuenta; pasa { basePath: true } solo para enlaces simples o fetch. Con next-intl, pasa tu objeto routing como i18n: app/[locale]/about se convierte en about y el Link de next-intl recibe la ruta interna.

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

```tsx
import { withNamedRoutes } from "@triooo/named-routes/next";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { namedRoutes } from "@triooo/named-routes/vite";
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
import { createRoutes } from "@triooo/named-routes";
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

---

← Anterior: [Primeros pasos](getting-started.md) · [Volver al README](../../README.es.md) · Siguiente: [Construye con rutas](build-with-routes.md) →
