# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` retorna os nomes conhecidos em um array tipado. Use em depuração e ferramentas de desenvolvimento; não informa regras de autorização nem garante acesso a todas as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
