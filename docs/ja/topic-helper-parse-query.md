# route.parseQuery()

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-helper-parse-query.md) · [Português](../pt/topic-helper-parse-query.md) · [Español](../es/topic-helper-parse-query.md) · [日本語](../ja/topic-helper-parse-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-query"></a>

`route.parseQuery(name, input)` は URL やクエリ文字列からクエリを読み、`ok` を含む結果を返します。実行時の Standard Schema は値を変換・検証し、型のみのスキーマは生の値を返します。生成モジュールでは `query` と `validateQuery: true` を指定します。Zod は利用側の任意依存です。検証失敗時の値を利用しないでください。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```

---

← 前へ: [defineQuery.type<T>()](topic-helper-define-query-type.md) · [全トピック](queries.md) · 次へ: [route.withQuery()](topic-helper-with-query.md) →
