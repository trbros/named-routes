# 生成先と export

Topic: `config-output` · Named Routes v2.2.0

output はルートディレクトリ外の生成先です。exportNames と importSource で変更できます。hrefs: typed が既定です。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
