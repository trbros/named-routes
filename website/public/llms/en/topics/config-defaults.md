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
