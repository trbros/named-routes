# Guides · @triooo/next-named-routes

[← Back to README](../../README.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Discovery edge cases](#discovery)
- [Automatic development updates](#development)
- [CLI and CI](#cli)
- [Errors and troubleshooting](#errors)
- [Rewrites and boundaries](#boundaries)

<a id="discovery"></a>

## Discovery edge cases

Next.js: the scanner considers app and pages together. The root app directory takes precedence over src/app, independently of the same pages/src/pages rule. Other frameworks use their standard folders (Nuxt app/pages or pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes) unless routesDir is set. Directory symlinks, hidden folders and node_modules are not followed; .d.ts files are ignored.

App Router: only page files are included by default. Groups and slots do not compose URLs. Interceptions are resolved to canonical paths and equivalent variants are consolidated. Private _ folders are ignored; %5F produces a public underscore. Layout, loading, default, error and metadata files are excluded.

Pages Router: root _app, _document and _error are excluded; other underscore pages remain valid. index is removed. API Routes, Route Handlers and other frameworks' endpoints are opt-in through includeApi or --api. URLs do not model HTTP methods, permissions or endpoint validation.

Conflicting URL shapes (for example [id] and [slug] at the same place) and inferred name collisions fail generation. In Next.js, duplicate canonical URLs and optional catch-all specificity conflicts also fail, as they do in Next. In nested-layout routers (Nuxt, Vue, React Router, TanStack), a layout and its index sharing a URL merge into one route.

<a id="development"></a>

## Automatic development updates

Next.js: the wrapper generates before Next starts, then runs a serialized polling watcher inside the development process. It sees additions, removals and renamed pages; the module changes only when its content changes. No webpack or Turbopack hooks are patched. It never writes during next start (production server), so read-only deployments are safe.

Vite frameworks: the plugin generates in buildStart and reacts to add/unlink events from Vite's watcher, plus changes to the named-routes config file. It finds the project root by walking up from Vite's root to package.json, so Nuxt's srcDir works.

Watchers do not run during production builds and do not keep the process alive by themselves. A generation error during editing preserves the last valid module and logs the error. Changes to modules imported by the config need a restart. watch: false disables only ongoing updates, not initial generation.

<a id="cli"></a>

## CLI and CI

The binary is named-routes (next-named-routes is an alias). generate (default) writes the manifest. list prints discovered entries as JSON. check compares without writing and exits with code 1 when stale. watch generates initially and polls until SIGINT/SIGTERM. init writes named-routes.config.mjs for the detected framework and never overwrites an existing config.

Flags: --root <directory>, --config <file>, --framework <name>, --output <file>, --routes-dir <dir>, --router <auto|app|pages>, --api, --watch-interval <ms>, --version (-v), --help (-h). Run commands from the consumer with the local package installed.

If you commit the generated file, run check before the build. The integrations regenerate at build time, so a check run after that build cannot detect a previously stale committed file. Generation is deterministic, atomic and timestamp-free. Existing files without the generator signature are never overwritten.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```

<a id="errors"></a>

## Errors and troubleshooting

NamedRouteError extends Error and exposes a stable code. UNKNOWN_ROUTE means the name is absent; MISSING_PARAMETER means a required value was omitted; UNKNOWN_PARAMETER means an extra key belongs in query or is misspelled; INVALID_PARAMETER means a value has the wrong shape or contains a forbidden segment; INVALID_LOCALE means a locale was passed without i18n or is not configured.

INVALID_PATTERN, INVALID_NAME and INVALID_MANIFEST identify malformed route definitions. INVALID_OPTIONS, INVALID_QUERY and INVALID_HASH identify invalid options. INVALID_BASE_PATH, INVALID_ORIGIN and INVALID_I18N reject URL defaults. MISSING_ORIGIN requires an origin before requesting absolute URLs. GENERATION_ERROR covers discovery conflicts, unsafe output and stale check results; INVALID_CONFIG covers missing, malformed or misspelled configuration.

Cannot find routes.generated: confirm the integration runs, run generate, and check output/import aliases. Duplicate basePath or locale: use plain relative URLs with framework links and pass basePath/locale only for plain URLs. Stale names: confirm the watcher is enabled and inspect terminal errors. A type error after moving a page is expected: update the inferred name or define a stable override.

Generation refuses to overwrite a handwritten output file. Choose a different output rather than adding a generated signature to unrelated code. Keep generated output outside routable files. Dynamic interpolation does not authorize a request; validate permissions and application input at the destination.

```ts
import { NamedRouteError } from "@triooo/next-named-routes";
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

Redirects, rewrites, middleware-based locale detection and paths declared in component code remain application concerns. Explicitly map any external or rewritten pattern you need with extraRoutes, and avoid applying locale or basePath twice. The scanner does not read framework config files; use withNamedRoutes or options to pass settings.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Previous: [API reference](api-reference.md) · [Back to README](../../README.md) · Next: [Project](project.md) →
