# 検出とディレクトリ

Topic: `config-discovery` · Named Routes v2.2.0

framework: auto または明示指定を使います。discovery: files はファイルスキャンを強制します。Next の appDir/pagesDir、他の routesDir、pageExtensions、exclude で調整できます。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
