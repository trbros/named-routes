# Generator & tooling API

# Programmatic generator API

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(options?) returns root, framework, directories, routes, entries and the runtime defaults without writing. Each entry has name, path, file, router, framework and optionally variant and localized. Explicit extra routes have file: null and router: explicit.

generateRoutes(options?, { check?: boolean }?) additionally returns output and changed. check mode rejects stale output without modifying it. validateOptions(options) throws INVALID_CONFIG for unknown keys. Import /generator and /config only in Node tooling, never in client code. withNamedRoutes comes from /next and namedRoutes from /vite.

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
---

# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Node tooling only: discover route entries without writing the output file. Inspect entries, framework and discovery metadata.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
---

# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Node tooling only: discover and write the generated module. With check: true, reject a stale output without modifying it. Returns output and changed as well as discovery information.

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
---

# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Validate generator options in Node tooling. Unknown keys or invalid values throw INVALID_CONFIG. defineConfig is the typed config authoring helper; actual generation validates the runtime input.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
