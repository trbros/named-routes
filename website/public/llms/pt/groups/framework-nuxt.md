# Nuxt

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
---

# Convenções de arquivos e descoberta

Topic: `nuxt-conventions` · Named Routes v2.2.0

Crie `app/pages/users/[id].vue` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** app/pages ou pages: index.vue, [id], [[id]] opcional, [...slug] (também aceita resto vazio, então vira [[...slug]]), pastas (grupo), segmentos mistos como v[major]-[minor] e aninhamento parent.vue + parent/ mesclado em uma rota. Arquivos iniciados por - são ignorados. Com includeApi, server/api (com prefixo /api) e server/routes são lidos e os sufixos .get/.post são removidos.

**Limites e verificação.** O módulo também grava .nuxt/named-routes/pages.json, então named-routes check e generate veem as mesmas rotas depois do nuxt prepare. Liste-o antes de @nuxtjs/i18n em modules, para que ele veja as rotas antes de serem localizadas. O plugin Vite continua funcionando no Nuxt, mas só enxerga os arquivos. Os nomes seguem o estilo com pontos deste pacote (users.$id), não os nomes de rota do Nuxt (users-id). Verificado por testes de convenção e pelo examples/nuxt, que compila e roda com Nuxt 4, incluindo uma página com definePageMeta({ path }).

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `nuxt-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

## Com base path

URL no navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">Ana</NuxtLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, nuxt-programmatic
---

# Navegação — navigateTo()

Topic: `nuxt-programmatic` · Named Routes v2.2.0

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { route } from "~/routes.generated";
await navigateTo(route("users.$id", { id: 42 }));
```

Related topic IDs: nuxt-navigation, nuxt-deployment, public-url
---

# Base path e deploy

Topic: `nuxt-deployment` · Named Routes v2.2.0

Configure `app.baseURL` no Nuxt. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Arquivos públicos

Topic: `nuxt-assets` · Named Routes v2.2.0

Coloque um arquivo em `public/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "~/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Links internacionalizados

Topic: `nuxt-i18n` · Named Routes v2.2.0

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

**Navegação e i18n.** Use a URL com NuxtLink :to, navigateTo ou useRouter().push. Com @nuxtjs/i18n, configure os mesmos idiomas aqui: a estratégia prefix_except_default corresponde a localePrefix as-needed, prefix (ou prefix_and_default) a always e no_prefix a never. Assim route(nome, params, { locale }) retorna a URL localizada; sem locale você recebe o caminho interno para o localePath(). Caminhos traduzidos com defineI18nRoute precisam ser repetidos em i18n.pathnames.

## Sem base path

URL no navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## Com base path

URL no navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Endpoints HTTP

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `server/api/admin.get.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
