# Parámetros catch-all

Topic: `catch-all-parameters` · Named Routes v2.2.0

Un [...slug] obligatorio recibe un array no vacío; [[...slug]] puede omitirse. Cada elemento es un segmento distinto.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
