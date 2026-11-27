# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Node ツール専用です。出力を書き込まずルートを検出します。

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
