# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Solo Node: descubre y escribe el módulo. check: true rechaza salida obsoleta sin escribirla.

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
