# Segmentos mistos

Topic: `mixed-parameters` · Named Routes v2.2.0

Um segmento misto combina texto literal e parâmetros obrigatórios. Cada parâmetro dinâmico possui sua própria chave tipada.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
