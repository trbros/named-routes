# Optional route parameters

Topic: `optional-parameters` · Named Routes v2.2.0

Use [[id]] for an optional scalar. Omit the value to omit its segment. In a generated application, use the framework’s equivalent convention; support differs by router.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
