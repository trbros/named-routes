# Barras finais

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash muda a formatação do caminho gerado, não os redirects do servidor. Configure a mesma política no framework. O Next.js herda a opção do next.config.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
