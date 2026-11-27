# Runtime API reference

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-runtime-api.md) · [Português](../pt/topic-runtime-api.md) · [Español](../es/topic-runtime-api.md) · [日本語](../ja/topic-runtime-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="runtime-api"></a>

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, assetBase, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

## Related topics

- [route()](topic-helper-route.md)
- [route.url() — public URLs](topic-public-url.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [route.match()](topic-helper-match.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [defineQuery()](topic-helper-define-query.md)
- [asset() / route.asset()](topic-assets.md)

---

[All topics](api-reference.md) · Next: [Generator configuration](topic-configuration.md) →
