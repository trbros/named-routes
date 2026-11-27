# Cadenas de consulta

Topic: `query-hash` · Named Routes v2.2.0

Pasa query en las opciones. Los números y booleanos se serializan; los arrays repiten la clave; null y undefined se omiten. Los esquemas son opcionales.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
