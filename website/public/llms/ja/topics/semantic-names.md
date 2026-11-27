# 意味的なルート名とグループ

Topic: `semantic-names` · Named Routes v2.2.0

naming.style を semantic にすると親ページに index、末尾必須パラメータに show を使用します。既定の命名は維持されます。names で安定した任意の名前を指定できます。衝突はエラーになります。

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
