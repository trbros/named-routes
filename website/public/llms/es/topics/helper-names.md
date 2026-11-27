# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` devuelve los nombres conocidos en un array tipado. Úsalo en depuración y herramientas de desarrollo; no expresa permisos ni garantiza acceso a todas las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
