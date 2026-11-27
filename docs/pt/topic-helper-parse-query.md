# route.parseQuery()

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-helper-parse-query.md) · [Português](../pt/topic-helper-parse-query.md) · [Español](../es/topic-helper-parse-query.md) · [日本語](../ja/topic-helper-parse-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-query"></a>

`route.parseQuery(name, input)` lê a query de uma URL ou query string e retorna um resultado com `ok`. Um Standard Schema em runtime converte e valida valores; schemas apenas de tipo retornam os valores brutos. No módulo gerado, use `query` e `validateQuery: true` para incluir schemas em runtime. Zod abaixo é uma dependência opcional do consumidor. Não use o valor quando a validação falhar.

## Exemplo

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

← Anterior: [defineQuery.type<T>()](topic-helper-define-query-type.md) · [Todos os tópicos](queries.md) · Próximo: [route.withQuery()](topic-helper-with-query.md) →
