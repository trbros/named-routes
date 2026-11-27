# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

TypeScript のみで契約を宣言します。実行時検証は行わないため、入力値は別途検証してください。

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
