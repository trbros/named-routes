# 混合セグメント

Topic: `mixed-parameters` · Named Routes v2.2.0

混合セグメントは固定文字列と必須パラメータを組み合わせます。各パラメータには固有のキーがあります。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
