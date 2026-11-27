# Query strings

Topic: `query-hash` · Named Routes v2.2.0

Pass query in options to append key/value pairs. Numbers and booleans are serialized; arrays repeat the key; null and undefined are omitted. Query fields are distinct from path params. Typed schemas are optional.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
