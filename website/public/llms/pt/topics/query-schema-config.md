# Conectar um schema de query

Topic: `query-schema-config` · Named Routes v2.2.0

Aponte query para o módulo que exporta defineQuery como default. Ative validateQuery quando quiser validação em runtime; schemas apenas de tipo nunca validam valores em runtime.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
