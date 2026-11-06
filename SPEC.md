# Named routes v1.0 contract

`createRoutes({ 'posts.show': '/posts/[post]' })` returns a callable `route(name, params?, options?)`. Parameters are inferred from literal path templates (`[id]`, `[[id]]`, `[...slug]`, `[[...slug]]` and mixed segments such as `v[major]-[minor]`). Query, fragment, basePath, absolute origin and locale are explicit options; URL generation is deterministic and browser/server safe. No global state, framework dependency, or filesystem imports in the runtime.

## Discovery

A Node generator converts file-system routing conventions into that single pattern syntax. Adapters: Next.js (App Router and Pages Router, including src/ layouts, mixed-router migrations, groups, slots and interceptions), Nuxt (pages plus opt-in Nitro server routes), Vue Router file-based routing (unplugin-vue-router conventions), SvelteKit, Astro, React Router / Remix flat routes and TanStack Router. `manual` writes a module from explicit routes only. The framework is detected from package.json and can be set explicitly. The generator reads paths only and never executes or parses source files. Paths declared in component code (Nuxt `definePageMeta`, React Router `routes.ts`) are out of scope and can be added with `extraRoutes`.

Real route conflicts fail; nested-layout routers merge a layout and its index sharing a URL. API endpoints are opt-in. Automatic names use dotted URL segments, `$param` for parameters and `home` for `/`; the separator, parameter prefix, home name and a transform function are configurable. Users rename paths with a configuration map to obtain Laravel-style names such as `posts.show`. A generated TypeScript or JavaScript module exports `route`, its immutable manifest and the name/locale types, with configurable export names and import source.

## i18n

i18n options mirror next-intl's `defineRouting()` (`locales`, `defaultLocale`, `localePrefix`, `pathnames`, `domains`). A dynamic first `[locale]`/`[lang]` segment and physical locale folders are removed from names and patterns. Without a locale segment, every page is localized; endpoints and routes outside the locale segment are unlocalized. Without `locale`, `route()` returns the internal path for locale-aware links; with `locale`, it applies localized pathnames and the prefix mode. Next.js Pages Router `i18n` is inherited by the wrapper. Locale detection, cookies and middleware remain application concerns.

## Integrations

CLI `generate/check/list/watch/init`, a Next config wrapper and a Vite plugin generate before dev/build without patching webpack or Turbopack. In `next dev`, the wrapper starts an unrefed polling watcher; it never writes during `next start`. The Vite plugin uses Vite's watcher. Neither depends on undocumented framework internals. The wrapper forwards `pageExtensions`, `basePath`, `trailingSlash` and `i18n`. Rewrites, route authorization and the router's own resolution are out of scope.

## Versioning and release gates

The 1.x public contract covers automatic names, encoded URL output, explicit query/hash/basePath/absolute/locale options, exported TypeScript inference, stable error codes, generator options, framework adapters and the CLI. Removing or changing these documented behaviors requires a major release. Adding compatible options or adapters is a minor release; correctness fixes that preserve this contract are patches.

`release:check` runs runtime/i18n/adapter/plugin/CLI tests, positive and negative TypeScript contracts, real Next App Router and Pages Router smoke tests, a real Vite dev server smoke test and an isolated install of the actual npm tarball. Node 20.19+, TypeScript 5+, Next 16 and Vite 7 are the tested baseline.

Version 1.0.0 is prepared locally. It is not described as published until the npm registry confirms it.
