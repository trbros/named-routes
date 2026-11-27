# defineQuery()

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-helper-define-query.md) · [Português](../pt/topic-helper-define-query.md) · [Español](../es/topic-helper-define-query.md) · [日本語](../ja/topic-helper-define-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query"></a>

ルートごとの Standard Schema を指定します。入出力の型が保持され、同期バリデータで実行時検証できます。

## 例

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

## 関連トピック

- [型付きのクエリパラメーター](topic-typed-query.md)
- [クエリスキーマを接続](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← 前へ: [型付きクエリを使用](topic-query-schema-use.md) · [全トピック](queries.md) · 次へ: [defineQuery.type<T>()](topic-helper-define-query-type.md) →
