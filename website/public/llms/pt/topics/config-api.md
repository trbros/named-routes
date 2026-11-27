# Ativar descoberta de APIs

Topic: `config-api` · Named Routes v2.2.0

includeApi é false por padrão. Ative para incluir URLs de endpoints reconhecidas pelo adaptador. Descritores são gerados somente para métodos detectáveis estaticamente. Não gera OpenAPI nem autorização.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
