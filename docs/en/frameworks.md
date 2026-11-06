# Frameworks · @triooo/next-named-routes

[← Back to README](../../README.md) · [English](../en/frameworks.md) · [Português](../pt/frameworks.md) · [Español](../es/frameworks.md) · [日本語](../ja/frameworks.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Other frameworks (Vite plugin)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Manual routes (React, Vue, any router)](#manual-routes)

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

---

← Previous: [Getting started](getting-started.md) · [Back to README](../../README.md) · Next: [Build with routes](build-with-routes.md) →
