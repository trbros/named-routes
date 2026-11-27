# Configuration & runtime reference

# Runtime API reference

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifest, defaults?) creates an independent frozen helper and snapshots the manifest. Defaults contains basePath, assetBase, trailingSlash, origin and i18n. parsePattern(pattern) returns static/dynamic/optionalDynamic/catchAll/optional/mixed segment records and validates route syntax; formatPattern is its inverse and patternParameters lists parameter names. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes and PatternSegment are exported types.

A manifest typed as a plain Record<string, string> (for example loaded from JSON) still works: names become string and parameters become a loose record, while the runtime keeps validating every call.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
---

# Generator configuration

Topic: `configuration` · Named Routes v2.2.0

A configuration file is optional. The integrations generate routes with defaults; add only the settings you need. Files are discovered in .ts, .mts, .mjs, .js, .cjs, .json order; use .mjs if Node cannot load TypeScript configs. defineConfig gives autocomplete and rejects unknown options during generation. The CLI --config selects another file.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
---

# Discovery & directories

Topic: `config-discovery` · Named Routes v2.2.0

Use framework: auto (default) or an explicit framework. discovery: framework reads a published table where supported; files forces the convention scanner. Next has router, appDir and pagesDir; other frameworks use routesDir. pageExtensions and exclude customize scanning. root is relative to the config file when configured there.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
---

# Generated output & exports

Topic: `config-output` · Named Routes v2.2.0

output defaults to src/routes.generated.ts; use .ts, .mts, .js or .mjs outside a routable directory. exportNames renames generated exports; importSource changes the runtime import specifier. hrefs: typed is the default; string restores plain string return types.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
---

# Naming conventions

Topic: `config-naming` · Named Routes v2.2.0

naming.style controls path or semantic names. separator, paramPrefix and home customize the path convention; transform can override an automatic name in a JavaScript or TypeScript config. names wins over automatic naming. Collisions fail generation.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
---

# URL defaults

Topic: `config-defaults` · Named Routes v2.2.0

defaults contains basePath, includeBasePath, origin, trailingSlash and assetBase. These are public values serialized into the generated module. Explicit base settings override inherited framework values. Use a trusted origin, never credentials.

## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
---

# Add explicit routes

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes maps a chosen name to a canonical pattern for a rewrite destination, manual manifest or external route known to your application. Unlike names, the URL need not be discovered. The package does not create a page or server route.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
---

# Enable API discovery

Topic: `config-api` · Named Routes v2.2.0

includeApi is false by default. Enable it to include endpoint URLs recognized by the adapter. Method descriptors are generated only where method declarations are statically identifiable. This is not OpenAPI generation or an authorization layer.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
---

# Watch & development options

Topic: `config-watch` · Named Routes v2.2.0

The integration handles updates during development. withNamedRoutes accepts watch, watchMode and watchInterval; use polling only when native events are unreliable. CLI watch supports --watch-mode poll. Restart the framework after changing its router base.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
