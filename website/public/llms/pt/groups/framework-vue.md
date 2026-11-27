# Vue Router

# Vue Router: configuração

Topic: `vue` · Named Routes v2.2.0

Para apps Vue com roteamento por arquivos (vue-router/vite do Vue Router 5, ou unplugin-vue-router no Vue Router 4), adicione namedRoutes() antes de VueRouter() e vue() no vite.config. users/_parent.vue é tratado como o pai não navegável de users/, como no Vue Router 5.0.3+. O framework é detectado por unplugin-vue-router ou vue-router; src/pages é lido, a menos que routesDir indique outra pasta. Apps que declaram um array de rotas manualmente devem usar um manifesto manual.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), VueRouter(), vue()],
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Em src/main.ts use createWebHistory(import.meta.env.BASE_URL).

```ts
import { defineConfig } from "vite";
import VueRouter from "vue-router/vite";
import vue from "@vitejs/plugin-vue";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});
```

Related topic IDs: vue-conventions, vue-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `vue-conventions` · Named Routes v2.2.0

Crie `src/pages/users/[id].vue` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** index.vue e (nome).vue são rotas index; pontos aninham (users.edit.vue é /users/edit); [id] e [[id]]; [id]+ é parâmetro repetível de um ou mais ([...id]) e [[id]]+ de zero ou mais ([[...id]]); [...path] também aceita resto vazio ([[...path]]); pastas (grupo) são omitidas; aninhamento parent.vue + parent/ é mesclado; segmentos mistos como v[major]-[minor] funcionam.

**Verificado.** Os nomes vêm do typed-router.d.ts que o Vue Router 5 grava (opção dts), então sobrescritas com definePage({ path }) são nomeadas pela URL que servem; antes de ele existir, os arquivos são varridos. Um servidor Vite real com essas convenções roda no CI, e o examples/vue compila, roda e é navegado em um navegador com Vue Router 5 (vue-router/vite), incluindo um layout users/_parent.vue e uma página com definePage({ path }).

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `vue-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

## Com base path

URL no navegador: `/app/users/42`.

```vue
<script setup lang="ts">
import { route } from "../routes.generated";
</script>
<template>
  <RouterLink :to="route('users.$id', { id: 42 })">Ana</RouterLink>
</template>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, vue-programmatic
---

# Navegação — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
---

# Base path e deploy

Topic: `vue-deployment` · Named Routes v2.2.0

Configure `history base` no Vue Router. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

Em src/main.ts configure createWebHistory(import.meta.env.BASE_URL) para usar o base do Vite do exemplo.

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

Topic: `vue-assets` · Named Routes v2.2.0

Coloque um arquivo em `public/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Links internacionalizados

Topic: `vue-i18n` · Named Routes v2.2.0

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

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

# Limites de HTTP

Topic: `vue-endpoints` · Named Routes v2.2.0

Rotas cliente do Vue Router não estabelecem contratos de métodos HTTP. O Named Routes não infere verbos de componentes, loaders, actions ou server functions. Use sua API de servidor ou cliente OpenAPI; para uma URL nomeada conhecida use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
