# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Node tooling only: discover route entries without writing the output file. Inspect entries, framework and discovery metadata.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
