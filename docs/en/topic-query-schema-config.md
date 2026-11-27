# Connect a query schema

[Documentation](index.md) / [Typed queries & URL updates](queries.md)

[English](../en/topic-query-schema-config.md) · [Português](../pt/topic-query-schema-config.md) · [Español](../es/topic-query-schema-config.md) · [日本語](../ja/topic-query-schema-config.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-config"></a>

Point query at the module with the default defineQuery export. Enable validateQuery only when you want the runtime validator bundled; type-only schemas never validate values at runtime.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

## Related topics

- [Typed query parameters](topic-typed-query.md)
- [Use typed queries](topic-query-schema-use.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Previous: [Typed query parameters](topic-typed-query.md) · [All topics](queries.md) · Next: [Use typed queries](topic-query-schema-use.md) →
