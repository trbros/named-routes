# Programmatic generator API

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(options?) returns root, framework, directories, routes, entries and the runtime defaults without writing. Each entry has name, path, file, router, framework and optionally variant and localized. Explicit extra routes have file: null and router: explicit.

generateRoutes(options?, { check?: boolean }?) additionally returns output and changed. check mode rejects stale output without modifying it. validateOptions(options) throws INVALID_CONFIG for unknown keys. Import /generator and /config only in Node tooling, never in client code. withNamedRoutes comes from /next and namedRoutes from /vite.

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
