# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

ルートごとの Standard Schema を指定します。入出力の型が保持され、同期バリデータで実行時検証できます。

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
