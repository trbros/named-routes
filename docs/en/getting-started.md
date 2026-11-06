# Getting started · @triooo/next-named-routes

[← Back to README](../../README.md) · [English](../en/getting-started.md) · [Português](../pt/getting-started.md) · [Español](../es/getting-started.md) · [日本語](../ja/getting-started.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [What it does](#overview)
- [Compared with alternatives](#comparison)
- [Installation](#installation)
- [One-time Next.js setup](#quick-start)
- [Automatic naming rules](#naming)

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

---

[Back to README](../../README.md) · Next: [Frameworks](frameworks.md) →
