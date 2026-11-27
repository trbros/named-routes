# Parâmetros opcionais

Topic: `optional-parameters` · Named Routes v2.2.0

Use [[id]] para um parâmetro escalar opcional. Omita o valor para omitir o segmento. Em apps gerados use a convenção equivalente do framework; o suporte varia.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
