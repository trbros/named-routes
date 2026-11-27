# Descoberta e diretórios

Topic: `config-discovery` · Named Routes v2.2.0

Use framework: auto (padrão) ou um framework explícito. discovery: framework lê a tabela publicada quando disponível; files força o scanner. Next possui router, appDir e pagesDir; outros usam routesDir. pageExtensions e exclude ajustam a busca. root é relativo ao arquivo de configuração quando declarado nele.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
