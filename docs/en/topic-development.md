# Automatic development updates

[Documentation](index.md) / [CLI, CI & troubleshooting](guides.md)

[English](../en/topic-development.md) · [Português](../pt/topic-development.md) · [Español](../es/topic-development.md) · [日本語](../ja/topic-development.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="development"></a>

Next.js: the wrapper generates before Next starts, then keeps the module current inside the development process. By default (watchMode: "auto") it reacts to file events from the route directories and the project root, debounced and serialized, plus a rescan every 5 seconds for events the OS dropped. It sees additions, removals and renamed pages; the module changes only when its content changes. No webpack or Turbopack hooks are patched. It never writes during next start (production server), so read-only deployments are safe.

Vite frameworks: the plugin generates in buildStart, once more before the module is first loaded (after the framework has written its route table), and reacts to add/unlink events from Vite's watcher, changes to the named-routes config file and rewrites of typed-router.d.ts, routeTree.gen.ts or app/routes.ts. It finds the project root by walking up from Vite's root to package.json. The Nuxt module regenerates on every pages:resolved, which Nuxt calls when pages change.

Watchers do not run during production builds and do not keep the process alive by themselves. A generation error during editing preserves the last valid module and logs the error. Changes to modules imported by the config need a restart. The config file itself is re-imported only when its content changes; Node.js cannot unload ES modules, so each distinct version of a JavaScript or TypeScript config stays in memory (the config module only, not what it imports) until the process restarts. watch: false disables only ongoing updates, not initial generation.

Where file events are unreliable, polling takes over: WSL paths under /mnt, WATCHPACK_POLLING or CHOKIDAR_USEPOLLING set, NAMED_ROUTES_WATCH=poll, or the OS refusing watchers (for example EMFILE or ENOSPC, reported once). watchMode: "poll" restores the 1.0 behavior (a full rescan every watchInterval). In a reproducible benchmark (pnpm bench:watch, Linux, Node 26) with 200 routes, idle CPU fell from 36 to 6 ms per second and a new page reached the module in 90 ms instead of 478 ms; with 2000 routes, from 153 to 29 ms per second and 203 ms instead of 582 ms.

---

← Previous: [Discovery edge cases](topic-discovery.md) · [All topics](guides.md) · Next: [Errors and troubleshooting](topic-errors.md) →
