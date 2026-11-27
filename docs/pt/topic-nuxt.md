# Nuxt: configuração

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt.md) · [Português](../pt/topic-nuxt.md) · [Español](../es/topic-nuxt.md) · [日本語](../ja/topic-nuxt.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt"></a>

Adicione "@triooo/named-routes/nuxt" a modules no nuxt.config. O módulo nomeia as rotas que o próprio Nuxt resolve (o hook pages:resolved), então definePageMeta({ path, alias }) e páginas adicionadas por outros módulos entram, e gera de novo quando você adiciona, move ou remove páginas durante o nuxt dev. Mantenha a saída dentro do diretório de código e importe-a com o alias ~: no Nuxt 4 (srcDir app/) use output app/routes.generated.ts e importe ~/routes.generated. As opções ficam no named-routes.config (compartilhado com a CLI) ou em namedRoutes no nuxt.config.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
export default defineNuxtConfig({
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});
```

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-nuxt-conventions.md)
- [Links e navegação](topic-nuxt-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-nuxt.md) · Próximo: [Convenções de arquivos e descoberta](topic-nuxt-conventions.md) →
