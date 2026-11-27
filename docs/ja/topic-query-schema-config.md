# クエリスキーマを接続

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-query-schema-config.md) · [Português](../pt/topic-query-schema-config.md) · [Español](../es/topic-query-schema-config.md) · [日本語](../ja/topic-query-schema-config.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-config"></a>

query に defineQuery の既定 export を持つモジュールを指定します。実行時検証には validateQuery を有効にします。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

## 関連トピック

- [型付きのクエリパラメーター](topic-typed-query.md)
- [型付きクエリを使用](topic-query-schema-use.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← 前へ: [型付きのクエリパラメーター](topic-typed-query.md) · [全トピック](queries.md) · 次へ: [型付きクエリを使用](topic-query-schema-use.md) →
