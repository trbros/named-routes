# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Solo Node: descubre rutas sin escribir el archivo de salida. Inspecciona entries y metadatos.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
