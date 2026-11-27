# Defaults de URL

Topic: `config-defaults` · Named Routes v2.2.0

defaults contém basePath, includeBasePath, origin, trailingSlash e assetBase. São valores públicos serializados no módulo. Configurações explícitas sobrescrevem as herdadas do framework. Não use credenciais.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
