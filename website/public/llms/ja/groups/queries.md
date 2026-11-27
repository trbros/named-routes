# 型付きクエリと URL 更新

# 型付きのクエリパラメーター

Topic: `typed-query` · Named Routes v2.2.0

ルートごとのクエリスキーマを、export default が defineQuery({...}) のモジュールに宣言し、query オプションでそのモジュールを指定します。キーはルート名で、値は Standard Schema のバリデーター（Zod 3.24 以上、Valibot 1 以上、ArkType など）か、TypeScript の型だけを使う defineQuery.type<T>() です。スキーマのないルートは 1.0 のクエリのままです。

スキーマがあると、TypeScript は未知のキーや互換性のない値を拒否し、必須のキーがあれば options.query も必須になります。スキーマのライブラリが依存関係になることはありません。TypeScript の出力はモジュールを型としてだけインポートするので、何もバンドルされず、実行時の検証も行われません。

validateQuery: true にすると、スキーマをバンドルし、URL を組み立てるたびにクエリのオブジェクトを検証します。失敗すると問題点を含む INVALID_QUERY が投げられます。検証で URL が変わることはありません。値は渡したとおりにシリアライズされ、スキーマのデフォルト値や変換は適用されません。route() は同期関数なので、非同期のスキーマは拒否されます。JavaScript の出力では、型を推論するためにモジュールを値としてインポートします。Zod 4 と Valibot 1 には TypeScript 5.4 以上が必要です。

route.parseQuery(name, url) は、ルートのスキーマが実行時に使える場合（validateQuery: true、または createRoutes に渡したスキーマ）に、そのスキーマで URL のクエリを読み戻し、スキーマの出力型を持つ { ok: true, value } か { ok: false, issues } を返します。値は文字列で届きます。スキーマが拒否したキーについては、route() が数値や true/false 用に書き出した文字列を元に戻し、単一の値を配列にするので、同じスキーマで URL の生成と読み取りの両方ができます。実行時のスキーマがないルート（スキーマなし、defineQuery.type()、型としてだけ import したスキーマ）は生のクエリを返し、型もそれを示します。

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

Related topic IDs: query-schema-config, query-schema-use, helper-parse-query, helper-define-query
---

# クエリスキーマを接続

Topic: `query-schema-config` · Named Routes v2.2.0

query に defineQuery の既定 export を持つモジュールを指定します。実行時検証には validateQuery を有効にします。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
---

# 型付きクエリを使用

Topic: `query-schema-use` · Named Routes v2.2.0

products と search のスキーマを設定して再生成します。TypeScript は未知のキーや必須値の不足を検出します。

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

ルートごとの Standard Schema を指定します。入出力の型が保持され、同期バリデータで実行時検証できます。

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

TypeScript のみで契約を宣言します。実行時検証は行わないため、入力値は別途検証してください。

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
---

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
---

# route.withQuery()

Topic: `helper-with-query` · Named Routes v2.2.0

ルート相対または HTTP(S) URL のパスとハッシュを保持してクエリを更新します。null または [] で削除、undefined で保持、配列で繰り返し値を置換します。他の繰り返し値は保持され、URLSearchParams によってエンコードは正規化されます。プレフィックス付きの既知ルートを検証する場合は { name, basePath: true } を指定します。名前付きパッチはクエリ型を使います。ランタイムスキーマがある場合は更新後のクエリ全体を検証し、型のみのスキーマでは実行時検証しません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```
