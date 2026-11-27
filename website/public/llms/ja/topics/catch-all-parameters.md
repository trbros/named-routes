# キャッチオールパラメータ

Topic: `catch-all-parameters` · Named Routes v2.2.0

[...slug] は空でない配列、[[...slug]] は省略または空配列を受け付けます。各要素は別々のセグメントになります。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
