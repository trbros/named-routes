# Sua primeira rota nomeada (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Configuração mínima do Next.js: adicione o wrapper em next.config.ts, inicie o servidor de desenvolvimento e siga o guia de navegação do Next.js. Para outro framework, use sua página de configuração.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
