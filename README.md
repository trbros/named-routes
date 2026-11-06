# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json and docs/locales.json; run pnpm docs. -->

## Contents

**v1.0.0**

[Local installation guide (Portuguese)](LOCAL-DEVELOPMENT.pt-BR.md)

- [What it does](#overview)
- [Compared with alternatives](#comparison)
- [Installation](#installation)
- [One-time Next.js setup](#quick-start)
- [Other frameworks (Vite plugin)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Manual routes (React, Vue, any router)](#manual-routes)
- [Automatic naming rules](#naming)
- [App Router recipes](#app-router)
- [Pages Router recipes](#pages-router)
- [Parameters and encoding](#parameters)
- [Query strings and fragments](#query-hash)
- [basePath, trailing slashes and origins](#base-path)
- [Locales and i18n](#i18n)
- [TypeScript and Next typedRoutes](#typescript)
- [Runtime API reference](#runtime-api)
- [Generator configuration](#configuration)
- [Optional stable names](#stable-names)
- [Discovery edge cases](#discovery)
- [Automatic development updates](#development)
- [CLI and CI](#cli)
- [Programmatic generator API](#generator-api)
- [Errors and troubleshooting](#errors)
- [Rewrites and boundaries](#boundaries)
- [Documentation website](#website)
- [Try it: framework demos](#demos)
- [Contribute step by step](#contributing)
- [Versions and upgrades](#versioning)

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


<a id="comparison"></a>

## Compared with alternatives

Several packages and framework features also generate typed URLs. They differ in where routes come from, whether routes have names, which frameworks they cover and whether locales are part of the model. The tables summarize what each project documents or ships; npm figures are the latest version and downloads in the last month, collected on 2026-11-05. ✓ means supported, ½ partial, — not offered or not documented.

**Where this package differs.** Names are inferred from the files you already have and stay identical across Next.js, Nuxt, Vue, SvelteKit, Astro, React Router and TanStack Router; locales (prefixes, translated pathnames, domains) are part of the same typed call; and route() returns a plain string that works outside any router: redirects, emails, sitemaps or a package shared by several apps in a monorepo.

**When another choice fits better.** If you use a single framework and are happy keying routes by path, its built-in feature needs no extra dependency. If you need search params validated against a schema (Zod, Valibot), next-typesafe-url and next-safe-navigation do that and this package does not. If your routes live in a Laravel backend, Ziggy is the natural fit. next-routes targets the legacy Pages Router with React 15/16, and the unscoped next-named-routes package is an unrelated 2022 project with a similar name.

**Built into the frameworks.** Next.js typedRoutes, React Router href(), SvelteKit resolve() and TanStack Router type paths written in that framework's own syntax; Nuxt typedPages types Nuxt's route names. They work inside one framework and do not share names or a locale model with others. Astro's getRelativeLocaleUrl() builds locale URLs from an untyped path.

**Packages**

| Package | Frameworks | Routes from | Names | Typed params | i18n | URL builder | npm (latest · month) |
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

**Built into the frameworks**

| Framework | Feature | Route key | Typed params | Names shared across frameworks | Locales |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |


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


<a id="nextjs"></a>

## Next.js

Wrap next.config with withNamedRoutes from @triooo/next-named-routes/next. The module is generated before next dev and next build, kept current by a watcher inside next dev, and never written during next start, so read-only deployments are safe. The wrapper inherits pageExtensions, basePath, trailingSlash and the Pages Router i18n config.

**Conventions.** app/ and pages/ (or src/app and src/pages) are scanned together. App Router: page files only; route groups and parallel slots are omitted, interceptions resolve to their canonical URL, _private folders are ignored and %5F becomes an underscore. Pages Router: index is removed and _app, _document and _error are skipped. Route Handlers and pages/api are opt-in with includeApi. appDir and pagesDir point to custom folders (or false to skip one).

**Navigation.** The helper returns plain strings for next/link, useRouter from next/navigation or next/router, and redirect. Link and the router add basePath themselves; pass { basePath: true } only for plain anchors or fetch. With next-intl, pass your routing object as i18n: app/[locale]/about becomes about, and next-intl's Link receives the internal path.

**Verified.** Real Next 16 dev servers (App Router and Pages Router, with basePath and live page discovery) run in CI. Demos: examples/app-router and examples/pages-router. See also the App Router and Pages Router recipes.

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

Add namedRoutes() to vite.plugins in nuxt.config. Keep the output inside your source directory and import it with the ~ alias: with Nuxt 4 (srcDir app/) use output app/routes.generated.ts and import ~/routes.generated. The plugin regenerates as you add, move or delete pages during nuxt dev.

**Conventions.** app/pages or pages: index.vue, [id], [[id]] optional, [...slug] (also matches an empty remainder, so it becomes [[...slug]]), (group) folders, mixed segments such as v[major]-[minor], and parent.vue + parent/ nesting merged into one route. Files starting with - are ignored. With includeApi, server/api (prefixed /api) and server/routes are scanned and .get/.post suffixes are removed.

**Navigation and i18n.** Use the URL with NuxtLink :to, navigateTo or useRouter().push. With @nuxtjs/i18n, configure the same locales here: strategy prefix_except_default maps to localePrefix as-needed, prefix (or prefix_and_default) to always, and no_prefix to never. Then route(name, params, { locale }) returns the localized URL; without a locale you get the internal path for localePath(). Translated paths from defineI18nRoute must be repeated in i18n.pathnames.

**Limits and verification.** Paths changed with definePageMeta({ path }) are not visible to the scanner; add them with extraRoutes. Names follow this package's dotted style (users.$id), not Nuxt's own route names (users-id). Verified by convention tests and by examples/nuxt, which builds and runs with Nuxt 4.

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

For Vue apps with file-based routing (unplugin-vue-router conventions), add namedRoutes() before VueRouter() and vue() in vite.config. The framework is detected from unplugin-vue-router or vue-router; src/pages is scanned unless routesDir says otherwise. Apps that declare a routes array by hand should use a manual manifest instead.

**Conventions.** index.vue and (name).vue are index routes; dots nest (users.edit.vue is /users/edit); [id] and [[id]]; [id]+ is a one-or-more repeatable param ([...id]) and [[id]]+ zero-or-more ([[...id]]); [...path] also matches an empty remainder ([[...path]]); (group) folders are omitted; parent.vue + parent/ nesting merges; mixed segments like v[major]-[minor] work.

**Navigation.** Pass the URL to RouterLink :to or router.push. Vue Router resolves the string like any path, so the package does not need access to the router instance.

**Verified.** A real Vite 7 dev server with these conventions runs in CI, and examples/vue builds and runs with unplugin-vue-router.

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

Add namedRoutes() before sveltekit() in vite.config. Writing the module to src/lib lets you import it as $lib/routes.generated from any component, load function or endpoint.

**Conventions.** src/routes with +page.svelte, +page.ts or +page.server.ts (they merge into one route); (group) folders are omitted; [id=matcher] keeps the parameter and drops the matcher; [[lang]] is optional; [...rest] matches zero or more segments ([[...rest]]) and may sit before static segments; +page@ layout resets are normal pages; [x+2f] and [u+0041] escapes are decoded. +server endpoints are opt-in with includeApi.

**Navigation.** Use <a href={route(...)}>, goto(route(...)) or redirect(303, route(...)). SvelteKit does not add paths.base to plain anchors, so set defaults.basePath to the same value and pass { basePath: true } when you deploy under a base path.

**Verified.** Convention tests plus examples/sveltekit, which builds and runs with SvelteKit 2 and Svelte 5.

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

Add namedRoutes() to vite.plugins in astro.config. The module defaults to src/routes.generated.ts and can be imported from .astro frontmatter, framework islands and endpoints.

**Conventions.** src/pages with .astro, .md, .mdx, .markdown and .html pages; files and folders starting with _ are private; [id]; [...slug] matches zero or more segments ([[...slug]]); mixed segments such as [lang]-[version]. .ts/.js endpoints are opt-in with includeApi and keep their inner extension (api/data.json.ts is /api/data.json).

**i18n.** Astro's physical locale folders (src/pages/pt/about.astro) merge into the same named route as src/pages/about.astro when the locale is listed in i18n.locales. prefixDefaultLocale: false matches localePrefix as-needed and true matches always.

**Limits and verification.** Static builds still need getStaticPaths in dynamic pages: the package builds URLs, it does not enumerate parameters. Verified by convention tests and examples/astro, which builds and runs with Astro 5.

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

For React Router 7 framework mode (and Remix v2) with flat routes, add namedRoutes() before reactRouter() in vite.config and keep app/routes.ts as flatRoutes() from @react-router/fs-routes. A good output is app/routes.generated.ts, outside app/routes.

**Conventions.** Dots nest (concerts.$city.tsx is /concerts/[city]); _index is the index; $param; ($lang) is optional ([[lang]]); a lone $ is a splat named splat ([[...splat]]); _auth leading underscores are pathless layouts; concerts_ opts out of nesting; [.] escapes keep characters; a folder with route.tsx is one route and deeper folders are ignored. A layout and its _index share a URL and merge.

**Navigation.** Use <Link to={route(...)}>, useNavigate() or redirect() in loaders and actions.

**Limits and verification.** Routes declared in code inside app/routes.ts (route(), index(), layout()) are not files: use a manual manifest or extraRoutes. Optional static segments such as (beta) cannot be named; the generator stops with a clear error so you can exclude the file. Verified by convention tests and examples/react-router, which builds and runs with React Router 7.

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

Add namedRoutes() next to tanstackRouter() from @tanstack/router-plugin in vite.config. The plugin scans src/routes (or app/routes) and writes src/routes.generated.ts by default, outside the routes folder, so it never becomes a route.

**Conventions.** __root is skipped; index and route.tsx are the folder's route; flat (posts.$postId.tsx) and directory files mix; $param; {-$locale} is optional ([[locale]]); prefix{$id}suffix becomes a mixed segment; a lone $ is a splat named _splat ([[..._splat]]); _layout is pathless; posts_ opts out of nesting; -prefixed files and (group) folders are ignored; .lazy files belong to the same route.

**When to use it.** TanStack Router already types its own <Link to> by route id. Use route() where a plain string is needed: <a href>, redirects to other apps, emails, sitemaps, analytics, locale-prefixed URLs and names shared with other frameworks in a monorepo.

**Verified.** Convention tests plus examples/tanstack-router, which builds and runs with the TanStack router plugin.

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

## Manual routes (React, Vue, any router)

When routes are declared in code (React Router <Route>, a vue-router routes array, Express-like servers), write the manifest yourself with createRoutes. You get the same name inference, parameter checking, encoding, query/hash, basePath and i18n options; only discovery is manual.

Patterns use the bracket syntax regardless of the router's own syntax: /users/:id becomes /users/[id], an optional :id? becomes [[id]], a splat * becomes [...splat] or [[...splat]]. Keep the object literal (or as const) so names and parameters are inferred.

To share a generated module anyway (for example from a monorepo package), set framework: "manual" and list routes in extraRoutes; the generator writes the same typed module without scanning.

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


<a id="app-router"></a>

## App Router recipes

The helper returns a normal URL string. Use it with next/link, redirect or the App Router useRouter hook from next/navigation. Run redirects from the appropriate server or event flow; named routes do not change Next.js redirect semantics.

Each name in these snippets assumes the corresponding page exists: posts/page.tsx, posts/[post]/page.tsx and posts/[post]/edit/page.tsx.

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

## Pages Router recipes

Use the same generated helper. The router hook comes from next/router in Pages Router applications. Link does not need a custom adapter. The discovery process can scan both router directories during migration, but conflicting canonical URLs fail generation.

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

## Parameters and encoding

[id] requires a nonempty string or finite number. [[id]] (Nuxt, Vue, SvelteKit, React Router, TanStack) is an optional scalar; omitting it removes the segment. [...slug] requires a nonempty array of strings/numbers. [[...slug]] accepts an optional array; an omitted value, null or [] removes the catch-all portion. Mixed segments require every parameter they contain.

Each parameter segment is encoded individually. A slash inside a scalar is encoded, while a catch-all array produces separate path segments. Extra parameters, empty required values, NaN, Infinity, objects and standalone . or .. segments fail. These checks validate URL construction, not your application’s business identifiers.

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

## Query strings and fragments

Pass query and hash in the third argument. Query values can be strings, finite numbers, booleans or readonly arrays of these values. null and undefined are omitted, including array entries. Arrays repeat the key; they do not use bracket notation.

The hash is a string without the leading # and is encoded by the helper. It stays in the browser and is not sent to the server. Hash strings and query objects are validated at runtime.

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```


<a id="base-path"></a>

## basePath, trailing slashes and origins

Next Link and router navigation add basePath themselves. Relative helper URLs omit it by default to prevent duplicate prefixes. For plain anchors, fetch or other consumers, request basePath: true. absolute: true always includes basePath and requires defaults.origin.

withNamedRoutes inherits basePath and trailingSlash from Next configuration. An explicit defaults option overrides inherited values. Origin must be an HTTP(S) origin without credentials, a non-root path, query or hash; it is never guessed from a request or window.

All defaults are serialized into the public generated module. Never put secrets in them. trailingSlash formats generated paths; Next remains responsible for redirects and final normalization.

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

## Locales and i18n

Configure i18n with locales, defaultLocale and optionally localePrefix, pathnames and domains. The shape matches next-intl's defineRouting(), so you can pass that routing object directly; next-intl-only keys such as localeCookie are accepted and ignored. In Next.js Pages Router projects, withNamedRoutes inherits next.config i18n automatically (localePrefix as-needed, domains included).

A dynamic first folder named locale or lang (app/[locale]/…, pages/[lang]/…, change it with localeParam) is removed from names and patterns: app/[locale]/about/page.tsx becomes about → /about. Physical locale folders (src/pages/pt/about.astro) merge into the same route. Without a locale folder (Pages Router i18n, @nuxtjs/i18n, middleware rewrites), every page is localized. Endpoints and routes outside [locale] are listed as unlocalized and never get a prefix.

route(name, params) without a locale returns the internal path, which is what next-intl's Link, Pages Router Link and @nuxtjs/i18n's localePath expect. Pass { locale } for plain anchors, redirects, sitemaps, emails or language switchers. route.forLocale(locale) returns a helper bound to that locale, and route.locales() lists the configured locales.

localePrefix: always (default) prefixes every locale; as-needed omits the default locale; never omits all prefixes; { mode, prefixes: { "en-US": "/us" } } customizes them. pathnames maps an internal pattern to localized patterns with the same parameters. With absolute: true, a locale served by a configured domain uses that domain as the origin. Locales are typed: the generated module exports RouteLocale and unknown locales are type and runtime errors.

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

## TypeScript and Next typedRoutes

Literal patterns infer name unions and parameter objects. Required parameters are checked at compile time; optional catch-all routes can be called without parameters. The runtime still validates JavaScript callers.

route() returns string, not Next’s generated Route type. When Next typedRoutes is enabled, its separate Link validation may require a Route assertion. The package still checks the route name and parameters. Do not assert untrusted arbitrary input to a route name to bypass validation.

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

## Runtime API reference

route(name, params?, options?) returns a URL string. params is optional only when the pattern has no required parameters. options contains query, hash, absolute, basePath and locale. route.has(name) checks existence and narrows a string to a known name; route.names() returns available names; route.pattern(name, locale?) returns the original or localized pattern; route.locales() lists locales; route.forLocale(locale) returns a helper bound to a locale.

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

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

## Generator configuration

No configuration file is required. Optional files are searched in this order: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. TypeScript configs need Node.js 22.18+ (built-in type stripping); use .mjs on older versions. Export defineConfig({...}) from @triooo/next-named-routes/config for autocomplete. The CLI --config flag selects another file; root inside a config file is relative to that file. Unknown or misspelled options fail with INVALID_CONFIG.

Discovery: framework (auto by default, or next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app or pages), appDir/pagesDir (Next.js custom folders or false), routesDir (custom pages/routes folder for other frameworks), pageExtensions (framework defaults; multi-part extensions such as page.tsx work), includeApi (false), exclude (globs relative to root with *, ** and ?).

Names: names (URL pattern → custom name, every path must exist), extraRoutes (explicit name → pattern, e.g. rewrite destinations), naming (separator, paramPrefix, home, transform) and i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Output: output (default src/routes.generated.ts; .ts, .mts, .js or .mjs, never inside a routable file), importSource (module the generated file imports createRoutes from, default the package name), exportNames (rename routes, route, RouteName and RouteLocale) and defaults (public basePath, trailingSlash and origin; only these keys are serialized). Plugins add watch (default true); withNamedRoutes also accepts watchInterval (750 ms, 25–60000). Inline plugin options override the config file.

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

## Optional stable names

Automatic names follow URL structure. If a refactor moves a public URL and you need a stable semantic name, update the optional names map. Every aliased path must exist. Unlisted routes keep automatic names. Duplicate names and typos fail generation instead of silently creating broken links.

A custom name replaces the automatic name for that path; it does not add a second alias automatically. This is useful for Laravel-style names such as posts.show, but it is not required for normal use.

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

## Discovery edge cases

Next.js: the scanner considers app and pages together. The root app directory takes precedence over src/app, independently of the same pages/src/pages rule. Other frameworks use their standard folders (Nuxt app/pages or pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) unless routesDir is set. Directory symlinks, hidden folders and node_modules are not followed; .d.ts files are ignored.

App Router: only page files are included by default. Groups and slots do not compose URLs. Interceptions are resolved to canonical paths and equivalent variants are consolidated. Private _ folders are ignored; %5F produces a public underscore. Layout, loading, default, error and metadata files are excluded.

Pages Router: root _app, _document and _error are excluded; other underscore pages remain valid. index is removed. API Routes, Route Handlers and other frameworks' endpoints are opt-in through includeApi or --api. URLs do not model HTTP methods, permissions or endpoint validation.

Conflicting URL shapes (for example [id] and [slug] at the same place) and inferred name collisions fail generation. In Next.js, duplicate canonical URLs and optional catch-all specificity conflicts also fail, as they do in Next. In nested-layout routers (Nuxt, Vue, React Router, TanStack), a layout and its index sharing a URL merge into one route.


<a id="development"></a>

## Automatic development updates

Next.js: the wrapper generates before Next starts, then runs a serialized polling watcher inside the development process. It sees additions, removals and renamed pages; the module changes only when its content changes. No webpack or Turbopack hooks are patched. It never writes during next start (production server), so read-only deployments are safe.

Vite frameworks: the plugin generates in buildStart and reacts to add/unlink events from Vite's watcher, plus changes to the named-routes config file. It finds the project root by walking up from Vite's root to package.json, so Nuxt's srcDir works.

Watchers do not run during production builds and do not keep the process alive by themselves. A generation error during editing preserves the last valid module and logs the error. Changes to modules imported by the config need a restart. watch: false disables only ongoing updates, not initial generation.


<a id="cli"></a>

## CLI and CI

The binary is named-routes (next-named-routes is an alias). generate (default) writes the manifest. list prints discovered entries as JSON. check compares without writing and exits with code 1 when stale. watch generates initially and polls until SIGINT/SIGTERM. init writes named-routes.config.mjs for the detected framework and never overwrites an existing config.

Flags: --root <directory>, --config <file>, --framework <name>, --output <file>, --routes-dir <dir>, --router <auto|app|pages>, --api, --watch-interval <ms>, --version (-v), --help (-h). Run commands from the consumer with the local package installed.

If you commit the generated file, run check before the build. The integrations regenerate at build time, so a check run after that build cannot detect a previously stale committed file. Generation is deterministic, atomic and timestamp-free. Existing files without the generator signature are never overwritten.

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

## Programmatic generator API

discoverRoutes(options?) returns root, framework, directories, routes, entries and the runtime defaults without writing. Each entry has name, path, file, router, framework and optionally variant and localized. Explicit extra routes have file: null and router: explicit.

generateRoutes(options?, { check?: boolean }?) additionally returns output and changed. check mode rejects stale output without modifying it. validateOptions(options) throws INVALID_CONFIG for unknown keys. Import /generator and /config only in Node tooling, never in client code. withNamedRoutes comes from /next and namedRoutes from /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/next-named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```


<a id="errors"></a>

## Errors and troubleshooting

NamedRouteError extends Error and exposes a stable code. UNKNOWN_ROUTE means the name is absent; MISSING_PARAMETER means a required value was omitted; UNKNOWN_PARAMETER means an extra key belongs in query or is misspelled; INVALID_PARAMETER means a value has the wrong shape or contains a forbidden segment; INVALID_LOCALE means a locale was passed without i18n or is not configured.

INVALID_PATTERN, INVALID_NAME and INVALID_MANIFEST identify malformed route definitions. INVALID_OPTIONS, INVALID_QUERY and INVALID_HASH identify invalid options. INVALID_BASE_PATH, INVALID_ORIGIN and INVALID_I18N reject URL defaults. MISSING_ORIGIN requires an origin before requesting absolute URLs. GENERATION_ERROR covers discovery conflicts, unsafe output and stale check results; INVALID_CONFIG covers missing, malformed or misspelled configuration.

Cannot find routes.generated: confirm the integration runs, run generate, and check output/import aliases. Duplicate basePath or locale: use plain relative URLs with framework links and pass basePath/locale only for plain URLs. Stale names: confirm the watcher is enabled and inspect terminal errors. A type error after moving a page is expected: update the inferred name or define a stable override.

Generation refuses to overwrite a handwritten output file. Choose a different output rather than adding a generated signature to unrelated code. Keep generated output outside routable files. Dynamic interpolation does not authorize a request; validate permissions and application input at the destination.

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

## Rewrites and boundaries

This is a URL builder, not a replacement router, middleware, authorization system or HTTP client. It does not create routes at runtime, validate resource existence, detect the visitor's locale or make backend requests.

Redirects, rewrites, middleware-based locale detection and paths declared in component code remain application concerns. Explicitly map any external or rewritten pattern you need with extraRoutes, and avoid applying locale or basePath twice. The scanner does not read framework config files; use withNamedRoutes or options to pass settings.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```


<a id="website"></a>

## Documentation website

This documentation is a Next.js app in website/. It is the project's public site, built with the package itself: every internal link uses route(), the playground and destination pages are real App Router routes, and the English, Portuguese, Spanish and Japanese content comes from the same docs/content.json that renders the README files.

The landing page shows each supported framework as a line on a transit map, a departure board fed with real generator output, a compatibility table and an install journey. Motion is finite or user-driven, pauses off screen, and is disabled by prefers-reduced-motion.

To deploy on Vercel, create a project with Root Directory set to website and keep "Include files outside the root directory" enabled. website/vercel.json installs the repository, builds the package and then builds the site. No environment variables are required.

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

## Try it: framework demos

examples/ holds a small runnable app per supported setup: app-router and pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router and react (routes declared by hand with createRoutes). Each one links to a static page, a dynamic users page and a catch-all docs page by name.

The demos depend on the package through file:../.., so build the package once at the repository root, then install and run any demo with npm. The generated module appears on the first dev or build run and changes as you add pages. Each demo builds with its real framework.

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

## Contribute step by step

**1. Prerequisites.** Install Node.js 20.19 or newer (22.18+ if you want to load named-routes.config.ts files), Git and Python 3 (only used to render the README files). Enable pnpm 12.16.1, the version pinned in package.json: corepack enable, or npm install --global pnpm@12.16.1.

**2. Clone and build.** Clone the repository, run pnpm install at the root and then pnpm build. The build cleans dist/ and compiles src/*.ts to ESM JavaScript, declarations and source maps. Run pnpm build again after every change to src/: the website and the demos use dist/, not the TypeScript sources.

**3. Know the layout.** src/index.ts is the browser-safe runtime (createRoutes, i18n, patterns); src/frameworks.ts holds the file-convention adapters; src/generator.ts discovers, validates and writes the module; src/config.ts loads named-routes.config.*; src/next.ts and src/vite.ts are the integrations; src/cli.ts is the named-routes binary. tests/ has the Node test suite and smoke tests. docs/locales.json lists the languages, docs/content.json holds the multilingual documentation and website/messages/<code>.json the interface texts. website/ is this site, examples/ has one demo per framework and scripts/ has the release, documentation and language helpers.

**4. Test while you work.** pnpm check builds and runs every Node test plus the positive and negative TypeScript contracts; it is what CI runs on Node 20, 22, 24 and 26. pnpm test:next starts real Next.js dev servers (install examples/app-router first with pnpm --dir examples/app-router install). pnpm test:vite starts a real Vite dev server. pnpm test:package packs the tarball and installs it into a clean project. pnpm release:check runs all of them.

**5. Edit the documentation.** docs/content.json is the single source for the website and every README. Each section has an id, title.<code>, paragraphs.<code> (an array of paragraphs per language), code and language; the codes are en, pt, es and ja. English is the source language: write the English text first and keep the same number of paragraphs in every language. **text** renders as bold on the site and in the README. A new section must also be added to a group in website/lib/docs.ts (with a title for every language), otherwise it is not listed in the sidebar. Its page is /docs/<id>.

**6. Translate and synchronize the languages.** Run pnpm locales (node scripts/sync-locales.mjs) after changing English text. It compares every language with English in docs/content.json and website/messages/*.json, fills anything missing with the English text so the site keeps working, removes interface keys that no longer exist in English, reorders keys to match en.json and prints a "Needs translation" list. Translate each listed entry in its language, then run pnpm locales:check (node scripts/sync-locales.mjs --check): it changes nothing and fails on missing titles or paragraphs, a different paragraph count, unbalanced **bold** markers, missing or stale interface keys, different ICU placeholders such as {count}, keys out of order or a language missing from website/lib/locales.ts. CI runs this check. node scripts/sync-locales.mjs --untranslated also lists texts that are still identical to English, which helps to review a language before a release.

**7. Sync the README files.** Run pnpm docs (python3 scripts/sync-docs.py) to regenerate README.md, README.pt-BR.md, README.es.md and README.ja.md from docs/content.json and docs/locales.json, then commit all of them. pnpm docs:check fails when any README is out of date; CI runs it, so never edit the README files by hand. The usual order is: edit English, pnpm locales, translate, pnpm locales:check, pnpm docs.

**8. Add a new language.** (a) Add an entry to docs/locales.json with code, name, htmlLang, readme (for example README.fr.md) and the README labels contents, references and localGuide. (b) Add the code to the Locale union in website/lib/locales.ts and a title for it to every group in website/lib/docs.ts. (c) Run pnpm locales: it creates website/messages/<code>.json and fills docs/content.json with English placeholders. (d) Translate every entry it reports. (e) Add the new README to the files list in package.json. (f) If the script needs other fonts or line breaking (as Japanese does), add rules for html[lang="<code>"] in website/app/transit.css. (g) Run pnpm locales:check, pnpm docs, pnpm --dir website check:i18n and pnpm --dir website build. The language switcher in the header picks the new language up automatically.

**9. Edit website texts.** Interface strings live in website/messages/<code>.json under ui, with identical keys in every file; ICU syntax is checked, so avoid unescaped braces and keep placeholders identical. Add new keys to en.json first, then run pnpm locales and translate them. pnpm --dir website check:i18n validates every catalog. Framework data shown on the landing page (board rows, map lines, compatibility table) lives in website/lib/transit.ts and must match real generator output.

**10. Run the website.** After pnpm build at the root, run pnpm --dir website install once and pnpm --dir website dev (or pnpm website). The site depends on the package through link:.., so rebuild the package and restart the dev server after changing src/. Switch languages with EN, PT, ES and JA in the header. Before a pull request run pnpm --dir website typecheck and pnpm --dir website build.

**11. Try a demo.** Each folder in examples/ is a small app: cd examples/sveltekit (or nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Add a page and watch its routes.generated.ts change. The Next.js demos use pnpm.

**12. Add a framework.** Write the adapter in src/frameworks.ts (sources, extensions, skipDirectory, map) and teach detectFramework its package; add convention tests to tests/frameworks.test.mjs; add a demo to examples/ and the demos workflow matrix; document it in docs/content.json in every language; add its line to website/lib/transit.ts only after the demo builds.

**13. Open a pull request.** Keep the change focused, add regression tests, update CHANGELOG.md under the next version, run pnpm release:check, pnpm locales:check and pnpm docs:check, and never commit generated files (dist/, routes.generated.ts, .next/, demo build output); .gitignore already excludes them.

**14. Releases (maintainers).** Bump version in package.json, move the CHANGELOG entry under it, run pnpm release:check, then publish a GitHub release tagged next-named-routes-vX.Y.Z. The publish workflow validates the tag, runs CI again and publishes to npm with provenance through npm trusted publishing (no npm token is stored). Apache License 2.0 applies; bundled fonts keep their OFL licenses.

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

## Versions and upgrades

Version 1.x defines the public contract for inferred names, typed URL generation, framework adapters, i18n, the Next.js wrapper, the Vite plugin and the CLI.

Patch releases preserve the documented API while fixing bugs. Minor releases add compatible functionality, such as new framework adapters. Breaking changes require a new major version. Review the changelog before upgrading.

After an upgrade, restart the dev server to regenerate the manifest and run your application’s type check and navigation tests. If you move a page and need to preserve its public route name, use an explicit alias.

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

## Official references

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
