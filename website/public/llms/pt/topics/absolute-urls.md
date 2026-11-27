# URLs absolutas e origin

Topic: `absolute-urls` · Named Routes v2.2.0

Defina defaults.origin como uma origem HTTP(S) confiável, sem credenciais, caminho, query ou hash. absolute: true inclui a base. O runtime não adivinha a origem por window ou headers; não coloque segredos na configuração pública.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
