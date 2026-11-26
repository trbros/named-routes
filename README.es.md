# Named Routes

**El toolkit type-safe para rutas, URLs y assets.**

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

`@triooo/named-routes` · **v2.1.0** · [Guía de instalación local (en portugués)](LOCAL-DEVELOPMENT.pt-BR.md)

## Contenido

- [Qué hace](#overview)
- [Instalación](#installation)
- [Configuración única en Next.js](#quick-start)
- [Otros frameworks (plugin de Vite)](#frameworks)
- [Reglas de nombres automáticos](#naming)
- [Documentación](#documentation)

<a id="overview"></a>

## Qué hace

Named Routes es el toolkit type-safe para rutas, URLs y assets. Descubre las páginas que tu framework ya enruta y genera helpers tipados: route() para la navegación, asset() para archivos públicos y URLs de CDN, y helpers que leen, localizan y canonicalizan URLs existentes. El sistema de archivos sigue siendo la fuente de verdad.

Next.js usa withNamedRoutes, Nuxt su módulo nativo y Astro su integración nativa. Vue Router por archivos, SvelteKit, React Router/Remix y TanStack Router usan el plugin Vite. Los routers manuales usan el mismo runtime tipado con un manifiesto escrito a mano.

Todos los frameworks se traducen a una sola sintaxis de patrones y una sola regla de nombres, así que app/users/[user]/page.tsx, pages/users/[user].vue, src/routes/users/[user]/+page.svelte y app/routes/users.$user.tsx se convierten en users.$user. Las URLs con idioma (next-intl, i18n del Pages Router, @nuxtjs/i18n y similares) son compatibles desde la v1.

El runtime de URLs funciona en el navegador sin imports de framework ni de Node.js. El generador, solo para Node, lee rutas de archivos; nunca ejecuta tus páginas. Las herramientas requieren Node.js 22.12+ y los tipos, TypeScript 5.4+. Cada ejemplo de examples/ se instala desde el tarball empaquetado, se compila, se sirve y se recorre en un navegador real en CI.

Desde la 2.0 la tabla de rutas viene del propio framework siempre que la publica (Nuxt, Vue Router 5, React Router, TanStack Router), así que las rutas declaradas en código, como definePageMeta({ path }) o route() en app/routes.ts, también reciben nombre; route() devuelve hrefs tipados por defecto.

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```

<a id="installation"></a>

## Instalación

Instala el paquete con tu gestor de paquetes favorito. No tiene dependencias en runtime. El generador requiere Node.js 22.12 o superior.

Conecta una sola vez: withNamedRoutes en next.config, @triooo/named-routes/nuxt en modules de Nuxt, @triooo/named-routes/astro en integrations de Astro, o namedRoutes() de @triooo/named-routes/vite en los demás frameworks Vite. Para la CLI independiente usa npx @triooo/named-routes generate.

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

**Ruta base.** Next.js proporciona automáticamente su basePath; los nombres y las rutas internas no cambian. Usa basePath: true solo cuando se necesite la ruta pública completa.

**Archivos públicos.** Importa `asset` desde el módulo generado y pasa una ruta relativa al directorio público, por ejemplo `asset("images/logo.svg")`. Incluye por defecto la base de navegación, pero nunca el idioma. Define `defaults.assetBase` explícitamente si los archivos se sirven desde otra ruta o CDN. No uses el helper con assets importados o procesados por el bundler. Consulta Archivos públicos.

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app" });

// In your application:
import { asset, route } from "@/routes.generated";
route("user.profile"); // /user/profile (Next Link)
route("users.$user", { user: "ana" }); // /users/ana
route("users.$user", { user: "ana" }, { basePath: true }); // /app/users/ana
asset("images/logo.svg"); // /app/images/logo.svg
```

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

<a id="documentation"></a>

## Documentación

**[Primeros pasos](docs/es/getting-started.md)** — [Qué hace](docs/es/getting-started.md#overview) · [Comparación con alternativas](docs/es/getting-started.md#comparison) · [Instalación](docs/es/getting-started.md#installation) · [Configuración única en Next.js](docs/es/getting-started.md#quick-start) · [Reglas de nombres automáticos](docs/es/getting-started.md#naming)

**[Frameworks](docs/es/frameworks.md)** — [Otros frameworks (plugin de Vite)](docs/es/frameworks.md#frameworks) · [Next.js](docs/es/frameworks.md#nextjs) · [Nuxt](docs/es/frameworks.md#nuxt) · [Vue Router](docs/es/frameworks.md#vue) · [SvelteKit](docs/es/frameworks.md#sveltekit) · [Astro](docs/es/frameworks.md#astro) · [React Router / Remix](docs/es/frameworks.md#react-router) · [TanStack Router](docs/es/frameworks.md#tanstack-router) · [Rutas manuales (React, Vue, cualquier router)](docs/es/frameworks.md#manual-routes)

**[Construye con rutas](docs/es/build-with-routes.md)** — [Recetas para el App Router](docs/es/build-with-routes.md#app-router) · [Recetas para el Pages Router](docs/es/build-with-routes.md#pages-router) · [Parámetros y codificación](docs/es/build-with-routes.md#parameters) · [Query strings y fragmentos](docs/es/build-with-routes.md#query-hash) · [Parámetros de query tipados](docs/es/build-with-routes.md#typed-query) · [Enrutamiento inverso y ruta activa](docs/es/build-with-routes.md#reverse-routing) · [basePath, barras finales y orígenes](docs/es/build-with-routes.md#base-path) · [Idiomas e i18n](docs/es/build-with-routes.md#i18n) · [TypeScript y typedRoutes de Next](docs/es/build-with-routes.md#typescript) · [Hrefs tipados para typedRoutes de Next.js](docs/es/build-with-routes.md#typed-hrefs)

**[Helpers de rutas](docs/es/route-helpers.md)** — [route()](docs/es/route-helpers.md#helper-route) · [route.localize()](docs/es/route-helpers.md#helper-localize) · [route.match()](docs/es/route-helpers.md#helper-match) · [route.parseQuery()](docs/es/route-helpers.md#helper-parse-query) · [route.is()](docs/es/route-helpers.md#helper-is) · [route.breadcrumbs()](docs/es/route-helpers.md#helper-breadcrumbs) · [route.has()](docs/es/route-helpers.md#helper-has) · [route.names()](docs/es/route-helpers.md#helper-names) · [route.pattern()](docs/es/route-helpers.md#helper-pattern) · [route.locales()](docs/es/route-helpers.md#helper-locales) · [route.forLocale()](docs/es/route-helpers.md#helper-for-locale)

**[Archivos públicos](docs/es/public-assets.md)** — [asset() / route.asset()](docs/es/public-assets.md#assets) · [assetBase y CDN](docs/es/public-assets.md#asset-base)

**[Referencia de la API](docs/es/api-reference.md)** — [Referencia de la API del runtime](docs/es/api-reference.md#runtime-api) · [Configuración del generador](docs/es/api-reference.md#configuration) · [Nombres estables opcionales](docs/es/api-reference.md#stable-names) · [API programática del generador](docs/es/api-reference.md#generator-api)

**[Guías](docs/es/guides.md)** — [Casos límite del descubrimiento](docs/es/guides.md#discovery) · [Actualizaciones automáticas en desarrollo](docs/es/guides.md#development) · [CLI e integración continua](docs/es/guides.md#cli) · [Diagnóstico: named-routes doctor](docs/es/guides.md#doctor) · [Errores y solución de problemas](docs/es/guides.md#errors) · [Rewrites y límites](docs/es/guides.md#boundaries)

**[Proyecto](docs/es/project.md)** — [Sitio de documentación](docs/es/project.md#website) · [Pruébalo: demos por framework](docs/es/project.md#demos) · [Contribuye paso a paso](docs/es/project.md#contributing) · [Versiones y actualizaciones](docs/es/project.md#versioning) · [Actualizar desde la 1.x](docs/es/project.md#migration)

**[Helpers avanzados de URL](docs/es/advanced-helpers.md)** — [Assets tipados](docs/es/advanced-helpers.md#typed-assets) · [asset.has() / paths() / info()](docs/es/advanced-helpers.md#asset-metadata) · [Versionado de assets](docs/es/advanced-helpers.md#asset-versioning) · [route.withQuery()](docs/es/advanced-helpers.md#helper-with-query) · [route.alternates()](docs/es/advanced-helpers.md#helper-alternates) · [route.canonical()](docs/es/advanced-helpers.md#helper-canonical) · [route.withDefaults()](docs/es/advanced-helpers.md#helper-with-defaults) · [Auditoría de rutas y assets](docs/es/advanced-helpers.md#audit) · [Playground de helpers](docs/es/advanced-helpers.md#helpers-playground)

## Referencias oficiales

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://router.vuejs.org/file-based-routing/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
