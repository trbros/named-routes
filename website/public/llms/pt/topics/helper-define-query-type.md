# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declare o contrato da query apenas com TypeScript. Não adiciona validação em runtime. Valide separadamente valores recebidos do usuário.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
