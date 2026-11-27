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
