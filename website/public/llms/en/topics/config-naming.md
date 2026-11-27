# Naming conventions

Topic: `config-naming` · Named Routes v2.2.0

naming.style controls path or semantic names. separator, paramPrefix and home customize the path convention; transform can override an automatic name in a JavaScript or TypeScript config. names wins over automatic naming. Collisions fail generation.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
