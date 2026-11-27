# クエリ文字列

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-query-hash.md) · [Português](../pt/topic-query-hash.md) · [Español](../es/topic-query-hash.md) · [日本語](../ja/topic-query-hash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-hash"></a>

options.query に値を渡します。数値・真偽値は文字列化し、配列はキーを繰り返し、null と undefined は省略します。

## 例

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

## 関連トピック

- [型付きのクエリパラメーター](topic-typed-query.md)
- [route.withQuery()](topic-helper-with-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [URL フラグメント](topic-hash-fragments.md)

---

← 前へ: [混合セグメント](topic-mixed-parameters.md) · [全トピック](build-with-routes.md) · 次へ: [URL フラグメント](topic-hash-fragments.md) →
