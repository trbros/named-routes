# Saída gerada e exports

Topic: `config-output` · Named Routes v2.2.0

output é src/routes.generated.ts por padrão; use .ts, .mts, .js ou .mjs fora de diretório roteável. exportNames renomeia exports e importSource altera o import do runtime. hrefs: typed é padrão; string restaura o tipo de retorno simples.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
