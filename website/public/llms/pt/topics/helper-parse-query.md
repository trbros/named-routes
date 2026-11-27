# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` lê a query de uma URL ou query string e retorna um resultado com `ok`. Um Standard Schema em runtime converte e valida valores; schemas apenas de tipo retornam os valores brutos. No módulo gerado, use `query` e `validateQuery: true` para incluir schemas em runtime. Zod abaixo é uma dependência opcional do consumidor. Não use o valor quando a validação falhar.

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
