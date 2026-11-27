# 任意パラメータ

Topic: `optional-parameters` · Named Routes v2.2.0

[[id]] は任意の単一パラメータです。値を省略するとセグメントも省略されます。フレームワークごとの規則を確認してください。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
