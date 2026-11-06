# Named routes demos

One small app per supported setup. Each links by name to a static page, a
dynamic `users` page and a catch-all `docs` page.

| Demo | Framework | Connected with |
| --- | --- | --- |
| `app-router` | Next.js App Router | `withNamedRoutes()` |
| `pages-router` | Next.js Pages Router | `withNamedRoutes()` |
| `nuxt` | Nuxt 4 | `namedRoutes()` in `vite.plugins` |
| `vue` | Vue + unplugin-vue-router | `namedRoutes()` |
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
