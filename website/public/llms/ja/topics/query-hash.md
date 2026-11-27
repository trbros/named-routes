# クエリ文字列

Topic: `query-hash` · Named Routes v2.2.0

options.query に値を渡します。数値・真偽値は文字列化し、配列はキーを繰り返し、null と undefined は省略します。

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
