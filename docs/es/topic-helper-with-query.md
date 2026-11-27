# route.withQuery()

[Documentación](index.md) / [Consultas tipadas y actualización de URL](queries.md)

[English](../en/topic-helper-with-query.md) · [Português](../pt/topic-helper-with-query.md) · [Español](../es/topic-helper-with-query.md) · [日本語](../ja/topic-helper-with-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-with-query"></a>

Actualiza una URL relativa a la raíz o HTTP(S) sin recrear la ruta ni el hash. Usa null o [] para eliminar, undefined para preservar y arrays para reemplazar valores repetidos. Los demás valores repetidos se conservan. URLSearchParams normaliza la codificación. Usa { name, basePath: true } para validar una ruta conocida con prefijo; el patch usa el tipo del esquema. Si hay esquema runtime para la ruta encontrada, se valida toda la query. Los esquemas solo de tipos no validan en runtime.

## Ejemplo

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

← Anterior: [route.parseQuery()](topic-helper-parse-query.md) · [Todos los temas](queries.md)
