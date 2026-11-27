# route.withQuery()

[Documentation](index.md) / [Typed queries & URL updates](queries.md)

[English](../en/topic-helper-with-query.md) · [Português](../pt/topic-helper-with-query.md) · [Español](../es/topic-helper-with-query.md) · [日本語](../ja/topic-helper-with-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-query"></a>

Update a root-relative or HTTP(S) URL without recreating its path or hash. Set null or [] to remove a key, undefined to preserve it, and an array to replace repeated values. Unchanged repeated values remain. Query encoding is normalized by URLSearchParams. Pass { name, basePath: true } when validating a known prefixed route; named patches use the route query input type. When a runtime schema is available for the matched route, the complete resulting query is validated. Type-only schemas do not validate at runtime.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```

---

← Previous: [route.parseQuery()](topic-helper-parse-query.md) · [All topics](queries.md)
