# Parámetros opcionales

Topic: `optional-parameters` · Named Routes v2.2.0

Usa [[id]] para un parámetro escalar opcional. Omite el valor para omitir el segmento. Las convenciones dependen del router.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
