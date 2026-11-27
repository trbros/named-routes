# Add explicit routes

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-extra-routes.md) · [Português](../pt/topic-config-extra-routes.md) · [Español](../es/topic-config-extra-routes.md) · [日本語](../ja/topic-config-extra-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-extra-routes"></a>

extraRoutes maps a chosen name to a canonical pattern for a rewrite destination, manual manifest or external route known to your application. Unlike names, the URL need not be discovered. The package does not create a page or server route.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

## Related topics

- [Optional stable names](topic-stable-names.md)
- [Manual routes (React, Vue, any router)](topic-manual-routes.md)
- [Rewrites and boundaries](topic-boundaries.md)

---

← Previous: [URL defaults](topic-config-defaults.md) · [All topics](api-reference.md) · Next: [Enable API discovery](topic-config-api.md) →
