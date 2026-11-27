# Use typed queries

[Documentation](index.md) / [Typed queries & URL updates](queries.md)

[English](../en/topic-query-schema-use.md) · [Português](../pt/topic-query-schema-use.md) · [Español](../es/topic-query-schema-use.md) · [日本語](../ja/topic-query-schema-use.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-use"></a>

After configuring the products and search schemas in the typed query guide, regenerate the module. TypeScript rejects unknown keys and requires mandatory query parameters.

## Example

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

## Related topics

- [Typed query parameters](topic-typed-query.md)
- [Connect a query schema](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Previous: [Connect a query schema](topic-query-schema-config.md) · [All topics](queries.md) · Next: [defineQuery()](topic-helper-define-query.md) →
