# Runtime API reference

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, assetBase, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
