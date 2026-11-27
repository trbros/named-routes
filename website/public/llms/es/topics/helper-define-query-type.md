# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declara el contrato solo con TypeScript; no valida en ejecución. Valida las entradas del usuario por separado.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
