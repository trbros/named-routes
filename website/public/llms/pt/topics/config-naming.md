# Convenções de nomes

Topic: `config-naming` · Named Routes v2.2.0

naming.style controla path ou semantic. separator, paramPrefix e home personalizam a convenção; transform pode alterar nomes em config JS/TS. names tem prioridade sobre nomes automáticos. Colisões interrompem a geração.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
