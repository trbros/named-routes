# Query strings

Topic: `query-hash` · Named Routes v2.2.0

Passe query nas opções para adicionar chaves e valores. Números e booleanos são serializados; arrays repetem a chave; null e undefined são omitidos. Query é diferente de params. Schemas tipados são opcionais.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
