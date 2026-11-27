# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` は URL やクエリ文字列からクエリを読み、`ok` を含む結果を返します。実行時の Standard Schema は値を変換・検証し、型のみのスキーマは生の値を返します。生成モジュールでは `query` と `validateQuery: true` を指定します。Zod は利用側の任意依存です。検証失敗時の値を利用しないでください。

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
