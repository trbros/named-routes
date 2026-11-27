# Segmentos mixtos

Topic: `mixed-parameters` · Named Routes v2.2.0

Un segmento mixto combina texto literal y parámetros obligatorios. Cada parámetro tiene su propia clave.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
