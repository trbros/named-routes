# Vue Router: configuração

[Documentação](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue.md) · [Português](../pt/topic-vue.md) · [Español](../es/topic-vue.md) · [日本語](../ja/topic-vue.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue"></a>

Para apps Vue com roteamento por arquivos (vue-router/vite do Vue Router 5, ou unplugin-vue-router no Vue Router 4), adicione namedRoutes() antes de VueRouter() e vue() no vite.config. users/_parent.vue é tratado como o pai não navegável de users/, como no Vue Router 5.0.3+. O framework é detectado por unplugin-vue-router ou vue-router; src/pages é lido, a menos que routesDir indique outra pasta. Apps que declaram um array de rotas manualmente devem usar um manifesto manual.

<a id="without-base"></a>
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

<a id="with-base"></a>
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

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-vue-conventions.md)
- [Links e navegação](topic-vue-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-vue.md) · Próximo: [Convenções de arquivos e descoberta](topic-vue-conventions.md) →
