# API 検出の有効化

Topic: `config-api` · Named Routes v2.2.0

includeApi は既定で false です。静的に検出できるメソッドのみディスクリプターを生成します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
