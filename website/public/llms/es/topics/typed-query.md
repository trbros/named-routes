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
