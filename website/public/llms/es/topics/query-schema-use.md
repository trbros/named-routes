# Usar consultas tipadas

Topic: `query-schema-use` · Named Routes v2.2.0

Tras configurar los esquemas products y search, regenera el módulo. TypeScript rechaza claves desconocidas y exige los parámetros obligatorios.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
