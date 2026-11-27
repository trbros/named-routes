# defineQuery.type<T>()

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-helper-define-query-type.md) · [Português](../pt/topic-helper-define-query-type.md) · [Español](../es/topic-helper-define-query-type.md) · [日本語](../ja/topic-helper-define-query-type.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query-type"></a>

TypeScript のみで契約を宣言します。実行時検証は行わないため、入力値は別途検証してください。

## 例

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

## 関連トピック

- [defineQuery()](topic-helper-define-query.md)
- [型付きのクエリパラメーター](topic-typed-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← 前へ: [defineQuery()](topic-helper-define-query.md) · [全トピック](queries.md) · 次へ: [route.parseQuery()](topic-helper-parse-query.md) →
