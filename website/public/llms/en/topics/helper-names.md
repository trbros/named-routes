# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` returns the known names as a typed array. Use it for debugging or development tools; it does not expose authorization rules or guarantee that every route is reachable by a given user.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
