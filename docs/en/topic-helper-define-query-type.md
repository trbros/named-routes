# defineQuery.type<T>()

[Documentation](index.md) / [Typed queries & URL updates](queries.md)

[English](../en/topic-helper-define-query-type.md) · [Português](../pt/topic-helper-define-query-type.md) · [Español](../es/topic-helper-define-query-type.md) · [日本語](../ja/topic-helper-define-query-type.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query-type"></a>

Declare a query contract using TypeScript only. It adds no runtime validator. Do not trust user-provided URL values without validating them separately.

## Example

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

## Related topics

- [defineQuery()](topic-helper-define-query.md)
- [Typed query parameters](topic-typed-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Previous: [defineQuery()](topic-helper-define-query.md) · [All topics](queries.md) · Next: [route.parseQuery()](topic-helper-parse-query.md) →
