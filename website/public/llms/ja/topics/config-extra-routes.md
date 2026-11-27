# 明示ルートの追加

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes は検出不要の明示的な名前とパターンを指定します。ページやサーバールートは作成しません。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
