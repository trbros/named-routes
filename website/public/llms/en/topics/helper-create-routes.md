# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

Create an independent, frozen helper from a name-to-pattern manifest. Keep literal types for autocomplete. Defaults apply to the returned helper; no filesystem or framework imports are required in the browser.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
