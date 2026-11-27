# Nuxt: configuração

Topic: `nuxt` · Named Routes v2.2.0

Adicione "@triooo/named-routes/nuxt" a modules no nuxt.config. O módulo nomeia as rotas que o próprio Nuxt resolve (o hook pages:resolved), então definePageMeta({ path, alias }) e páginas adicionadas por outros módulos entram, e gera de novo quando você adiciona, move ou remove páginas durante o nuxt dev. Mantenha a saída dentro do diretório de código e importe-a com o alias ~: no Nuxt 4 (srcDir app/) use output app/routes.generated.ts e importe ~/routes.generated. As opções ficam no named-routes.config (compartilhado com a CLI) ou em namedRoutes no nuxt.config.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

Related topic IDs: nuxt-conventions, nuxt-navigation, installation, configuration
