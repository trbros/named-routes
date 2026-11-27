# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` は既知の名前を型付き配列で返します。デバッグや開発ツールに使えますが、権限や各ルートへのアクセス可能性は示しません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
