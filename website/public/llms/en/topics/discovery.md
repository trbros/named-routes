# Discovery edge cases

Topic: `discovery` · Named Routes v2.2.0

Next.js: the scanner considers app and pages together. The root app directory takes precedence over src/app, independently of the same pages/src/pages rule. Other frameworks use their standard folders (Nuxt app/pages or pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) unless routesDir is set. Directory symlinks, hidden folders and node_modules are not followed; .d.ts files are ignored.

App Router: only page files are included by default. Groups and slots do not compose URLs. Interceptions are resolved to canonical paths and equivalent variants are consolidated. Private _ folders are ignored; %5F produces a public underscore. Layout, loading, default, error and metadata files are excluded.

Pages Router: root _app, _document and _error are excluded; other underscore pages remain valid. index is removed. API Routes, Route Handlers and other frameworks' endpoints are opt-in through includeApi or --api. URLs do not model HTTP methods, permissions or endpoint validation.

Conflicting URL shapes (for example [id] and [slug] at the same place) and inferred name collisions fail generation. In Next.js, duplicate canonical URLs and optional catch-all specificity conflicts also fail, as they do in Next. In nested-layout routers (Nuxt, Vue, React Router, TanStack), a layout and its index sharing a URL merge into one route.

With framework discovery, the framework's table replaces the page scan; endpoints (includeApi) are still read from their folders, exclude still applies to the reported files, and aliases (Nuxt alias) get their own names. named-routes doctor lists every route that exists in only one of the two views, so you can see what definePageMeta, definePage or routes.ts changed.
