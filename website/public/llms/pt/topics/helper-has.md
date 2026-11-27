# route.has()

Topic: `helper-has` · Named Routes v2.2.0

`route.has(name)` verifica o manifesto e restringe uma string arbitrária a um nome válido. Não verifica se o servidor está servindo a rota. Use antes de acessar rotas escolhidas por entrada externa.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

Related topic IDs: helper-names, helper-pattern
