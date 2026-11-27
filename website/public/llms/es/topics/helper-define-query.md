# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Usa un mapa Standard Schema por ruta. Conserva los tipos de entrada y salida. El validador síncrono es opcional.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
