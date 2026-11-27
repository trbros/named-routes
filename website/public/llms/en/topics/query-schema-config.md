# Connect a query schema

Topic: `query-schema-config` · Named Routes v2.2.0

Point query at the module with the default defineQuery export. Enable validateQuery only when you want the runtime validator bundled; type-only schemas never validate values at runtime.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
