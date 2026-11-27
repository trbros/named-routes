# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Apenas Node: descubra e grave o módulo gerado. Com check: true, rejeita saída desatualizada sem alterar. Retorna output e changed além dos dados de descoberta.

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
