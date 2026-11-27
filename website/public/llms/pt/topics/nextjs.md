# Next.js: configuração

Topic: `nextjs` · Named Routes v2.2.0

Envolva o next.config com withNamedRoutes de @triooo/named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
