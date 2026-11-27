# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Use um mapa de Standard Schema por rota. O helper preserva tipos de entrada e saída. Validadores síncronos podem validar em runtime; o pacote de schema é dependência opcional do consumidor.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
