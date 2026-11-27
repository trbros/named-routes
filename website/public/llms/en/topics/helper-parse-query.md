# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` reads query parameters from a URL or query string and returns a result with `ok`. A runtime Standard Schema converts and validates values; type-only schemas return raw values instead. In generated modules use `query` and `validateQuery: true` to include schemas at runtime. Zod below is an optional consumer dependency. Do not assume a failed result contains a valid value.

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
