# Errors and troubleshooting

Topic: `errors` · Named Routes v2.2.0

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
