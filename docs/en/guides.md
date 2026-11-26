# Guides · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Discovery edge cases](#discovery)
- [Automatic development updates](#development)
- [CLI and CI](#cli)
- [Diagnostics: named-routes doctor](#doctor)
- [Errors and troubleshooting](#errors)
- [Rewrites and boundaries](#boundaries)

<a id="discovery"></a>

## Discovery edge cases

Next.js: the scanner considers app and pages together. The root app directory takes precedence over src/app, independently of the same pages/src/pages rule. Other frameworks use their standard folders (Nuxt app/pages or pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) unless routesDir is set. Directory symlinks, hidden folders and node_modules are not followed; .d.ts files are ignored.

App Router: only page files are included by default. Groups and slots do not compose URLs. Interceptions are resolved to canonical paths and equivalent variants are consolidated. Private _ folders are ignored; %5F produces a public underscore. Layout, loading, default, error and metadata files are excluded.

Pages Router: root _app, _document and _error are excluded; other underscore pages remain valid. index is removed. API Routes, Route Handlers and other frameworks' endpoints are opt-in through includeApi or --api. URLs do not model HTTP methods, permissions or endpoint validation.

Conflicting URL shapes (for example [id] and [slug] at the same place) and inferred name collisions fail generation. In Next.js, duplicate canonical URLs and optional catch-all specificity conflicts also fail, as they do in Next. In nested-layout routers (Nuxt, Vue, React Router, TanStack), a layout and its index sharing a URL merge into one route.

With framework discovery, the framework's table replaces the page scan; endpoints (includeApi) are still read from their folders, exclude still applies to the reported files, and aliases (Nuxt alias) get their own names. named-routes doctor lists every route that exists in only one of the two views, so you can see what definePageMeta, definePage or routes.ts changed.

<a id="development"></a>

## Automatic development updates

Next.js: the wrapper generates before Next starts, then keeps the module current inside the development process. By default (watchMode: "auto") it reacts to file events from the route directories and the project root, debounced and serialized, plus a rescan every 5 seconds for events the OS dropped. It sees additions, removals and renamed pages; the module changes only when its content changes. No webpack or Turbopack hooks are patched. It never writes during next start (production server), so read-only deployments are safe.

Vite frameworks: the plugin generates in buildStart, once more before the module is first loaded (after the framework has written its route table), and reacts to add/unlink events from Vite's watcher, changes to the named-routes config file and rewrites of typed-router.d.ts, routeTree.gen.ts or app/routes.ts. It finds the project root by walking up from Vite's root to package.json. The Nuxt module regenerates on every pages:resolved, which Nuxt calls when pages change.

Watchers do not run during production builds and do not keep the process alive by themselves. A generation error during editing preserves the last valid module and logs the error. Changes to modules imported by the config need a restart. The config file itself is re-imported only when its content changes; Node.js cannot unload ES modules, so each distinct version of a JavaScript or TypeScript config stays in memory (the config module only, not what it imports) until the process restarts. watch: false disables only ongoing updates, not initial generation.

Where file events are unreliable, polling takes over: WSL paths under /mnt, WATCHPACK_POLLING or CHOKIDAR_USEPOLLING set, NAMED_ROUTES_WATCH=poll, or the OS refusing watchers (for example EMFILE or ENOSPC, reported once). watchMode: "poll" restores the 1.0 behavior (a full rescan every watchInterval). In a reproducible benchmark (pnpm bench:watch, Linux, Node 26) with 200 routes, idle CPU fell from 36 to 6 ms per second and a new page reached the module in 90 ms instead of 478 ms; with 2000 routes, from 153 to 29 ms per second and 203 ms instead of 582 ms.

<a id="cli"></a>

## CLI and CI

The binary is named-routes. generate (default) writes the manifest. list prints discovered entries as JSON. check compares without writing and exits with code 1 when stale. watch generates initially and keeps the module current until SIGINT/SIGTERM (file events with a rescan, or polling with --watch-mode poll). init writes named-routes.config.mjs for the detected framework and never overwrites an existing config. doctor diagnoses the project without writing (see Diagnostics).

Flags: --root <directory>, --config <file>, --framework <name>, --output <file>, --routes-dir <dir>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict, --no-color and --v2 (doctor), --to and --write (migrate), --version (-v), --help (-h). Run commands from the consumer with the local package installed. Errors print their code and, when known, the file, route, option and a fix.

If you commit the generated file, run check before the build. The integrations regenerate at build time, so a check run after that build cannot detect a previously stale committed file. Generation is deterministic, atomic and timestamp-free. Existing files without the generator signature are never overwritten.

migrate --to 2 prepares a 1.x project for 2.0: it pins hrefs: "string" and, when the framework's routes differ from the file scan, discovery: "files" in the named-routes config (creating named-routes.config.mjs when there is none), so the generated module stays the same until you remove the pins. It is a dry run unless you pass --write, and it never edits framework configs or application code. doctor --v2 lists the rest (Node.js, TypeScript, moduleResolution, error codes).

Use npx @triooo/named-routes generate for a standalone invocation or npm exec -- named-routes generate with the package installed. The unscoped named-routes package is unrelated. --base-path /docs overrides the router base for this invocation; --base-path / clears it.

**Base override.** --base-path <path> is supported by generation/check/watch and doctor. It overrides cached framework base and the shared default for that invocation; / clears the base. Framework integration snapshots are generated metadata, not source files.

```sh
# Run with the scoped package name (standalone or installed)
npx @triooo/named-routes init
npx @triooo/named-routes generate --root ./apps/web
npx @triooo/named-routes list --framework sveltekit
npx @triooo/named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx @triooo/named-routes generate --base-path /app
npx @triooo/named-routes check --base-path /app
npx @triooo/named-routes generate --base-path / # clear the prefix
npx @triooo/named-routes watch
npx @triooo/named-routes --help
npx @triooo/named-routes watch --watch-mode poll
npx @triooo/named-routes doctor --json --strict
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2 --write
# With the package installed locally:
npm exec -- named-routes generate
npx @triooo/named-routes audit --strict --json
```

<a id="doctor"></a>

## Diagnostics: named-routes doctor

npx @triooo/named-routes doctor checks the Node.js and TypeScript versions, the configuration file, the detected framework, discovered routes, conflicts and name collisions, whether the generated module exists and is current, the Next.js or Vite integration, typedRoutes without typed hrefs, i18n without localized routes, and route declarations the file scanner cannot see (Nuxt definePageMeta({ path }) and route() calls in a React Router app/routes.ts).

It is read-only: it never writes files and never executes application code. Integration and declaration checks are plain-text heuristics and say so. Options passed inline to a plugin are code, so doctor reports them as not visible; move shared options to named-routes.config.* or pass flags such as --output.

Each diagnostic is error, warning or info, with a stable id and, when known, the file, route, option and a fix. --json prints a machine-readable report for CI and --strict also fails on warnings; colors are used only on a TTY and never with NO_COLOR or --no-color. Exit code 0 means no errors; 1 means errors, or warnings with --strict.

It also says where the routes came from (the framework's table or the files, and why it fell back) and lists the routes that exist in only one of the two views. doctor --v2 adds what a project written for 1.x must change for 2.0: typed hrefs, routes that framework discovery changes, a moduleResolution that cannot read the package's exports, and code that compares error codes with GENERATION_ERROR.

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```

<a id="errors"></a>

## Errors and troubleshooting

NamedRouteError extends Error and exposes a stable code. UNKNOWN_ROUTE means the name is absent; MISSING_PARAMETER means a required value was omitted; UNKNOWN_PARAMETER means an extra key belongs in query or is misspelled; INVALID_PARAMETER means a value has the wrong shape or contains a forbidden segment; INVALID_LOCALE means a locale was passed without i18n or is not configured.

INVALID_PATTERN, INVALID_NAME and INVALID_MANIFEST identify malformed route definitions. INVALID_OPTIONS, INVALID_QUERY and INVALID_HASH identify invalid options. INVALID_BASE_PATH, INVALID_ORIGIN and INVALID_I18N reject URL defaults. MISSING_ORIGIN requires an origin before requesting absolute URLs. GENERATION_ERROR covers discovery conflicts, routes that cannot be named and stale check results; INVALID_CONFIG covers every invalid option: missing, malformed or misspelled configuration, router, pageExtensions, discovery and output.

Cannot find routes.generated: confirm the integration runs, run generate, and check output/import aliases. Duplicate basePath or locale: use plain relative URLs with framework links and pass basePath/locale only for plain URLs. Stale names: confirm the watcher is enabled and inspect terminal errors. A type error after moving a page is expected: update the inferred name or define a stable override.

Generation refuses to overwrite a handwritten output file. Choose a different output rather than adding a generated signature to unrelated code. Keep generated output outside routable files. Dynamic interpolation does not authorize a request; validate permissions and application input at the destination.

Since 1.1 every NamedRouteError also has details: { file, files, route, pattern, option, hint } with whatever is known, for example both files of a route conflict or "Did you mean users.show?" for a misspelled name, option or names key. INVALID_QUERY means a query failed its schema or a schema map is invalid; INVALID_URL means match() received something that is not a path or URL. Since 2.0 invalid router, pageExtensions and output values raise INVALID_CONFIG (GENERATION_ERROR in 1.x); messages are unchanged.

For static-file 404s, check the actual deployment path and the public directory. `asset()` uses the configured asset base, not the bundler output or the current request. `INVALID_ASSET_BASE`, `INVALID_ASSET` and `INVALID_OPTIONS` identify invalid prefixes, paths and options.

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

<a id="boundaries"></a>

## Rewrites and boundaries

This is a URL builder, not a replacement router, middleware, authorization system or HTTP client. It does not create routes at runtime, validate resource existence, detect the visitor's locale or make backend requests.

Redirects, rewrites and middleware-based locale detection remain application concerns; paths declared in code are named only where the framework publishes its route table (see Other frameworks). Explicitly map any external or rewritten pattern you need with extraRoutes, and avoid applying locale or basePath twice. The scanner does not read framework config files; use withNamedRoutes or options to pass settings.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Previous: [API reference](api-reference.md) · [Back to README](../../README.md) · Next: [Project](project.md) →
