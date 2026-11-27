# Programmatic generator API

[Documentation](index.md) / [Generator & tooling API](generator.md)

[English](../en/topic-generator-api.md) · [Português](../pt/topic-generator-api.md) · [Español](../es/topic-generator-api.md) · [日本語](../ja/topic-generator-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-api"></a>

discoverRoutes(options?) returns root, framework, directories, routes, entries and the runtime defaults without writing. Each entry has name, path, file, router, framework and optionally variant and localized. Explicit extra routes have file: null and router: explicit.

generateRoutes(options?, { check?: boolean }?) additionally returns output and changed. check mode rejects stale output without modifying it. validateOptions(options) throws INVALID_CONFIG for unknown keys. Import /generator and /config only in Node tooling, never in client code. withNamedRoutes comes from /next and namedRoutes from /vite.

## Related topics

- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)
- [Generator configuration](topic-configuration.md)

---

[All topics](generator.md) · Next: [discoverRoutes()](topic-generator-discover.md) →
