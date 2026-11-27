# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Use a per-route Standard Schema map. The helper preserves input and output types. A synchronous validator can be used for runtime validation; the schema package is your optional dependency.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
