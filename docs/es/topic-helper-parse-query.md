# route.parseQuery()

[Documentación](index.md) / [Consultas tipadas y actualización de URL](queries.md)

[English](../en/topic-helper-parse-query.md) · [Português](../pt/topic-helper-parse-query.md) · [Español](../es/topic-helper-parse-query.md) · [日本語](../ja/topic-helper-parse-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-query"></a>

`route.parseQuery(name, input)` lee la query de una URL o cadena y devuelve un resultado con `ok`. Un Standard Schema en runtime convierte y valida valores; los esquemas solo de tipos devuelven valores sin procesar. En módulos generados usa `query` y `validateQuery: true`. Zod es una dependencia opcional del consumidor. No uses el valor si falla la validación.

## Ejemplo

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

← Anterior: [defineQuery.type<T>()](topic-helper-define-query-type.md) · [Todos los temas](queries.md) · Siguiente: [route.withQuery()](topic-helper-with-query.md) →
