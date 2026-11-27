# ジェネレーターの設定

Topic: `configuration` · Named Routes v2.2.0

設定ファイルは任意です。必要な設定のみ追加します。.ts、.mts、.mjs、.js、.cjs、.json の順に検出します。TypeScript 非対応時は .mjs を使い、--config で別ファイルを指定できます。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
