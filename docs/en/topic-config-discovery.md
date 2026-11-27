# Discovery & directories

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-discovery.md) · [Português](../pt/topic-config-discovery.md) · [Español](../es/topic-config-discovery.md) · [日本語](../ja/topic-config-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-discovery"></a>

Use framework: auto (default) or an explicit framework. discovery: framework reads a published table where supported; files forces the convention scanner. Next has router, appDir and pagesDir; other frameworks use routesDir. pageExtensions and exclude customize scanning. root is relative to the config file when configured there.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

## Related topics

- [Discovery edge cases](topic-discovery.md)
- [How generation works](topic-architecture.md)
- [Automatic naming rules](topic-naming.md)

---

← Previous: [Generator configuration](topic-configuration.md) · [All topics](api-reference.md) · Next: [Generated output & exports](topic-config-output.md) →
