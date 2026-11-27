# クエリスキーマを接続

Topic: `query-schema-config` · Named Routes v2.2.0

query に defineQuery の既定 export を持つモジュールを指定します。実行時検証には validateQuery を有効にします。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
