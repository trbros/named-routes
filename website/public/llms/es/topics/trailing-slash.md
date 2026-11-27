# Barras finales

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash cambia el formato, no las redirecciones del servidor. Usa la misma política en el framework.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
