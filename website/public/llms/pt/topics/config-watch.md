# Watch e opções de desenvolvimento

Topic: `config-watch` · Named Routes v2.2.0

A integração atualiza rotas durante o desenvolvimento. withNamedRoutes aceita watch, watchMode e watchInterval; use polling quando eventos nativos forem instáveis. A CLI aceita --watch-mode poll. Reinicie o framework após alterar a base.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
