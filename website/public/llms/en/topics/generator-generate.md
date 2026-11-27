# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Node tooling only: discover and write the generated module. With check: true, reject a stale output without modifying it. Returns output and changed as well as discovery information.

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
