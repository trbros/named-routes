# URL defaults

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-defaults.md) · [Português](../pt/topic-config-defaults.md) · [Español](../es/topic-config-defaults.md) · [日本語](../ja/topic-config-defaults.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-defaults"></a>

defaults contains basePath, includeBasePath, origin, trailingSlash and assetBase. These are public values serialized into the generated module. Explicit base settings override inherited framework values. Use a trusted origin, never credentials.

<a id="without-base"></a>
## Without base path

The application is served at the domain root. Do not configure a navigation prefix.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

<a id="with-base"></a>
## With base path

The application is served under /app. Configure the framework base before regenerating the routes.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [assetBase & CDN](topic-asset-base.md)
- [Absolute URLs & origin](topic-absolute-urls.md)

---

← Previous: [Naming conventions](topic-config-naming.md) · [All topics](api-reference.md) · Next: [Add explicit routes](topic-config-extra-routes.md) →
