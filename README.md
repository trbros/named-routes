# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

**v1.0.0** · [Local installation guide (Portuguese)](LOCAL-DEVELOPMENT.pt-BR.md)

## Contents

- [What it does](#overview)
- [Installation](#installation)
- [One-time Next.js setup](#quick-start)
- [Other frameworks (Vite plugin)](#frameworks)
- [Automatic naming rules](#naming)
- [Documentation](#documentation)

<a id="overview"></a>

## What it does

Triooo Named Routes discovers the pages your framework already routes and generates typed URL helpers. Create a page, import route, and navigate by its inferred name. The filesystem remains the source of truth.

Next.js (App Router, Pages Router, src layouts and mixed migrations) is integrated through withNamedRoutes. Nuxt, Vue Router file-based routing, SvelteKit, Astro, React Router/Remix flat routes and TanStack Router are discovered by convention adapters and kept current by a Vite plugin. Apps that declare routes by hand use the same typed runtime with a written manifest.

Every framework maps to one pattern syntax and one naming rule, so app/users/[user]/page.tsx, pages/users/[user].vue, src/routes/users/[user]/+page.svelte and app/routes/users.$user.tsx all become users.$user. Locale-aware URLs (next-intl, Pages Router i18n, @nuxtjs/i18n and similar) are supported from v1.

The browser-safe URL runtime has no framework or Node.js imports. The Node-only generator reads file paths; it never executes your pages. Node.js 20.19+ is required for tooling and TypeScript 5+ for the exported types. Next 16 and Vite 7 are covered by real integration tests.

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```

<a id="installation"></a>

## Installation

Install the package with your preferred package manager. It has no runtime dependencies. Node.js 20.19 or newer is required for the generator.

Then connect it once: withNamedRoutes in next.config for Next.js, or the namedRoutes() Vite plugin for Vite-based frameworks. You can also run the named-routes CLI (generate, check, watch) in any project.

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

## One-time Next.js setup

Wrap the existing Next configuration once. No route map, page annotations or separate watcher command is needed. Next configuration objects, Promises and async configuration functions are supported.

The generated module defaults to src/routes.generated.ts and exports routes, route and RouteName. It is produced before dev/build starts. Use the generated helper from Server Components, Client Components or Pages Router code.

The import alias @/routes.generated below assumes @/* points to src/*. If your alias points to the project root, use @/src/routes.generated or a relative import. Next configuration may remain next.config.mjs or use next.config.ts.

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

## Other frameworks (Vite plugin)

Add namedRoutes() from @triooo/next-named-routes/vite to the Vite plugins of Nuxt (vite.plugins in nuxt.config), Vue, SvelteKit, Astro (vite.plugins in astro.config), React Router or TanStack Router. It generates when Vite starts or builds and regenerates when files are added, removed or renamed, using Vite's own watcher.

The framework is detected from package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev or @remix-run/dev, TanStack router plugin/CLI/Start, unplugin-vue-router or vue-router). Set framework explicitly in monorepos or when detection is ambiguous. Run npx named-routes init to create a config for the detected framework.

Conventions are converted to the runtime syntax. Nuxt and Vue: index, [id], [[id]] optional, [...slug] (matches an empty remainder, so it becomes [[...slug]]), (group) folders, parent.vue + parent/ nesting, mixed segments such as v[major]-[minor]; Vue also treats dots as nesting (users.edit.vue) and supports [id]+ repeatable params. Nuxt ignores files starting with -, and with includeApi scans server/api (prefixed /api) and server/routes, removing .get/.post suffixes.

SvelteKit: +page.* files, [id=matcher] (the matcher is dropped), [[lang]], [...rest] (zero or more segments), (group), [x+2f] escapes and +server endpoints with includeApi. Astro: src/pages with .astro/.md/.mdx/.html, _private files ignored, [...slug] rest params and .ts/.js endpoints with includeApi.

React Router / Remix flat routes (app/routes): dots nest, _index, $param, ($optional), $ splat (named splat), _pathless layouts, name_ opt-out, [.] escapes and folder/route.tsx modules. TanStack Router (src/routes): flat and directory files, index/route, $param, {-$optional}, prefix{$param}, $ splat (named _splat), _layouts, -ignored files, (groups) and .lazy files. Optional static segments such as (beta) cannot be named; exclude the file or use extraRoutes.

Paths declared inside components (Nuxt definePageMeta({ path }), React Router routes.ts) are not visible to a file scanner: map those URLs with extraRoutes, or use the manual manifest described next.

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

## Automatic naming rules

Static URL segments are joined with dots. Dynamic, optional, catch-all and optional catch-all parameters use $ followed by the parameter name; mixed segments such as v[major]-[minor] become v$major-$minor. The root page is home. The dollar sign distinguishes a dynamic parameter from a literal segment.

Framework file names (page.tsx, index, +page.svelte, _index, route.tsx) do not become name segments. Route groups, parallel slots and pathless layouts are omitted. Creating, moving or deleting a page changes the inferred public name; optional aliases can keep a stable name when URLs move.

The style is configurable with naming: separator (default "."), paramPrefix (default "$", may be empty) and home (default "home"). In a JavaScript or TypeScript config, naming.transform(route) can return a different name for any automatic route.

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

## Documentation

**[Getting started](docs/en/getting-started.md)** — [What it does](docs/en/getting-started.md#overview) · [Compared with alternatives](docs/en/getting-started.md#comparison) · [Installation](docs/en/getting-started.md#installation) · [One-time Next.js setup](docs/en/getting-started.md#quick-start) · [Automatic naming rules](docs/en/getting-started.md#naming)

**[Frameworks](docs/en/frameworks.md)** — [Other frameworks (Vite plugin)](docs/en/frameworks.md#frameworks) · [Next.js](docs/en/frameworks.md#nextjs) · [Nuxt](docs/en/frameworks.md#nuxt) · [Vue Router](docs/en/frameworks.md#vue) · [SvelteKit](docs/en/frameworks.md#sveltekit) · [Astro](docs/en/frameworks.md#astro) · [React Router / Remix](docs/en/frameworks.md#react-router) · [TanStack Router](docs/en/frameworks.md#tanstack-router) · [Manual routes (React, Vue, any router)](docs/en/frameworks.md#manual-routes)

**[Build with routes](docs/en/build-with-routes.md)** — [App Router recipes](docs/en/build-with-routes.md#app-router) · [Pages Router recipes](docs/en/build-with-routes.md#pages-router) · [Parameters and encoding](docs/en/build-with-routes.md#parameters) · [Query strings and fragments](docs/en/build-with-routes.md#query-hash) · [basePath, trailing slashes and origins](docs/en/build-with-routes.md#base-path) · [Locales and i18n](docs/en/build-with-routes.md#i18n) · [TypeScript and Next typedRoutes](docs/en/build-with-routes.md#typescript)

**[API reference](docs/en/api-reference.md)** — [Runtime API reference](docs/en/api-reference.md#runtime-api) · [Generator configuration](docs/en/api-reference.md#configuration) · [Optional stable names](docs/en/api-reference.md#stable-names) · [Programmatic generator API](docs/en/api-reference.md#generator-api)

**[Guides](docs/en/guides.md)** — [Discovery edge cases](docs/en/guides.md#discovery) · [Automatic development updates](docs/en/guides.md#development) · [CLI and CI](docs/en/guides.md#cli) · [Errors and troubleshooting](docs/en/guides.md#errors) · [Rewrites and boundaries](docs/en/guides.md#boundaries)

**[Project](docs/en/project.md)** — [Documentation website](docs/en/project.md#website) · [Try it: framework demos](docs/en/project.md#demos) · [Contribute step by step](docs/en/project.md#contributing) · [Versions and upgrades](docs/en/project.md#versioning)

## Official references

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
