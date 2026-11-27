# route.withQuery()

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-helper-with-query.md) · [Português](../pt/topic-helper-with-query.md) · [Español](../es/topic-helper-with-query.md) · [日本語](../ja/topic-helper-with-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-query"></a>

Atualize uma URL relativa à raiz ou HTTP(S) sem reconstruir o caminho ou hash. Use null ou [] para remover, undefined para preservar e arrays para substituir valores repetidos. Os demais valores repetidos permanecem. URLSearchParams normaliza a codificação. Passe { name, basePath: true } ao validar uma rota conhecida com prefixo; patches nomeados usam o tipo do schema. Quando existe schema runtime para a rota encontrada, a query completa é validada. Schemas apenas de tipos não validam em runtime.

## Exemplo

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

---

← Anterior: [route.parseQuery()](topic-helper-parse-query.md) · [Todos os tópicos](queries.md)
