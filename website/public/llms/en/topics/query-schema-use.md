# Use typed queries

Topic: `query-schema-use` · Named Routes v2.2.0

After configuring the products and search schemas in the typed query guide, regenerate the module. TypeScript rejects unknown keys and requires mandatory query parameters.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
