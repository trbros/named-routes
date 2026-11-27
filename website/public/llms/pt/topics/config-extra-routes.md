# Adicionar rotas explícitas

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes mapeia um nome escolhido a um padrão canônico para rewrite, manifesto manual ou rota conhecida da aplicação. Ao contrário de names, a URL não precisa ser descoberta. O pacote não cria a página nem o endpoint.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
