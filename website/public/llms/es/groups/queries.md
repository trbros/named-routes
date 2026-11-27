# Consultas tipadas y actualización de URL

# Parámetros de query tipados

Topic: `typed-query` · Named Routes v2.2.0

Declara schemas de query por ruta en un módulo cuyo export default es defineQuery({...}) y apunta la opción query a él. Las claves son nombres de ruta; los valores son validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType y otros) o defineQuery.type<T>() para tipos solo de TypeScript. Las rutas sin schema conservan la query de la 1.0.

Con un schema, TypeScript rechaza claves desconocidas y valores incompatibles, y las claves obligatorias hacen obligatorio options.query. Ninguna biblioteca de schemas se convierte en dependencia: las salidas TypeScript importan el módulo solo como tipos, así que no se empaqueta nada ni se valida nada en runtime.

Define validateQuery: true para empaquetar los schemas y validar cada objeto de query al construir una URL; los fallos lanzan INVALID_QUERY con los problemas encontrados. La validación nunca cambia la URL: los valores se serializan tal como los pasas, sin los valores por defecto ni las transformaciones del schema. Los schemas asíncronos se rechazan porque route() es síncrono. Las salidas JavaScript importan el módulo como valor para inferir sus tipos. Zod 4 y Valibot 1 requieren TypeScript 5.4+.

route.parseQuery(name, url) lee de vuelta la query de una URL con el schema de la ruta cuando está disponible en runtime (validateQuery: true, o schemas pasados a createRoutes) y devuelve { ok: true, value } con el tipo de salida del schema, o { ok: false, issues }. Los valores llegan como strings; en las claves que el schema rechaza, los strings que route() escribe para números y true/false se convierten de vuelta y un valor único pasa a array, así que el mismo schema construye y lee. Las rutas sin schema en runtime (sin schema, defineQuery.type() o schemas importados solo como tipos) devuelven la query sin procesar, y su tipo lo indica.

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});
```

Related topic IDs: query-schema-config, query-schema-use, helper-parse-query, helper-define-query
---

# Conectar un esquema de consulta

Topic: `query-schema-config` · Named Routes v2.2.0

Apunta query al módulo defineQuery. Activa validateQuery para validar en ejecución; los esquemas solo de tipos no validan valores.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
---

# Usar consultas tipadas

Topic: `query-schema-use` · Named Routes v2.2.0

Tras configurar los esquemas products y search, regenera el módulo. TypeScript rechaza claves desconocidas y exige los parámetros obligatorios.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Usa un mapa Standard Schema por ruta. Conserva los tipos de entrada y salida. El validador síncrono es opcional.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declara el contrato solo con TypeScript; no valida en ejecución. Valida las entradas del usuario por separado.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
---

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
---

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
