# 型付きクエリを使用

Topic: `query-schema-use` · Named Routes v2.2.0

products と search のスキーマを設定して再生成します。TypeScript は未知のキーや必須値の不足を検出します。

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
