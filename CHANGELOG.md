# Changelog

## Unreleased

### Documentation

- Updated multilingual framework guides and website code samples for native Astro integration, deployment base paths, CLI overrides and localized URLs.

### Added

- `@triooo/named-routes/astro`: native integration inheriting the final Astro `base` independently of the Vite asset base.
- `namedRoutes({ routerBase })` accepts a router prefix or getter for SvelteKit, Vue Router, React Router/Remix and TanStack Router; `inheritViteBase` opts in when Vite's base is also the navigation base.
- `route.localize(url, locale?, options?)` resolves translated aliases across configured languages, even without a locale prefix, preserves decoded route parameters and the original query/fragment, supports custom locale prefixes, base paths and configured domains, and returns `null` for ambiguous or unlocalized routes. Existing `route.match()` semantics remain unchanged.
- `--base-path` for standalone generation, watch, check, list and doctor; framework integrations cache their last successful effective public base under `.named-routes/` so CLI regeneration does not discard it.

### Fixed

- Nuxt now inherits `app.baseURL`; Next.js keeps the existing automatic `basePath` behavior and synchronizes the CLI snapshot when the base changes or is removed.
- Vite ignores atomic generated-module and base snapshot writes, avoiding redundant watcher runs. Canonical route names remain independent of deployment prefixes; framework links do not get a double prefix.
- Builds validate the CLI shebang and executable mode; package smoke tests now exercise npm executable resolution with and without a local installation. Standalone CLI documentation uses `npx @triooo/named-routes` to avoid the unrelated unscoped package.
- Regression tests cover framework integration hooks, base overrides and translated path resolution, including ambiguity, query/fragment preservation and dynamic segments.
- Prevent concurrent route tree reads during TanStack Router generation by waiting for framework artifact updates.
- Ignore TanStack temporary generator files in the Vite watcher, reducing unnecessary regenerations and filesystem contention on Windows.

## 2.0.0 - 2026-11-25

Breaking changes only where they pay off, each with a migration: run `npx named-routes doctor --v2` to see what applies, and `npx named-routes migrate --to 2 --write` to pin the 1.x behavior where the generated module would change. It also contains the fixes planned for 1.1.1, which was not released separately.

### Breaking

- Node.js 22.12+ is required (Node.js 20 is end-of-life since April 2026): `require()` of ES modules and native recursive file watching everywhere. CI tests 22.12, 22, 24 and 26.
- TypeScript 5.4+ is required for the exported types (also the minimum of Zod 4 and Valibot 1). CI tests 5.4, 5.9, 6 and 7.
- `hrefs: "typed"` is the default, in generated modules and in `createRoutes()`: `route()` returns template literal types such as `` `/users/${string}` `` that Next.js `typedRoutes` accepts without casts. A variable that stores `route()` and is reassigned to another string no longer compiles; annotate it as `string`, or set `hrefs: "string"` (the generated module then serializes `"hrefs": "string"`). `withNamedRoutes()` and `doctor` now warn when `typedRoutes` meets `hrefs: "string"`.
- Framework discovery is the default (`discovery: "framework"`): where the framework publishes its final route table, names come from it, so paths declared in code are included. Nuxt: the new `@triooo/named-routes/nuxt` module reads `pages:resolved` (`definePageMeta({ path, alias })`, pages added by modules; aliases get their own names) and stores the table in `.nuxt/named-routes/pages.json` for the CLI. Vue Router 5: the `typed-router.d.ts` it generates (`definePage({ path })`). React Router: `react-router routes --json` (`route()`, `index()`, `layout()`, `prefix()` in `app/routes.ts`). TanStack Router: `routeTree.gen.ts`. Until the table exists, the files are scanned and the CLI says why. `discovery: "files"` keeps the 1.x scanner; Next.js, SvelteKit and Astro are unchanged.
- One error code per error class: invalid `router`, `pageExtensions` and `output` values (including an output inside a routes directory) raise `INVALID_CONFIG` instead of `GENERATION_ERROR`. Messages are unchanged.
- `typesVersions` was removed; types are published through `exports` only, so `moduleResolution` must be `bundler`, `node16` or `nodenext`.
- Generated modules that import query schemas as types only (no `validateQuery`) use `TypeOnlyQueries<typeof schemas>`, so `route.parseQuery()` is typed as returning the raw query there, which is what it returns.

### Added

- `route.parseQuery(name, input)`: reads a URL's query (a URL, query string, `URLSearchParams` or `route.match().query`) with the route's schema when it exists at runtime, returning `{ ok: true, value }` with the schema's output type or `{ ok: false, issues }`. For keys the schema rejects as strings, numbers and `true`/`false` written by `route()` are converted back and single values become arrays. Routes without a runtime schema return the raw query. New `QueryOutput`, `QueryParseResult`, `QueryParseInput`, `TypeOnlyQuery` and `TypeOnlyQueries` types.
- `named-routes doctor` reports where the routes came from (the framework's table or the files, and why), every route that exists only in the framework's table or only in the file view, and whether Nuxt uses the module. `doctor --v2` lists what a 1.x project must change: typed hrefs, routes that framework discovery changes, a `moduleResolution` that cannot read `exports`, and code comparing error codes with `GENERATION_ERROR` (text check).
- `named-routes migrate --to 2` (dry run; `--write` applies): pins `hrefs: "string"` and, where the routes differ, `discovery: "files"` in the named-routes config (creating `named-routes.config.mjs` when there is none). It never edits framework configs or application code.
- The Vite plugin regenerates when the framework rewrites its route table, and once more before the module is first loaded in a build, after every plugin's `buildStart`. `named-routes watch` also watches the framework's artifact. The CLI summary names the source: `(5 routes, nuxt, from .nuxt/named-routes/pages.json)`.
- Examples: Nuxt uses the module with a `definePageMeta({ path, alias })` page, Vue a `definePage({ path })` page and React Router a `route()` in `app/routes.ts`; the E2E harness navigates to each in a real browser.
- `pnpm test:package` checks the packed tarball with [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io) (node16 and bundler resolution) and [publint](https://publint.dev) (strict).
- `pnpm test:types` (and so `pnpm check` and CI) type-checks the TypeScript samples of the documentation against a module generated with every route name they use, with `hrefs: "string"` and `"typed"`; lines documented as a type error must fail.
- Documentation: "Upgrading from 1.x" in the four languages, and every framework page describes its route source.

### Fixed

- Config files are re-imported only when their content changes (a hash of the file instead of its modification time). Saving or touching `named-routes.config.*` without changes during `watch`, `next dev` or Vite no longer leaves another module instance in memory. Node.js cannot unload ES modules, so each distinct version of a config still stays loaded until the process restarts; the documentation now says so.
- Typed hrefs: calling a route whose query has required keys without `options.query` reports `Argument of type '"search"' is not assignable to parameter of type '"search" & QueryIsRequired<"search">'` instead of `Expected 3 arguments, but got 1`.
- `pnpm test:package` no longer fails between a release and the next version bump: `npm publish --dry-run` refuses a version that is already on npm, after it has packed and normalized `package.json`, which is what the test checks.

## 1.1.0 - 2026-11-14

Backward compatible with 1.0: new behavior is opt-in or additive, and error codes and messages are unchanged.

### Added

- `hrefs: "typed"` (config, `withNamedRoutes()`, Vite plugin or `createRoutes`): `route()` returns template literal types such as `` `/users/${string}` `` that Next.js `typedRoutes` accepts in `<Link>`, `router.push()`, `replace()` and `prefetch()` without casts. Type-only; URLs are identical. New `RouteHref`, `RouteHrefWithSuffix` and `TypedNamedRoutes` types. `withNamedRoutes()` prints a hint when `typedRoutes` is enabled without it.
- Typed query per route: `defineQuery({...})` with Standard Schema validators (Zod 3.24+, Valibot 1+, ArkType…) or `defineQuery.type<T>()`, configured with the `query` option. Unknown keys and incompatible values are type errors; required keys make the query required. Imported as types only by default; `validateQuery: true` bundles the schemas and throws `INVALID_QUERY` on invalid values. No schema library is a dependency.
- Reverse routing: `route.match(url)`, `route.is(name, url, { exact })` and `route.breadcrumbs(url)`, with deterministic precedence (static before dynamic, then declaration order), safe decoding, `basePath`, trailing slash, locale prefixes, localized pathnames and i18n domains. Unmatched or malformed URLs return `null`; non-string input throws `INVALID_URL`.
- `named-routes doctor`: read-only diagnostics of Node.js/TypeScript versions, configuration, framework, routes, conflicts, stale output, Next.js/Vite integration, typedRoutes without typed hrefs, i18n and code-declared routes the scanner cannot see. `--json`, `--strict` and `--no-color`; exit code 1 on errors.
- `NamedRouteError.details` (`file`, `files`, `route`, `pattern`, `option`, `hint`) with "did you mean" suggestions for route names, options and `names` keys. The CLI prints them.
- Watcher modes: `watchMode` (`auto`, `native`, `poll`) for `withNamedRoutes()` and `--watch-mode` for `named-routes watch`.
- Real-framework E2E harness (`pnpm test:e2e`): every example installs the packed tarball, type-checks, builds, serves the production build, is driven in Chromium through the generated links, and has a page created, renamed and removed while its dev server runs. Runs in CI for all examples on Linux and for Next.js App Router and Vue on Windows and macOS, and gates publishing.
- Real Next.js `typedRoutes` contract test (`next typegen` + `tsc`), `next build` + `next start` in the Next.js smoke test, a browser-safety test for the runtime, TypeScript 5.0/5.4/5.9/6/7 type-contract matrix, Biome lint/format (`pnpm lint`, `pnpm format`) and a watcher benchmark (`pnpm bench:watch`).
- Website: the playground shows `route.match()` and `route.breadcrumbs()` on the site's own routes; documentation for typed hrefs, typed query, reverse routing and doctor in English, Portuguese, Spanish and Japanese.

### Changed

- Next.js dev and `named-routes watch` react to file events (debounced, serialized) with a 5 s reconciliation rescan instead of rescanning every 750 ms. Polling is used automatically in WSL Windows drives, with `WATCHPACK_POLLING`/`CHOKIDAR_USEPOLLING`/`NAMED_ROUTES_WATCH=poll`, or when the OS refuses watchers. Measured with `pnpm bench:watch` (Linux, Node 26, median of 3): 200 routes, idle CPU 36 → 6 ms/s and add → module 478 → 90 ms; 2000 routes, 153 → 29 ms/s and 582 → 203 ms. `watchMode: "poll"` restores 1.0 behavior.
- Examples: Next.js App Router uses `typedRoutes` with typed hrefs and a query link; Pages Router uses i18n, a `pt` locale link and a query link; both have a catch-all docs page. The Vue example uses Vue Router 5 (`vue-router/vite`) with a `_parent.vue` layout. Example lockfiles are in sync with their package.json again.
- CI: package tests on Windows and macOS, type contracts across TypeScript versions, and the E2E workflow (replacing the build-only demos workflow); Dependabot also updates npm tooling, examples and the website.

### Fixed

- Vue Router 5 file-based routing: `_parent.vue` is a non-matchable parent and no longer produces a phantom route such as `users._parent`.
- The watcher ignores the temporary file of the generated module's atomic write, so writing the module no longer triggers an extra regeneration.
- Modules generated by the former `@triooo/next-named-routes` package are recognized as generated and replaced instead of failing with "Refusing to overwrite".
- CLI help and documentation no longer describe `named-routes` as an alias of itself; React Router 8 and Vue Router 5 are named where the demos use them; SPEC marks 1.0.0 as published.

## 1.0.0

- Stable v1 contract for automatic names, URL generation, typed parameters, CLI commands, the Next config wrapper and the Vite plugin.
- Framework adapters: Next.js (App Router and Pages Router), Nuxt (pages and Nitro server routes), Vue Router file-based routing, SvelteKit, Astro, React Router / Remix flat routes and TanStack Router, plus a `manual` mode for routes declared in code. The framework is detected from package.json.
- `@triooo/named-routes/vite`: `namedRoutes()` generates on start/build and follows file additions and removals through Vite's watcher.
- i18n from v1: `locale` option, `forLocale()`, `locales()`, `localePrefix` (always, as-needed, never, custom prefixes), localized `pathnames`, locale `domains`, automatic `[locale]`/`[lang]` folder stripping, physical locale folders, unlocalized endpoints and a typed `RouteLocale`. The options mirror next-intl's `defineRouting()`; Next.js Pages Router `i18n` is inherited automatically.
- New pattern features: optional single parameters `[[id]]`, mixed segments such as `v[major]-[minor]` and catch-all segments before static segments.
- Configuration: `named-routes.config.ts/.mts/.mjs/.js/.cjs/.json`, `defineConfig`, `routesDir`, `appDir`/`pagesDir`, `exclude` globs, `naming` (separator, parameter prefix, home name, transform), `importSource`, `exportNames` and `.ts/.mts/.js/.mjs` outputs. Unknown options fail with `INVALID_CONFIG`.
- CLI binary `named-routes` (alias `named-routes`) with `init`, `--framework`, `--routes-dir`, `--watch-interval` and `--version`.
- Safety: `next start` never writes the manifest (read-only deployments); only public `basePath`, `trailingSlash`, `origin` and i18n settings are serialized into the generated module; temporary files are created exclusively; `importSource` and export names are validated before being written into code.
- Release verification installs the actual tarball into a clean consumer and checks its runtime, CLI, exports, packlist and TypeScript contracts; real Next.js and Vite smoke tests run in CI.
- Documentation and website in English, Portuguese, Spanish and Japanese (`docs/locales.json`), with `scripts/sync-locales.mjs` (`pnpm locales`, `pnpm locales:check`) keeping every language in sync in CI and one README per language.
- Comparison page with alternative packages and framework-native typed routing, based on their published documentation and npm data.
- Documentation website (`website/`, deployable to Vercel) redesigned around a transit metaphor: departure board, interactive network map, honest compatibility table and animated pages; new route-line "N" logo. Runnable demos for every supported framework live in `examples/`.
