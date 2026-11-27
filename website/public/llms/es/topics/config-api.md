# Activar descubrimiento de API

Topic: `config-api` · Named Routes v2.2.0

includeApi es false por defecto. Actívalo para incluir endpoints reconocidos. Solo se generan métodos detectables estáticamente.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
