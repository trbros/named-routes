# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

名前とパターンのマニフェストから独立したヘルパーを作ります。リテラル型を維持すると補完できます。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
