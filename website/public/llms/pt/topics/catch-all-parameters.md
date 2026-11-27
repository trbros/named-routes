# Parâmetros catch-all

Topic: `catch-all-parameters` · Named Routes v2.2.0

Um [...slug] obrigatório recebe um array não vazio; [[...slug]] aceita omissão ou array vazio. Cada item é codificado como segmento distinto. Não passe uma string com barras como catch-all.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
