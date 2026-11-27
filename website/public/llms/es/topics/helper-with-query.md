# route.withQuery()

Topic: `helper-with-query` · Named Routes v2.2.0

Actualiza una URL relativa a la raíz o HTTP(S) sin recrear la ruta ni el hash. Usa null o [] para eliminar, undefined para preservar y arrays para reemplazar valores repetidos. Los demás valores repetidos se conservan. URLSearchParams normaliza la codificación. Usa { name, basePath: true } para validar una ruta conocida con prefijo; el patch usa el tipo del esquema. Si hay esquema runtime para la ruta encontrada, se valida toda la query. Los esquemas solo de tipos no validan en runtime.

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
