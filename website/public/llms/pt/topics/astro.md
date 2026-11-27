# Astro: configuração

Topic: `astro` · Named Routes v2.2.0

Registre a integração nativa de @triooo/named-routes/astro em integrations do astro.config. Ela herda o base final do Astro. Se migrar da configuração antiga, remova namedRoutes() de vite.plugins. O módulo é gerado em src/routes.generated.ts por padrão e pode ser usado no frontmatter .astro, em ilhas e endpoints.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
