# 末尾スラッシュ

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash は URL の形式のみ変更し、サーバーのリダイレクトは変更しません。フレームワークの設定と揃えてください。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
