# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

**v1.0.0** · [Guía de instalación local (en portugués)](LOCAL-DEVELOPMENT.pt-BR.md)

## Contenido

- [Qué hace](#overview)
- [Instalación](#installation)
- [Configuración única en Next.js](#quick-start)
- [Otros frameworks (plugin de Vite)](#frameworks)
- [Reglas de nombres automáticos](#naming)
- [Documentación](#documentation)

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

**[Construye con rutas](docs/es/build-with-routes.md)** — [Recetas para el App Router](docs/es/build-with-routes.md#app-router) · [Recetas para el Pages Router](docs/es/build-with-routes.md#pages-router) · [Parámetros y codificación](docs/es/build-with-routes.md#parameters) · [Query strings y fragmentos](docs/es/build-with-routes.md#query-hash) · [basePath, barras finales y orígenes](docs/es/build-with-routes.md#base-path) · [Idiomas e i18n](docs/es/build-with-routes.md#i18n) · [TypeScript y typedRoutes de Next](docs/es/build-with-routes.md#typescript)

**[Referencia de la API](docs/es/api-reference.md)** — [Referencia de la API del runtime](docs/es/api-reference.md#runtime-api) · [Configuración del generador](docs/es/api-reference.md#configuration) · [Nombres estables opcionales](docs/es/api-reference.md#stable-names) · [API programática del generador](docs/es/api-reference.md#generator-api)

**[Guías](docs/es/guides.md)** — [Casos límite del descubrimiento](docs/es/guides.md#discovery) · [Actualizaciones automáticas en desarrollo](docs/es/guides.md#development) · [CLI e integración continua](docs/es/guides.md#cli) · [Errores y solución de problemas](docs/es/guides.md#errors) · [Rewrites y límites](docs/es/guides.md#boundaries)

**[Proyecto](docs/es/project.md)** — [Sitio de documentación](docs/es/project.md#website) · [Pruébalo: demos por framework](docs/es/project.md#demos) · [Contribuye paso a paso](docs/es/project.md#contributing) · [Versiones y actualizaciones](docs/es/project.md#versioning)

## Referencias oficiales

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
