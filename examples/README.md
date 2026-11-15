# Named routes demos

One small app per supported setup. Each links by name to a static page, a
dynamic `users` page and a catch-all `docs` page.

| Demo | Framework | Connected with |
| --- | --- | --- |
| `app-router` | Next.js App Router, `typedRoutes` + `hrefs: "typed"` | `withNamedRoutes()` |
| `pages-router` | Next.js Pages Router with i18n (`en`, `pt`) | `withNamedRoutes()` |
| `nuxt` | Nuxt 4 | `namedRoutes()` in `vite.plugins` |
| `vue` | Vue Router 5 file-based routing (`vue-router/vite`, `_parent.vue`) | `namedRoutes()` |
| `sveltekit` | SvelteKit | `namedRoutes()` |
| `astro` | Astro | `namedRoutes()` in `vite.plugins` |
| `react-router` | React Router 7 (flat routes) | `namedRoutes()` |
| `tanstack-router` | TanStack Router (file-based) | `namedRoutes()` |
| `react` | React + React Router, routes declared by hand | `createRoutes()` |

```sh
# Repository root, once (demos use the local package through file:../..)
pnpm install && pnpm build

# Any demo
cd examples/sveltekit
npm install
npm run dev
```

Create a page while the dev server runs and watch the generated
`routes.generated.ts` gain a new typed name. The Next.js demos use pnpm
(`pnpm install`) and are also exercised by `pnpm test:next`.

`pnpm test:e2e [demo...]` (repository root) copies each demo, installs the
packed tarball with the demo's real dependencies, type-checks, builds, serves
the production build, clicks the generated links in Chromium and creates,
renames and removes a page while the dev server runs. Keep each demo's
lockfile in sync with its package.json (`npm install --package-lock-only`).
