# Convenciones de nombres

Topic: `config-naming` · Named Routes v2.2.0

naming.style elige path o semantic. separator, paramPrefix y home personalizan; transform modifica nombres automáticos. names tiene prioridad.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
