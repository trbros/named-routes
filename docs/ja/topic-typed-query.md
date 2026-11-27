# 型付きのクエリパラメーター

[ドキュメント](index.md) / [型付きクエリと URL 更新](queries.md)

[English](../en/topic-typed-query.md) · [Português](../pt/topic-typed-query.md) · [Español](../es/topic-typed-query.md) · [日本語](../ja/topic-typed-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typed-query"></a>

ルートごとのクエリスキーマを、export default が defineQuery({...}) のモジュールに宣言し、query オプションでそのモジュールを指定します。キーはルート名で、値は Standard Schema のバリデーター（Zod 3.24 以上、Valibot 1 以上、ArkType など）か、TypeScript の型だけを使う defineQuery.type<T>() です。スキーマのないルートは 1.0 のクエリのままです。

スキーマがあると、TypeScript は未知のキーや互換性のない値を拒否し、必須のキーがあれば options.query も必須になります。スキーマのライブラリが依存関係になることはありません。TypeScript の出力はモジュールを型としてだけインポートするので、何もバンドルされず、実行時の検証も行われません。

validateQuery: true にすると、スキーマをバンドルし、URL を組み立てるたびにクエリのオブジェクトを検証します。失敗すると問題点を含む INVALID_QUERY が投げられます。検証で URL が変わることはありません。値は渡したとおりにシリアライズされ、スキーマのデフォルト値や変換は適用されません。route() は同期関数なので、非同期のスキーマは拒否されます。JavaScript の出力では、型を推論するためにモジュールを値としてインポートします。Zod 4 と Valibot 1 には TypeScript 5.4 以上が必要です。

route.parseQuery(name, url) は、ルートのスキーマが実行時に使える場合（validateQuery: true、または createRoutes に渡したスキーマ）に、そのスキーマで URL のクエリを読み戻し、スキーマの出力型を持つ { ok: true, value } か { ok: false, issues } を返します。値は文字列で届きます。スキーマが拒否したキーについては、route() が数値や true/false 用に書き出した文字列を元に戻し、単一の値を配列にするので、同じスキーマで URL の生成と読み取りの両方ができます。実行時のスキーマがないルート（スキーマなし、defineQuery.type()、型としてだけ import したスキーマ）は生のクエリを返し、型もそれを示します。

## 例

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});
```

## 関連トピック

- [クエリスキーマを接続](topic-query-schema-config.md)
- [型付きクエリを使用](topic-query-schema-use.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [defineQuery()](topic-helper-define-query.md)

---

[全トピック](queries.md) · 次へ: [クエリスキーマを接続](topic-query-schema-config.md) →
