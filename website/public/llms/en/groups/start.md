# Start here

# What it does

Topic: `overview` · Named Routes v2.2.0

Named Routes generates typed URL helpers from routes your framework already knows. Use a stable name instead of reconstructing paths. It does not replace your router, perform navigation or send HTTP requests. Start with installation and choose your framework; explore the reference as needed.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
---

# Installation

Topic: `installation` · Named Routes v2.2.0

Install with your package manager. The generator requires Node.js 22.12 or later and the type contracts require TypeScript 5.4 or later. The browser runtime has no external dependencies; the Node-only generator uses a parser for endpoint declarations.

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

Related topic IDs: frameworks, quick-start, configuration, mcp-installation
---

# Choose your framework

Topic: `frameworks` · Named Routes v2.2.0

Install the package once. Use the integration for your framework, then create a page and import the generated helper. The links below lead to separate setup, conventions, navigation, deployment, assets, localization and endpoint guides.

Related topic IDs: nextjs, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual-routes
---

# Your first named route (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

A minimal Next.js setup: add the wrapper in next.config.ts, run your dev server, then follow the Next.js navigation guide. For another framework choose its own setup page.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
---

# Automatic naming rules

Topic: `naming` · Named Routes v2.2.0

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

# Read the generated manifest

Topic: `generated-source` · Named Routes v2.2.0

Each manifest entry shows the relative source file. Ordinary property keys are string literals, avoiding computed-key lint warnings. __proto__ remains computed to preserve a safe data property. Never edit the generated module; edit the source route or config and regenerate.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
---

# Compared with alternatives

Topic: `comparison` · Named Routes v2.2.0

Several packages and framework features also generate typed URLs. They differ in where routes come from, whether routes have names, which frameworks they cover and whether locales are part of the model. The tables summarize what each project documents or ships; npm figures are the latest version and downloads in the last month, collected on 2026-11-05. ✓ means supported, ½ partial, — not offered or not documented.

**Where this package differs.** Names are inferred from the files you already have and stay identical across Next.js, Nuxt, Vue, SvelteKit, Astro, React Router and TanStack Router; locales (prefixes, translated pathnames, domains) are part of the same typed call; and route() returns a plain string that works outside any router: redirects, emails, sitemaps or a package shared by several apps in a monorepo.

**When another choice fits better.** If you use a single framework and are happy keying routes by path, its built-in feature needs no extra dependency. If you need search params validated against a schema (Zod, Valibot), next-typesafe-url and next-safe-navigation do that and this package does not. If your routes live in a Laravel backend, Ziggy is the natural fit. next-routes targets the legacy Pages Router with React 15/16, and the unscoped named-routes package is an unrelated 2022 project with a similar name.

**Built into the frameworks.** Next.js typedRoutes, React Router href(), SvelteKit resolve() and TanStack Router type paths written in that framework's own syntax; Nuxt typedPages types Nuxt's route names. They work inside one framework and do not share names or a locale model with others. Astro's getRelativeLocaleUrl() builds locale URLs from an untyped path.

**Packages**

| Package | Frameworks | Routes from | Names | Typed params | i18n | URL builder | npm (latest · month) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**Built into the frameworks**

| Framework | Feature | Route key | Typed params | Names shared across frameworks | Locales |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |
---

# How generation works

Topic: `architecture` · Named Routes v2.2.0

The Node-only generator reads route files and framework route tables. It parses endpoint declarations statically when includeApi is enabled; it does not invoke endpoint handlers. Framework-specific discovery may run the framework route-list command. The generated module contains public patterns and helpers; the browser runtime has no Node.js imports. The framework remains responsible for serving pages and applying navigation rules.

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
