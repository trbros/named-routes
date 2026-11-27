# Query strings

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-query-hash.md) · [Português](../pt/topic-query-hash.md) · [Español](../es/topic-query-hash.md) · [日本語](../ja/topic-query-hash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-hash"></a>

Pass query in options to append key/value pairs. Numbers and booleans are serialized; arrays repeat the key; null and undefined are omitted. Query fields are distinct from path params. Typed schemas are optional.

## Example

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

## Related topics

- [Typed query parameters](topic-typed-query.md)
- [route.withQuery()](topic-helper-with-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [URL fragments (hash)](topic-hash-fragments.md)

---

← Previous: [Mixed route segments](topic-mixed-parameters.md) · [All topics](build-with-routes.md) · Next: [URL fragments (hash)](topic-hash-fragments.md) →
