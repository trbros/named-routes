# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` lee la query de una URL o cadena y devuelve un resultado con `ok`. Un Standard Schema en runtime convierte y valida valores; los esquemas solo de tipos devuelven valores sin procesar. En módulos generados usa `query` y `validateQuery: true`. Zod es una dependencia opcional del consumidor. No uses el valor si falla la validación.

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
