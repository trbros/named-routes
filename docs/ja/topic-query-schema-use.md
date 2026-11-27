# 型付きクエリを使用

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-query-schema-use.md) · [Português](../pt/topic-query-schema-use.md) · [Español](../es/topic-query-schema-use.md) · [日本語](../ja/topic-query-schema-use.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-use"></a>

products と search のスキーマを設定して再生成します。TypeScript は未知のキーや必須値の不足を検出します。

## 例

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

## 関連トピック

- [型付きのクエリパラメーター](topic-typed-query.md)
- [クエリスキーマを接続](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← 前へ: [クエリスキーマを接続](topic-query-schema-config.md) · [全トピック](queries.md) · 次へ: [defineQuery()](topic-helper-define-query.md) →
