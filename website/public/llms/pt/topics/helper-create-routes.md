# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

Crie um helper independente e congelado a partir do manifesto nome → padrão. Preserve tipos literais para autocomplete. Defaults pertencem ao helper; não há imports do filesystem ou framework no navegador.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
