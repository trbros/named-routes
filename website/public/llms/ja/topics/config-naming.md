# 命名規則

Topic: `config-naming` · Named Routes v2.2.0

naming.style、separator、paramPrefix、home を指定できます。transform は自動名を変更でき、names が優先します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
