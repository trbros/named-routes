# Nombres semánticos y grupos

Topic: `semantic-names` · Named Routes v2.2.0

Configura naming.style como semantic para usar index y show. Los nombres originales siguen siendo el valor predeterminado. Usa names para nombres estables y personalizados; las colisiones detienen la generación.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
