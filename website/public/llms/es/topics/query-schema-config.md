# Conectar un esquema de consulta

Topic: `query-schema-config` · Named Routes v2.2.0

Apunta query al módulo defineQuery. Activa validateQuery para validar en ejecución; los esquemas solo de tipos no validan valores.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
