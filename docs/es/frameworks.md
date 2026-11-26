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

Usa namedRoutes() de @triooo/named-routes/vite en Vue, SvelteKit, React Router/Remix y TanStack Router. Registra @triooo/named-routes/nuxt en modules de Nuxt y la importación por defecto de @triooo/named-routes/astro en integrations de Astro. Las integraciones generan al iniciar/compilar y actualizan al cambiar rutas o artefactos del framework.

El framework se detecta a partir de package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev o @remix-run/dev, plugin/CLI/Start de TanStack Router, unplugin-vue-router o vue-router). Define framework explícitamente en monorepos o cuando la detección sea ambigua. Ejecuta npx @triooo/named-routes init para crear una configuración para el framework detectado.

Las convenciones se convierten a la sintaxis del runtime. Nuxt y Vue: index, [id], [[id]] opcional, [...slug] (acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), anidamiento parent.vue + parent/, segmentos mixtos como v[major]-[minor]; Vue además trata los puntos como anidamiento (users.edit.vue) y admite parámetros repetibles [id]+. Nuxt ignora los archivos que empiezan por - y, con includeApi, escanea server/api (con prefijo /api) y server/routes, quitando los sufijos .get/.post.

SvelteKit: archivos +page.*, [id=matcher] (el matcher se descarta), [[lang]], [...rest] (cero o más segmentos), (grupo), escapes [x+2f] y endpoints +server con includeApi. Astro: src/pages con .astro/.md/.mdx/.html, archivos _privados ignorados, parámetros [...slug] y endpoints .ts/.js con includeApi.

Flat routes de React Router / Remix (app/routes): los puntos anidan, _index, $param, ($opcional), splat $ (llamado splat), layouts _sin-ruta, exclusión con nombre_, escapes [.] y módulos carpeta/route.tsx. TanStack Router (src/routes): archivos planos y en carpetas, index/route, $param, {-$opcional}, prefijo{$param}, splat $ (llamado _splat), _layouts, archivos -ignorados, (grupos) y archivos .lazy. Los segmentos estáticos opcionales como (beta) no pueden nombrarse; excluye el archivo o usa extraRoutes.

Descubrimiento por el framework (por defecto desde la 2.0): cuando el framework publica su tabla final de rutas por un canal documentado, los nombres salen de ella, así que las rutas declaradas en código también se incluyen. Nuxt: el módulo lee pages:resolved (path y alias de definePageMeta, páginas añadidas por módulos). Vue Router 5: el typed-router.d.ts que genera (path de definePage). React Router: react-router routes --json (route(), index(), layout() y prefix() en app/routes.ts). TanStack Router: routeTree.gen.ts. Nada ejecuta ni analiza tu código. Mientras el framework no haya escrito su tabla se usan las convenciones de archivos anteriores y la CLI lo indica; discovery: "files" mantiene el escáner de la 1.x. Next.js, SvelteKit y Astro no declaran rutas en código, así que sus archivos son la fuente.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes({ routerBase: "/app" })] });
// Configure the same navigation base in the router itself.

// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});

// astro.config.mjs
import { defineConfig as defineAstroConfig } from "astro/config";
import namedRoutesAstro from "@triooo/named-routes/astro";
export default defineAstroConfig({
  base: "/app",
  integrations: [namedRoutesAstro()],
});

// Any component (adjust the import to your configured output):
import { asset, route } from "@/routes.generated";
route("users.$id", { id: 42 }); // internal path
route("users.$id", { id: 42 }, { basePath: true }); // /app/users/42
asset("images/logo.svg"); // /app/images/logo.svg
```

<a id="nextjs"></a>

## Next.js

Envuelve next.config con withNamedRoutes de @triooo/named-routes/next. El módulo se genera antes de next dev y next build, se mantiene al día con un watcher dentro de next dev y nunca se escribe durante next start, así que los despliegues de solo lectura son seguros. El wrapper hereda pageExtensions, basePath, trailingSlash y la configuración i18n del Pages Router.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Navegación.** El helper devuelve strings simples para next/link, useRouter de next/navigation o next/router y redirect. Link y el router añaden el basePath por su cuenta; pasa { basePath: true } solo para enlaces simples o fetch. Con next-intl, pasa tu objeto routing como i18n: app/[locale]/about se convierte en about y el Link de next-intl recibe la ruta interna.

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

Con typedRoutes: true en la configuración de Next, <Link>, router.push(), replace() y prefetch() aceptan los resultados de route() sin casts, porque los hrefs tipados son el valor por defecto desde la 2.0; el wrapper avisa cuando typedRoutes se combina con hrefs: "string". Verificado con next typegen y TypeScript reales en Next 16, en ambos routers, con webpack y Turbopack.

**CLI y cambios de configuración.** Tras dev/build, el prefijo efectivo se guarda en .named-routes/ para la CLI. Reinicia Next al cambiar basePath. Antes del primer build de CI, usa defaults.basePath compartido o --base-path. Para redirigir URLs traducidas, consulta i18n y route.localize().

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```tsx
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app", typedRoutes: true });

// app/users/[user]/page.tsx → users.$user
import Link from "next/link";
import { asset, route } from "@/routes.generated";
// Next Link adds /app itself.
<Link href={route("users.$user", { user: "ana" })}>Ana</Link>;
// Plain anchors need the public path.
<a href={route("users.$user", { user: "ana" }, { basePath: true })}>Ana</a>;
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="nuxt"></a>

## Nuxt

Añade "@triooo/named-routes/nuxt" a modules en nuxt.config. El módulo nombra las rutas que resuelve el propio Nuxt (el hook pages:resolved), así que definePageMeta({ path, alias }) y las páginas añadidas por otros módulos se incluyen, y vuelve a generar cuando añades, mueves o eliminas páginas durante nuxt dev. Mantén la salida dentro del directorio de código e impórtala con el alias ~: con Nuxt 4 (srcDir app/) usa output app/routes.generated.ts e importa ~/routes.generated. Las opciones van en named-routes.config (compartido con la CLI) o en namedRoutes dentro de nuxt.config.

**Convenciones.** app/pages o pages: index.vue, [id], [[id]] opcional, [...slug] (también acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), segmentos mixtos como v[major]-[minor] y anidamiento parent.vue + parent/ fusionado en una sola ruta. Los archivos que empiezan por - se ignoran. Con includeApi se escanean server/api (con prefijo /api) y server/routes y se quitan los sufijos .get/.post.

**Navegación e i18n.** Usa la URL con NuxtLink :to, navigateTo o useRouter().push. Con @nuxtjs/i18n, configura aquí los mismos idiomas: la estrategia prefix_except_default corresponde a localePrefix as-needed, prefix (o prefix_and_default) a always y no_prefix a never. Así route(nombre, params, { locale }) devuelve la URL localizada; sin locale obtienes la ruta interna para localePath(). Las rutas traducidas con defineI18nRoute deben repetirse en i18n.pathnames.

**Límites y verificación.** El módulo también escribe .nuxt/named-routes/pages.json, así que named-routes check y generate ven las mismas rutas después de nuxt prepare. Ponlo antes de @nuxtjs/i18n en modules, para que vea las rutas antes de que se localicen. El plugin de Vite sigue funcionando en Nuxt, pero solo ve los archivos. Los nombres siguen el estilo con puntos de este paquete (users.$id), no los nombres de ruta de Nuxt (users-id). Verificado con tests de convenciones y con examples/nuxt, que compila y se ejecuta con Nuxt 4, incluida una página con definePageMeta({ path }).

**URL base.** El módulo nativo hereda app.baseURL. NuxtLink usa el prefijo del router, por lo que to debe ser interno; href normal y fetch requieren basePath: true. Reinicia Nuxt al cambiar app.baseURL para actualizar la caché de la CLI.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```vue
// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});

<!-- app/pages/about.vue: definePageMeta({ path: "/sobre" }) → sobre -->

<!-- app/pages/users/[id].vue → users.$id -->
<script setup lang="ts">
import { asset, route } from "~/routes.generated";
</script>
<template>
  <!-- NuxtLink applies app.baseURL -->
  <NuxtLink :to="route('users.$id', { id: 42 })">User 42</NuxtLink>
  <!-- Plain HTML link: /app/users/42 -->
  <a :href="route('users.$id', { id: 42 }, { basePath: true })">User 42</a>
  <img :src="asset('images/logo.svg')" alt="Logo" />
</template>
<!-- File: public/images/logo.svg -->
```

<a id="vue"></a>

## Vue Router

Para apps Vue con enrutamiento por archivos (vue-router/vite de Vue Router 5, o unplugin-vue-router en Vue Router 4), añade namedRoutes() antes de VueRouter() y vue() en vite.config. users/_parent.vue se trata como el padre no navegable de users/, como en Vue Router 5.0.3+. El framework se detecta por unplugin-vue-router o vue-router; se escanea src/pages salvo que routesDir indique otra carpeta. Las apps que declaran un array de rutas a mano deben usar un manifiesto manual.

**Convenciones.** index.vue y (nombre).vue son rutas index; los puntos anidan (users.edit.vue es /users/edit); [id] y [[id]]; [id]+ es un parámetro repetible de uno o más ([...id]) y [[id]]+ de cero o más ([[...id]]); [...path] también acepta un resto vacío ([[...path]]); las carpetas (grupo) se omiten; el anidamiento parent.vue + parent/ se fusiona; los segmentos mixtos como v[major]-[minor] funcionan.

**Navegación.** Pasa la URL a RouterLink :to o router.push. Vue Router resuelve el string como cualquier ruta, así que el paquete no necesita acceso a la instancia del router.

**Verificado.** Los nombres salen del typed-router.d.ts que escribe Vue Router 5 (opción dts), así que las rutas sobrescritas con definePage({ path }) se nombran por la URL que sirven; antes de que exista, se recorren los archivos. Un servidor Vite real con estas convenciones se ejecuta en CI, y examples/vue se compila, se ejecuta y se recorre en un navegador con Vue Router 5 (vue-router/vite), incluido un layout users/_parent.vue y una página con definePage({ path }).

**Base del history.** Si el router usa createWebHistory(import.meta.env.BASE_URL), activa inheritViteBase: true y define el base de Vite como en el ejemplo. Si no, pasa la base del history como routerBase; el base de Vite puede ser solo para assets/CDN. RouterLink y router.push aplican el prefijo; usa basePath: true solo para URLs públicas normales.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite"; // Vue Router 5 (4: unplugin-vue-router/vite)
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});

// src/main.ts — use the same base in the actual router:
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

// src/pages/users/[id].vue → users.$id (inside the template)
import { asset, route } from "@/routes.generated";
<RouterLink :to="route('users.$id', { id: 42 })">User 42</RouterLink>
<img :src="asset('images/logo.svg')" alt="Logo" />
// File: public/images/logo.svg
```

<a id="sveltekit"></a>

## SvelteKit

Añade namedRoutes() antes de sveltekit() en vite.config. Escribir el módulo en src/lib te permite importarlo como $lib/routes.generated desde cualquier componente, función load o endpoint.

**Convenciones.** src/routes con +page.svelte, +page.ts o +page.server.ts (se fusionan en una ruta); las carpetas (grupo) se omiten; [id=matcher] conserva el parámetro y descarta el matcher; [[lang]] es opcional; [...rest] acepta cero o más segmentos ([[...rest]]) y puede ir antes de segmentos estáticos; los reinicios de layout +page@ son páginas normales; los escapes [x+2f] y [u+0041] se decodifican. Los endpoints +server son opcionales con includeApi.

**Navegación.** Pasa el mismo prefijo a routerBase y paths.base de SvelteKit. Los enlaces, goto y redirects requieren la URL pública; usa { basePath: true } como tercer argumento de route(). En SvelteKit 2 comparte kit.paths.base de svelte.config con vite.config; en SvelteKit 3 pasa paths a sveltekit(), como abajo.

**Verificación.** Las pruebas de convención y la integración examples/sveltekit cubren descubrimiento y navegación; el ejemplo actual usa SvelteKit 3 con Svelte 5.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```svelte
// vite.config.ts (SvelteKit 3)
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

<!-- src/routes/blog/[slug]/+page.svelte → blog.$slug -->
<script lang="ts">
  import { asset, route } from "$lib/routes.generated";
</script>
<!-- Public URL: /app/blog/hello -->
<a href={route("blog.$slug", { slug: "hello" }, { basePath: true })}>Hello</a>
<img src={asset("images/logo.svg")} alt="Logo" />
<!-- File: static/images/logo.svg -->
```

<a id="astro"></a>

## Astro

Registra la integración nativa de @triooo/named-routes/astro en integrations de astro.config. Hereda el base final de Astro. Si migras desde la configuración anterior, quita namedRoutes() de vite.plugins. El módulo se genera en src/routes.generated.ts y puede usarse en frontmatter .astro, islas y endpoints.

**Convenciones.** src/pages con páginas .astro, .md, .mdx, .markdown y .html; los archivos y carpetas que empiezan por _ son privados; [id]; [...slug] acepta cero o más segmentos ([[...slug]]); segmentos mixtos como [lang]-[version]. Los endpoints .ts/.js son opcionales con includeApi y conservan su extensión interna (api/data.json.ts es /api/data.json).

**i18n.** Las carpetas físicas de idioma de Astro (src/pages/pt/about.astro) se fusionan en la misma ruta con nombre que src/pages/about.astro cuando el idioma está en i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed y true a always.

**Límites y verificación.** Las compilaciones estáticas siguen necesitando getStaticPaths en las páginas dinámicas: el paquete construye URLs, no enumera parámetros. Verificado con pruebas de convención y con examples/astro, que compila y se ejecuta con Astro 5.

**Despliegue bajo un prefijo.** Con base: "/app", route() sigue devolviendo la ruta interna. En un enlace HTML de Astro, usa el tercer argumento { basePath: true } para obtener /app/docs/guide/install. Reinicia el servidor o recompila al cambiar base; la CLI puede reutilizar el último prefijo generado correctamente o recibir --base-path.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```astro
// astro.config.mjs
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({
  base: "/app",
  integrations: [namedRoutes()],
});

---
// src/pages/docs/[...slug].astro → docs.$slug
import { asset, route } from "../../routes.generated";
---
<!-- Public URL: /app/docs/guide/install -->
<a href={route("docs.$slug", { slug: ["guide", "install"] }, { basePath: true })}>
  Install guide
</a>
<img src={asset("images/logo.svg")} alt="Logo" />
<!-- File: public/images/logo.svg -->
```

<a id="react-router"></a>

## React Router / Remix

Para el modo framework de React Router 7 y 8 (y Remix v2), añade namedRoutes() antes de reactRouter() en vite.config. Los nombres salen de react-router routes --json, la resolución del propio framework de app/routes.ts, así que se descubren tanto los archivos de flatRoutes() como las rutas declaradas con route(), index(), layout() y prefix(). Una buena salida es app/routes.generated.ts, fuera de app/routes.

**Convenciones.** Los puntos anidan (concerts.$city.tsx es /concerts/[city]); _index es el índice; $param; ($lang) es opcional ([[lang]]); un $ solo es un splat llamado splat ([[...splat]]); los prefijos _auth son layouts sin ruta; concerts_ excluye el anidamiento; los escapes [.] conservan caracteres; una carpeta con route.tsx es una ruta y las carpetas más profundas se ignoran. Un layout y su _index comparten URL y se fusionan.

**Navegación.** Usa <Link to={route(...)}>, useNavigate() o redirect() en loaders y actions.

**Límites y verificación.** Sin @react-router/dev instalado, o cuando el comando falla, se recorren los archivos de flat routes anteriores y la CLI indica el motivo. Los segmentos estáticos opcionales como (beta) no se pueden nombrar; el generador se detiene con un error claro para que excluyas el archivo. Verificado con tests de convenciones y con examples/react-router, que compila y se ejecuta con React Router 8, incluida una ruta declarada con route() en app/routes.ts.

**Basename.** Comparte el valor entre basename de React Router y namedRoutes({ routerBase }). En Remix usa su ajuste equivalente y el mismo routerBase; en routers manuales usa createBrowserRouter(..., { basename }) y un manifiesto manual si hace falta. Link y la navegación ya aplican basename; usa basePath: true para URLs HTML normales.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```tsx
// react-router.config.ts
export default { basename: "/app" };

// vite.config.ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }),
    reactRouter(),
  ],
});

// app/routes/concerts.$city.tsx → concerts.$city
import { Link } from "react-router";
import { asset, route } from "../routes.generated";
// Link applies basename; do not pass basePath: true here.
<Link to={route("concerts.$city", { city: "lisbon" })}>Lisbon</Link>;
<a href={route("concerts.$city", { city: "lisbon" }, { basePath: true })}>Lisbon</a>;

// app/routes.ts: [...(await flatRoutes()), route("sobre", "about.tsx")] → sobre
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="tanstack-router"></a>

## TanStack Router

Añade namedRoutes() junto a tanstackRouter() de @tanstack/router-plugin en vite.config. El plugin escanea src/routes (o app/routes) y escribe src/routes.generated.ts por defecto, fuera de la carpeta de rutas, así que nunca se convierte en una ruta.

**Convenciones.** __root se omite; index y route.tsx son la ruta de la carpeta; los archivos planos (posts.$postId.tsx) y en carpetas se combinan; $param; {-$locale} es opcional ([[locale]]); prefijo{$id}sufijo se convierte en un segmento mixto; un $ solo es un splat llamado _splat ([[..._splat]]); _layout no tiene ruta; posts_ excluye el anidamiento; los archivos con prefijo - y las carpetas (grupo) se ignoran; los archivos .lazy pertenecen a la misma ruta.

**Cuándo usarlo.** TanStack Router ya tipa su propio <Link to> por id de ruta. Usa route() donde haga falta un string simple: <a href>, redirects a otras apps, emails, sitemaps, analítica, URLs con prefijo de idioma y nombres compartidos con otros frameworks en un monorepo.

**Verificado.** Los nombres salen del routeTree.gen.ts que genera el plugin o la CLI de TanStack Router (sus rutas navegables); antes de que exista, se recorren los archivos. Tests de convenciones y examples/tanstack-router, que compila y se ejecuta con el plugin de TanStack Router.

**Basepath del router.** Define createRouter({ routeTree, basepath: "/app" }) en la app y namedRoutes({ routerBase: "/app" }) en Vite. Configura el base de Vite por separado para servir assets bajo el prefijo. Usa basePath: true para enlaces y defaults.origin si necesitas URLs absolutas. Ignora los archivos temporales .tanstack, no routeTree.gen.ts: el descubrimiento usa la tabla publicada.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

**Assets tipados.** Activa assets: { strict: true } en named-routes.config; las rutas públicas se infieren de la carpeta pública (static/ en SvelteKit). Consulta Assets tipados, Versionado y Auditoría.

```tsx
// vite.config.ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});

// src/main.tsx (existing router setup):
// const router = createRouter({ routeTree, basepath: "/app" });

// src/routes/posts/$postId.tsx → posts.$postId
import { asset, route } from "../../routes.generated";
<a href={route("posts.$postId", { postId: 42 }, { basePath: true })}>Share</a>;
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="manual-routes"></a>

## Rutas manuales (React, Vue, cualquier router)

Cuando las rutas se declaran en código (<Route> de React Router, un array de rutas de vue-router, servidores tipo Express), escribe tú mismo el manifiesto con createRoutes. Obtienes la misma inferencia de nombres, comprobación de parámetros, codificación, query/hash, basePath e i18n; solo el descubrimiento es manual.

Los patrones usan la sintaxis de corchetes sin importar la sintaxis del router: /users/:id se convierte en /users/[id], un :id? opcional en [[id]] y un splat * en [...splat] o [[...splat]]. Mantén el objeto literal (o as const) para que se infieran los nombres y los parámetros.

Para compartir un módulo generado de todos modos (por ejemplo, desde un paquete de un monorepo), define framework: "manual" y lista las rutas en extraRoutes; el generador escribe el mismo módulo tipado sin escanear.

**Prefijo manual.** Define basePath en los defaults de createRoutes() y configura la misma base del history o basename en el router. En proyectos manuales con generador usa defaults.basePath en named-routes.config. Los nombres nunca incluyen el prefijo.

**Archivos públicos.** Exporta `const asset = route.asset` desde tu módulo manual y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

```tsx
// src/routes.ts
import { createRoutes } from "@triooo/named-routes";
export const route = createRoutes({
  home: "/",
  "users.show": "/users/[id]",       // <Route path="/users/:id">
  "docs.page": "/docs/[[...path]]",   // <Route path="/docs/*">
}, { basePath: "/app" });

// Configure basename/history base in your actual router too.
// React Router
<Link to={route("users.show", { id: 42 })}>Ana</Link>
// Vue Router
<RouterLink :to="route('users.show', { id: 42 })">Ana</RouterLink>
// Plain HTML anchor: /app/users/42
<a href={route("users.show", { id: 42 }, { basePath: true })}>Ana</a>;
// Public files: export the helper with the manual manifest.
export const asset = route.asset;
asset("images/logo.svg"); // /app/images/logo.svg
```

---

← Anterior: [Primeros pasos](getting-started.md) · [Volver al README](../../README.es.md) · Siguiente: [Construye con rutas](build-with-routes.md) →
