# defineQuery()

[Documentation](index.md) / [Typed queries & URL updates](queries.md)

[English](../en/topic-helper-define-query.md) · [Português](../pt/topic-helper-define-query.md) · [Español](../es/topic-helper-define-query.md) · [日本語](../ja/topic-helper-define-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query"></a>

Use a per-route Standard Schema map. The helper preserves input and output types. A synchronous validator can be used for runtime validation; the schema package is your optional dependency.

## Example

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

## Related topics

- [Typed query parameters](topic-typed-query.md)
- [Connect a query schema](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Previous: [Use typed queries](topic-query-schema-use.md) · [All topics](queries.md) · Next: [defineQuery.type<T>()](topic-helper-define-query-type.md) →
