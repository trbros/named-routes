# route.withQuery()

Topic: `helper-with-query` · Named Routes v2.2.0

Atualize uma URL relativa à raiz ou HTTP(S) sem reconstruir o caminho ou hash. Use null ou [] para remover, undefined para preservar e arrays para substituir valores repetidos. Os demais valores repetidos permanecem. URLSearchParams normaliza a codificação. Passe { name, basePath: true } ao validar uma rota conhecida com prefixo; patches nomeados usam o tipo do schema. Quando existe schema runtime para a rota encontrada, a query completa é validada. Schemas apenas de tipos não validam em runtime.

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
