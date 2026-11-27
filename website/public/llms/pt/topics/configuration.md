# Configuração do gerador

Topic: `configuration` · Named Routes v2.2.0

O arquivo de configuração é opcional. As integrações geram rotas com defaults; adicione apenas o necessário. A busca segue .ts, .mts, .mjs, .js, .cjs, .json; use .mjs se Node não carregar TypeScript. defineConfig fornece autocomplete e a geração rejeita opções desconhecidas. --config seleciona outro arquivo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
