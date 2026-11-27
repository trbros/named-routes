# Generated output & exports

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-output.md) · [Português](../pt/topic-config-output.md) · [Español](../es/topic-config-output.md) · [日本語](../ja/topic-config-output.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-output"></a>

output defaults to src/routes.generated.ts; use .ts, .mts, .js or .mjs outside a routable directory. exportNames renames generated exports; importSource changes the runtime import specifier. hrefs: typed is the default; string restores plain string return types.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

## Related topics

- [Read the generated manifest](topic-generated-source.md)
- [Typed hrefs for Next.js typedRoutes](topic-typed-hrefs.md)

---

← Previous: [Discovery & directories](topic-config-discovery.md) · [All topics](api-reference.md) · Next: [Naming conventions](topic-config-naming.md) →
