# route.withQuery()

Topic: `helper-with-query` · Named Routes v2.2.0

Update a root-relative or HTTP(S) URL without recreating its path or hash. Set null or [] to remove a key, undefined to preserve it, and an array to replace repeated values. Unchanged repeated values remain. Query encoding is normalized by URLSearchParams. Pass { name, basePath: true } when validating a known prefixed route; named patches use the route query input type. When a runtime schema is available for the matched route, the complete resulting query is validated. Type-only schemas do not validate at runtime.

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
