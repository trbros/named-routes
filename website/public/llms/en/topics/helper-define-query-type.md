# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declare a query contract using TypeScript only. It adds no runtime validator. Do not trust user-provided URL values without validating them separately.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
