# Usar queries tipadas

Topic: `query-schema-use` · Named Routes v2.2.0

Depois de configurar os schemas products e search do guia de query tipada, gere o módulo. O TypeScript rejeita chaves desconhecidas e exige os parâmetros obrigatórios.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
