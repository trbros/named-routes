# Changelog

## 1.0.0

- Stable v1 contract for automatic names, URL generation, typed parameters, CLI commands, the Next config wrapper and the Vite plugin.
- Framework adapters: Next.js (App Router and Pages Router), Nuxt (pages and Nitro server routes), Vue Router file-based routing, SvelteKit, Astro, React Router / Remix flat routes and TanStack Router, plus a `manual` mode for routes declared in code. The framework is detected from package.json.
- `@triooo/next-named-routes/vite`: `namedRoutes()` generates on start/build and follows file additions and removals through Vite's watcher.
- i18n from v1: `locale` option, `forLocale()`, `locales()`, `localePrefix` (always, as-needed, never, custom prefixes), localized `pathnames`, locale `domains`, automatic `[locale]`/`[lang]` folder stripping, physical locale folders, unlocalized endpoints and a typed `RouteLocale`. The options mirror next-intl's `defineRouting()`; Next.js Pages Router `i18n` is inherited automatically.
- New pattern features: optional single parameters `[[id]]`, mixed segments such as `v[major]-[minor]` and catch-all segments before static segments.
- Configuration: `named-routes.config.ts/.mts/.mjs/.js/.cjs/.json`, `defineConfig`, `routesDir`, `appDir`/`pagesDir`, `exclude` globs, `naming` (separator, parameter prefix, home name, transform), `importSource`, `exportNames` and `.ts/.mts/.js/.mjs` outputs. Unknown options fail with `INVALID_CONFIG`.
- CLI binary `named-routes` (alias `next-named-routes`) with `init`, `--framework`, `--routes-dir`, `--watch-interval` and `--version`.
- Safety: `next start` never writes the manifest (read-only deployments); only public `basePath`, `trailingSlash`, `origin` and i18n settings are serialized into the generated module; temporary files are created exclusively; `importSource` and export names are validated before being written into code.
- Release verification installs the actual tarball into a clean consumer and checks its runtime, CLI, exports, packlist and TypeScript contracts; real Next.js and Vite smoke tests run in CI.
- Documentation and website in English, Portuguese, Spanish and Japanese (`docs/locales.json`), with `scripts/sync-locales.mjs` (`pnpm locales`, `pnpm locales:check`) keeping every language in sync in CI and one README per language.
- Comparison page with alternative packages and framework-native typed routing, based on their published documentation and npm data.
- Documentation website (`website/`, deployable to Vercel) redesigned around a transit metaphor: departure board, interactive network map, honest compatibility table and animated pages; new route-line "N" logo. Runnable demos for every supported framework live in `examples/`.
