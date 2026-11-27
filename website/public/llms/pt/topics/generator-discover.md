# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Apenas ferramentas Node: descubra rotas sem gravar o arquivo de saída. Inspecione entries, framework e metadados de descoberta.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
