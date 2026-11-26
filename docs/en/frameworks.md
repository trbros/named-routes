# Frameworks · @triooo/named-routes

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

Use namedRoutes() from @triooo/named-routes/vite in Vue, SvelteKit, React Router/Remix and TanStack Router. Register @triooo/named-routes/nuxt in Nuxt modules and the default import from @triooo/named-routes/astro in Astro integrations. The integrations generate during startup/build and refresh as route files or framework artifacts change.

The framework is detected from package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev or @remix-run/dev, TanStack router plugin/CLI/Start, unplugin-vue-router or vue-router). Set framework explicitly in monorepos or when detection is ambiguous. Run npx @triooo/named-routes init to create a config for the detected framework.

Conventions are converted to the runtime syntax. Nuxt and Vue: index, [id], [[id]] optional, [...slug] (matches an empty remainder, so it becomes [[...slug]]), (group) folders, parent.vue + parent/ nesting, mixed segments such as v[major]-[minor]; Vue also treats dots as nesting (users.edit.vue) and supports [id]+ repeatable params. Nuxt ignores files starting with -, and with includeApi scans server/api (prefixed /api) and server/routes, removing .get/.post suffixes.

SvelteKit: +page.* files, [id=matcher] (the matcher is dropped), [[lang]], [...rest] (zero or more segments), (group), [x+2f] escapes and +server endpoints with includeApi. Astro: src/pages with .astro/.md/.mdx/.html, _private files ignored, [...slug] rest params and .ts/.js endpoints with includeApi.

React Router / Remix flat routes (app/routes): dots nest, _index, $param, ($optional), $ splat (named splat), _pathless layouts, name_ opt-out, [.] escapes and folder/route.tsx modules. TanStack Router (src/routes): flat and directory files, index/route, $param, {-$optional}, prefix{$param}, $ splat (named _splat), _layouts, -ignored files, (groups) and .lazy files. Optional static segments such as (beta) cannot be named; exclude the file or use extraRoutes.

Framework discovery (default since 2.0): where the framework publishes its final route table through a documented channel, names come from it, so paths declared in code are included. Nuxt: the module reads pages:resolved (definePageMeta path and alias, pages added by modules). Vue Router 5: the typed-router.d.ts it generates (definePage path). React Router: react-router routes --json (route(), index(), layout() and prefix() in app/routes.ts). TanStack Router: routeTree.gen.ts. Nothing executes or parses your code. Until the framework has written its table, the file conventions above are used and the CLI says so; discovery: "files" keeps the 1.x scanner. Next.js, SvelteKit and Astro cannot declare routes in code, so their files are the source.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

Wrap next.config with withNamedRoutes from @triooo/named-routes/next. The module is generated before next dev and next build, kept current by a watcher inside next dev, and never written during next start, so read-only deployments are safe. The wrapper inherits pageExtensions, basePath, trailingSlash and the Pages Router i18n config.

**Conventions.** app/ and pages/ (or src/app and src/pages) are scanned together. App Router: page files only; route groups and parallel slots are omitted, interceptions resolve to their canonical URL, _private folders are ignored and %5F becomes an underscore. Pages Router: index is removed and _app, _document and _error are skipped. Route Handlers and pages/api are opt-in with includeApi. appDir and pagesDir point to custom folders (or false to skip one).

**Navigation.** The helper returns plain strings for next/link, useRouter from next/navigation or next/router, and redirect. Link and the router add basePath themselves; pass { basePath: true } only for plain anchors or fetch. With next-intl, pass your routing object as i18n: app/[locale]/about becomes about, and next-intl's Link receives the internal path.

**Verified.** Real Next 16 dev servers (App Router and Pages Router, with basePath and live page discovery) run in CI. Demos: examples/app-router and examples/pages-router. See also the App Router and Pages Router recipes.

With typedRoutes: true in the Next config, route() results are accepted by <Link>, router.push(), replace() and prefetch() without casts, because typed hrefs are the default since 2.0; the wrapper warns when typedRoutes meets hrefs: "string". Verified with the real next typegen and TypeScript on Next 16, in both routers, with webpack and Turbopack.

**CLI and configuration changes.** After dev/build, the effective base is saved in .named-routes/ for CLI generation. Restart Next after changing basePath. Before the first build in CI, use shared defaults.basePath or --base-path. To redirect translated incoming URLs, see the i18n section and route.localize().

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

Add "@triooo/named-routes/nuxt" to modules in nuxt.config. The module names the routes Nuxt itself resolves (the pages:resolved hook), so definePageMeta({ path, alias }) and pages added by other modules are included, and regenerates as you add, move or delete pages during nuxt dev. Keep the output inside your source directory and import it with the ~ alias: with Nuxt 4 (srcDir app/) use output app/routes.generated.ts and import ~/routes.generated. Options go in named-routes.config (shared with the CLI) or under namedRoutes in nuxt.config.

**Conventions.** app/pages or pages: index.vue, [id], [[id]] optional, [...slug] (also matches an empty remainder, so it becomes [[...slug]]), (group) folders, mixed segments such as v[major]-[minor], and parent.vue + parent/ nesting merged into one route. Files starting with - are ignored. With includeApi, server/api (prefixed /api) and server/routes are scanned and .get/.post suffixes are removed.

**Navigation and i18n.** Use the URL with NuxtLink :to, navigateTo or useRouter().push. With @nuxtjs/i18n, configure the same locales here: strategy prefix_except_default maps to localePrefix as-needed, prefix (or prefix_and_default) to always, and no_prefix to never. Then route(name, params, { locale }) returns the localized URL; without a locale you get the internal path for localePath(). Translated paths from defineI18nRoute must be repeated in i18n.pathnames.

**Limits and verification.** The module also writes .nuxt/named-routes/pages.json, so named-routes check and generate see the same routes after nuxt prepare. List it before @nuxtjs/i18n in modules, so it sees the routes before they are localized. The Vite plugin still works in Nuxt but only sees the files. Names follow this package's dotted style (users.$id), not Nuxt's own route names (users-id). Verified by convention tests and by examples/nuxt, which builds and runs with Nuxt 4, including a definePageMeta({ path }) page.

**Base URL.** The native module inherits app.baseURL. NuxtLink uses the router’s own base, so keep its to internal; plain href and fetch need basePath: true. Restart Nuxt after changing app.baseURL and regenerate the CLI cache.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

For Vue apps with file-based routing (Vue Router 5 vue-router/vite, or unplugin-vue-router on Vue Router 4), add namedRoutes() before VueRouter() and vue() in vite.config. users/_parent.vue is treated as the non-matchable parent of users/, as in Vue Router 5.0.3+. The framework is detected from unplugin-vue-router or vue-router; src/pages is scanned unless routesDir says otherwise. Apps that declare a routes array by hand should use a manual manifest instead.

**Conventions.** index.vue and (name).vue are index routes; dots nest (users.edit.vue is /users/edit); [id] and [[id]]; [id]+ is a one-or-more repeatable param ([...id]) and [[id]]+ zero-or-more ([[...id]]); [...path] also matches an empty remainder ([[...path]]); (group) folders are omitted; parent.vue + parent/ nesting merges; mixed segments like v[major]-[minor] work.

**Navigation.** Pass the URL to RouterLink :to or router.push. Vue Router resolves the string like any path, so the package does not need access to the router instance.

**Verified.** Names come from the typed-router.d.ts that Vue Router 5 writes (its dts option), so definePage({ path }) overrides are named by the URL they serve; before it exists, the files are scanned. A real Vite dev server with these conventions runs in CI, and examples/vue builds, runs and is driven in a browser with Vue Router 5 (vue-router/vite), including a users/_parent.vue layout and a definePage({ path }) page.

**History base.** If the actual router uses createWebHistory(import.meta.env.BASE_URL), set inheritViteBase: true and Vite base as in the example. Otherwise pass the history base explicitly as routerBase; Vite base can be an asset-only/CDN URL. RouterLink and router.push apply the history base themselves; use basePath: true only for plain public URLs.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

Add namedRoutes() before sveltekit() in vite.config. Writing the module to src/lib lets you import it as $lib/routes.generated from any component, load function or endpoint.

**Conventions.** src/routes with +page.svelte, +page.ts or +page.server.ts (they merge into one route); (group) folders are omitted; [id=matcher] keeps the parameter and drops the matcher; [[lang]] is optional; [...rest] matches zero or more segments ([[...rest]]) and may sit before static segments; +page@ layout resets are normal pages; [x+2f] and [u+0041] escapes are decoded. +server endpoints are opt-in with includeApi.

**Navigation.** Pass the same navigation prefix as routerBase and SvelteKit paths.base. SvelteKit plain anchors, goto and redirects need the actual public path; use route(..., { basePath: true }) with the options in the third argument. For SvelteKit 2 share kit.paths.base from svelte.config with vite.config; SvelteKit 3 accepts paths in sveltekit() as shown below.

**Verification.** Convention tests and the examples/sveltekit integration cover file discovery and navigation; the current example uses SvelteKit 3 with Svelte 5.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

Register the native integration from @triooo/named-routes/astro in astro.config integrations. It inherits Astro’s final base. Remove namedRoutes() from vite.plugins if migrating from the old configuration. The generated module defaults to src/routes.generated.ts and is usable in .astro frontmatter, islands and endpoints.

**Conventions.** src/pages with .astro, .md, .mdx, .markdown and .html pages; files and folders starting with _ are private; [id]; [...slug] matches zero or more segments ([[...slug]]); mixed segments such as [lang]-[version]. .ts/.js endpoints are opt-in with includeApi and keep their inner extension (api/data.json.ts is /api/data.json).

**i18n.** Astro's physical locale folders (src/pages/pt/about.astro) merge into the same named route as src/pages/about.astro when the locale is listed in i18n.locales. prefixDefaultLocale: false matches localePrefix as-needed and true matches always.

**Limits and verification.** Static builds still need getStaticPaths in dynamic pages: the package builds URLs, it does not enumerate parameters. Verified by convention tests and examples/astro, which builds and runs with Astro 5.

**Deployment under a base.** With base: "/app", route() still returns an internal pathname. For an Astro HTML anchor, use the third argument { basePath: true } to obtain /app/docs/guide/install. Restart the Astro dev server or rebuild after changing base; the CLI can reuse the last successfully generated prefix or use --base-path explicitly.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

For React Router 7 and 8 framework mode (and Remix v2), add namedRoutes() before reactRouter() in vite.config. Names come from react-router routes --json, the framework's own resolution of app/routes.ts, so flatRoutes() files and routes declared with route(), index(), layout() and prefix() are all discovered. A good output is app/routes.generated.ts, outside app/routes.

**Conventions.** Dots nest (concerts.$city.tsx is /concerts/[city]); _index is the index; $param; ($lang) is optional ([[lang]]); a lone $ is a splat named splat ([[...splat]]); _auth leading underscores are pathless layouts; concerts_ opts out of nesting; [.] escapes keep characters; a folder with route.tsx is one route and deeper folders are ignored. A layout and its _index share a URL and merge.

**Navigation.** Use <Link to={route(...)}>, useNavigate() or redirect() in loaders and actions.

**Limits and verification.** Without @react-router/dev installed, or when the command fails, the flat-route files above are scanned and the CLI reports why. Optional static segments such as (beta) cannot be named; the generator stops with a clear error so you can exclude the file. Verified by convention tests and examples/react-router, which builds and runs with React Router 8, including a route declared with route() in app/routes.ts.

**Basename.** Share the same value between React Router’s basename and namedRoutes({ routerBase }). For Remix use its equivalent basename setting and the same routerBase; for a manually declared router use createBrowserRouter(..., { basename }) and a manual manifest when needed. Link and router navigation already apply basename; use basePath: true for plain HTML URLs.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

Add namedRoutes() next to tanstackRouter() from @tanstack/router-plugin in vite.config. The plugin scans src/routes (or app/routes) and writes src/routes.generated.ts by default, outside the routes folder, so it never becomes a route.

**Conventions.** __root is skipped; index and route.tsx are the folder's route; flat (posts.$postId.tsx) and directory files mix; $param; {-$locale} is optional ([[locale]]); prefix{$id}suffix becomes a mixed segment; a lone $ is a splat named _splat ([[..._splat]]); _layout is pathless; posts_ opts out of nesting; -prefixed files and (group) folders are ignored; .lazy files belong to the same route.

**When to use it.** TanStack Router already types its own <Link to> by route id. Use route() where a plain string is needed: <a href>, redirects to other apps, emails, sitemaps, analytics, locale-prefixed URLs and names shared with other frameworks in a monorepo.

**Verified.** Names come from the routeTree.gen.ts the TanStack Router plugin or CLI generates (its navigable paths); before it exists, the files are scanned. Convention tests plus examples/tanstack-router, which builds and runs with the TanStack router plugin.

**Router basepath.** Set createRouter({ routeTree, basepath: "/app" }) in the application and namedRoutes({ routerBase: "/app" }) in Vite. Set Vite base separately when serving assets below that path. Use basePath: true for anchors and configure defaults.origin if you need absolute URLs. Ignore .tanstack temporary files, not routeTree.gen.ts: framework discovery uses the published tree.

**Public assets.** Import `asset` from the generated module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

**Typed assets.** Enable assets: { strict: true } in named-routes.config; public paths are inferred from the local public directory (static/ in SvelteKit). See Typed assets, Asset versioning and Audit.

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

## Manual routes (React, Vue, any router)

When routes are declared in code (React Router <Route>, a vue-router routes array, Express-like servers), write the manifest yourself with createRoutes. You get the same name inference, parameter checking, encoding, query/hash, basePath and i18n options; only discovery is manual.

Patterns use the bracket syntax regardless of the router's own syntax: /users/:id becomes /users/[id], an optional :id? becomes [[id]], a splat * becomes [...splat] or [[...splat]]. Keep the object literal (or as const) so names and parameters are inferred.

To share a generated module anyway (for example from a monorepo package), set framework: "manual" and list routes in extraRoutes; the generator writes the same typed module without scanning.

**Manual base.** Set basePath in createRoutes() defaults and configure the same history base or basename in your router. In generator-based manual projects use defaults.basePath in named-routes.config. Route names never include the prefix.

**Public assets.** Export `const asset = route.asset` from your manual module and pass a path relative to the public directory, for example `asset("images/logo.svg")`. It includes the configured navigation base by default and never includes a locale. Set `defaults.assetBase` explicitly if the public files are hosted on a different path or CDN. Do not pass imported/bundled assets to this helper. See Public assets.

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

← Previous: [Getting started](getting-started.md) · [Back to README](../../README.md) · Next: [Build with routes](build-with-routes.md) →
