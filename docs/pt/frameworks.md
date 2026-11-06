# Frameworks · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/frameworks.md) · [Português](../pt/frameworks.md) · [Español](../es/frameworks.md) · [日本語](../ja/frameworks.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Outros frameworks (plugin Vite)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Rotas manuais (React, Vue, qualquer router)](#manual-routes)

<a id="frameworks"></a>

## Outros frameworks (plugin Vite)

Adicione namedRoutes() de @triooo/named-routes/vite aos plugins Vite do Nuxt (vite.plugins no nuxt.config), Vue, SvelteKit, Astro (vite.plugins no astro.config), React Router ou TanStack Router. Ele gera ao iniciar ou compilar o Vite e regenera quando arquivos são criados, removidos ou renomeados, usando o watcher do próprio Vite.

O framework é detectado pelo package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev ou @remix-run/dev, plugin/CLI/Start do TanStack Router, unplugin-vue-router ou vue-router). Defina framework explicitamente em monorepos ou quando a detecção for ambígua. Execute npx named-routes init para criar uma configuração para o framework detectado.

As convenções são convertidas para a sintaxe do runtime. Nuxt e Vue: index, [id], [[id]] opcional, [...slug] (aceita resto vazio, então vira [[...slug]]), pastas (grupo), aninhamento parent.vue + parent/, segmentos mistos como v[major]-[minor]; no Vue, pontos também aninham (users.edit.vue) e [id]+ indica parâmetro repetível. O Nuxt ignora arquivos iniciados por - e, com includeApi, varre server/api (com prefixo /api) e server/routes, removendo sufixos .get/.post.

SvelteKit: arquivos +page.*, [id=matcher] (o matcher é descartado), [[lang]], [...rest] (zero ou mais segmentos), (grupo), escapes [x+2f] e endpoints +server com includeApi. Astro: src/pages com .astro/.md/.mdx/.html, arquivos _privados ignorados, parâmetros [...slug] e endpoints .ts/.js com includeApi.

Flat routes do React Router / Remix (app/routes): pontos aninham, _index, $param, ($opcional), splat $ (chamado splat), layouts _sem-caminho, opt-out nome_, escapes [.] e módulos pasta/route.tsx. TanStack Router (src/routes): arquivos planos e em pastas, index/route, $param, {-$opcional}, prefixo{$param}, splat $ (chamado _splat), _layouts, arquivos -ignorados, (grupos) e arquivos .lazy. Segmentos estáticos opcionais como (beta) não podem ser nomeados; exclua o arquivo ou use extraRoutes.

Caminhos declarados dentro de componentes (definePageMeta({ path }) do Nuxt, routes.ts do React Router) não são visíveis para um scanner de arquivos: mapeie essas URLs com extraRoutes ou use o manifesto manual descrito a seguir.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes()] });

// nuxt.config.ts
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/utils/routes.ts" })] },
});

// astro.config.mjs
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

// Any component:
import { route } from "~/utils/routes"; // or your output path
route("users.$id", { id: 42 }); // /users/42
```

<a id="nextjs"></a>

## Next.js

Envolva o next.config com withNamedRoutes de @triooo/named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

**Convenções.** app/ e pages/ (ou src/app e src/pages) são lidos juntos. App Router: apenas arquivos page; grupos de rotas e slots paralelos são omitidos, interceptações resolvem para a URL canônica, pastas _privadas são ignoradas e %5F vira underscore. Pages Router: index é removido e _app, _document e _error são ignorados. Route Handlers e pages/api são opcionais via includeApi. appDir e pagesDir apontam para pastas personalizadas (ou false para ignorar uma).

**Navegação.** O helper retorna strings para next/link, useRouter de next/navigation ou next/router e redirect. Link e router adicionam o basePath sozinhos; passe { basePath: true } apenas para âncoras simples ou fetch. Com next-intl, passe o objeto routing como i18n: app/[locale]/about vira about e o Link do next-intl recebe o caminho interno.

**Verificado.** Servidores reais do Next 16 (App Router e Pages Router, com basePath e descoberta de páginas ao vivo) rodam no CI. Demos: examples/app-router e examples/pages-router. Veja também as receitas de App Router e Pages Router.

```tsx
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// app/users/[user]/page.tsx → users.$user
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("users.$user", { user: "ana" })}>Ana</Link>;
```

<a id="nuxt"></a>

## Nuxt

Adicione namedRoutes() em vite.plugins no nuxt.config. Mantenha a saída dentro do diretório de código e importe com o alias ~: no Nuxt 4 (srcDir app/) use output app/routes.generated.ts e importe ~/routes.generated. O plugin regenera conforme você cria, move ou apaga páginas durante o nuxt dev.

**Convenções.** app/pages ou pages: index.vue, [id], [[id]] opcional, [...slug] (também aceita resto vazio, então vira [[...slug]]), pastas (grupo), segmentos mistos como v[major]-[minor] e aninhamento parent.vue + parent/ mesclado em uma rota. Arquivos iniciados por - são ignorados. Com includeApi, server/api (com prefixo /api) e server/routes são lidos e os sufixos .get/.post são removidos.

**Navegação e i18n.** Use a URL com NuxtLink :to, navigateTo ou useRouter().push. Com @nuxtjs/i18n, configure os mesmos idiomas aqui: a estratégia prefix_except_default corresponde a localePrefix as-needed, prefix (ou prefix_and_default) a always e no_prefix a never. Assim route(nome, params, { locale }) retorna a URL localizada; sem locale você recebe o caminho interno para o localePath(). Caminhos traduzidos com defineI18nRoute precisam ser repetidos em i18n.pathnames.

**Limites e verificação.** Caminhos alterados com definePageMeta({ path }) não são vistos pelo scanner; adicione-os com extraRoutes. Os nomes seguem o estilo pontuado deste pacote (users.$id), não os nomes de rota do próprio Nuxt (users-id). Verificado por testes de convenção e pelo examples/nuxt, que compila e roda com Nuxt 4.

```vue
// nuxt.config.ts
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineNuxtConfig({
  vite: { plugins: [namedRoutes({ output: "app/routes.generated.ts" })] },
});

<!-- app/pages/users/[id].vue → users.$id -->
<script setup lang="ts">
import { route } from "~/routes.generated";
</script>
<template>
  <NuxtLink :to="route('users.$id', { id: 42 })">User 42</NuxtLink>
</template>
```

<a id="vue"></a>

## Vue Router

Para apps Vue com roteamento por arquivos (convenções do unplugin-vue-router), adicione namedRoutes() antes de VueRouter() e vue() no vite.config. O framework é detectado por unplugin-vue-router ou vue-router; src/pages é lido, a menos que routesDir indique outra pasta. Apps que declaram um array de rotas manualmente devem usar um manifesto manual.

**Convenções.** index.vue e (nome).vue são rotas index; pontos aninham (users.edit.vue é /users/edit); [id] e [[id]]; [id]+ é parâmetro repetível de um ou mais ([...id]) e [[id]]+ de zero ou mais ([[...id]]); [...path] também aceita resto vazio ([[...path]]); pastas (grupo) são omitidas; aninhamento parent.vue + parent/ é mesclado; segmentos mistos como v[major]-[minor] funcionam.

**Navegação.** Passe a URL para RouterLink :to ou router.push. O Vue Router resolve a string como qualquer caminho, então o pacote não precisa acessar a instância do router.

**Verificado.** Um servidor real do Vite 7 com essas convenções roda no CI, e o examples/vue compila e roda com unplugin-vue-router.

```ts
// vite.config.ts
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes(), VueRouter(), vue()] });

// src/pages/users/[id].vue → users.$id
<RouterLink :to="route('users.$id', { id: 42 })">User 42</RouterLink>
```

<a id="sveltekit"></a>

## SvelteKit

Adicione namedRoutes() antes de sveltekit() no vite.config. Gerar o módulo em src/lib permite importá-lo como $lib/routes.generated em qualquer componente, função load ou endpoint.

**Convenções.** src/routes com +page.svelte, +page.ts ou +page.server.ts (eles se mesclam em uma rota); pastas (grupo) são omitidas; [id=matcher] mantém o parâmetro e descarta o matcher; [[lang]] é opcional; [...rest] aceita zero ou mais segmentos ([[...rest]]) e pode vir antes de segmentos estáticos; resets de layout +page@ são páginas normais; escapes [x+2f] e [u+0041] são decodificados. Endpoints +server são opcionais via includeApi.

**Navegação.** Use <a href={route(...)}>, goto(route(...)) ou redirect(303, route(...)). O SvelteKit não adiciona paths.base em âncoras simples, então defina defaults.basePath com o mesmo valor e passe { basePath: true } quando publicar sob um caminho base.

**Verificado.** Testes de convenção e o examples/sveltekit, que compila e roda com SvelteKit 2 e Svelte 5.

```svelte
// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "src/lib/routes.generated.ts" }), sveltekit()],
});

<!-- src/routes/blog/[slug]/+page.svelte → blog.$slug -->
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("blog.$slug", { slug: "hello" })}>Hello</a>
```

<a id="astro"></a>

## Astro

Adicione namedRoutes() em vite.plugins no astro.config. O módulo é gerado por padrão em src/routes.generated.ts e pode ser importado no frontmatter .astro, em ilhas de framework e em endpoints.

**Convenções.** src/pages com páginas .astro, .md, .mdx, .markdown e .html; arquivos e pastas iniciados por _ são privados; [id]; [...slug] aceita zero ou mais segmentos ([[...slug]]); segmentos mistos como [lang]-[version]. Endpoints .ts/.js são opcionais via includeApi e mantêm a extensão interna (api/data.json.ts é /api/data.json).

**i18n.** As pastas físicas de idioma do Astro (src/pages/pt/about.astro) se mesclam na mesma rota nomeada que src/pages/about.astro quando o idioma está em i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed e true a always.

**Limites e verificação.** Builds estáticos continuam precisando de getStaticPaths nas páginas dinâmicas: o pacote constrói URLs, não enumera parâmetros. Verificado por testes de convenção e pelo examples/astro, que compila e roda com Astro 5.

```astro
// astro.config.mjs
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ vite: { plugins: [namedRoutes()] } });

---
// src/pages/docs/[...slug].astro → docs.$slug
import { route } from "../../routes.generated";
---
<a href={route("docs.$slug", { slug: ["guide", "install"] })}>Install guide</a>
```

<a id="react-router"></a>

## React Router / Remix

Para o React Router 7 em modo framework (e Remix v2) com flat routes, adicione namedRoutes() antes de reactRouter() no vite.config e mantenha o app/routes.ts como flatRoutes() de @react-router/fs-routes. Uma boa saída é app/routes.generated.ts, fora de app/routes.

**Convenções.** Pontos aninham (concerts.$city.tsx é /concerts/[city]); _index é o index; $param; ($lang) é opcional ([[lang]]); um $ isolado é um splat chamado splat ([[...splat]]); prefixos _auth são layouts sem caminho; concerts_ sai do aninhamento; escapes [.] mantêm caracteres; uma pasta com route.tsx é uma rota e pastas mais profundas são ignoradas. Um layout e seu _index compartilham a URL e se mesclam.

**Navegação.** Use <Link to={route(...)}>, useNavigate() ou redirect() em loaders e actions.

**Limites e verificação.** Rotas declaradas em código no app/routes.ts (route(), index(), layout()) não são arquivos: use um manifesto manual ou extraRoutes. Segmentos estáticos opcionais como (beta) não podem ser nomeados; o gerador para com um erro claro para que você exclua o arquivo. Verificado por testes de convenção e pelo examples/react-router, que compila e roda com React Router 7.

```tsx
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});

// app/routes/concerts.$city.tsx → concerts.$city
import { Link } from "react-router";
import { route } from "../routes.generated";
<Link to={route("concerts.$city", { city: "lisbon" })}>Lisbon</Link>;
```

<a id="tanstack-router"></a>

## TanStack Router

Adicione namedRoutes() junto do tanstackRouter() de @tanstack/router-plugin no vite.config. O plugin lê src/routes (ou app/routes) e escreve src/routes.generated.ts por padrão, fora da pasta de rotas, então ele nunca vira uma rota.

**Convenções.** __root é ignorado; index e route.tsx são a rota da pasta; arquivos planos (posts.$postId.tsx) e em pastas se misturam; $param; {-$locale} é opcional ([[locale]]); prefixo{$id}sufixo vira um segmento misto; um $ isolado é um splat chamado _splat ([[..._splat]]); _layout não tem caminho; posts_ sai do aninhamento; arquivos com prefixo - e pastas (grupo) são ignorados; arquivos .lazy pertencem à mesma rota.

**Quando usar.** O TanStack Router já tipa o próprio <Link to> pelo id da rota. Use route() onde é preciso uma string simples: <a href>, redirects para outros apps, e-mails, sitemaps, analytics, URLs com prefixo de idioma e nomes compartilhados com outros frameworks em um monorepo.

**Verificado.** Testes de convenção e o examples/tanstack-router, que compila e roda com o plugin de router do TanStack.

```tsx
// vite.config.ts
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [namedRoutes(), tanstackRouter({ target: "react" }), react()],
});

// src/routes/posts/$postId.tsx → posts.$postId
import { route } from "../../routes.generated";
<a href={route("posts.$postId", { postId: 42 }, { absolute: true })}>Share</a>;
```

<a id="manual-routes"></a>

## Rotas manuais (React, Vue, qualquer router)

Quando as rotas são declaradas em código (<Route> do React Router, array de rotas do vue-router, servidores no estilo Express), escreva o manifesto com createRoutes. Você recebe a mesma inferência de nomes, checagem de parâmetros, codificação, query/hash, basePath e opções de i18n; apenas a descoberta é manual.

Os padrões usam a sintaxe de colchetes independentemente da sintaxe do router: /users/:id vira /users/[id], um :id? opcional vira [[id]] e um splat * vira [...splat] ou [[...splat]]. Mantenha o objeto literal (ou as const) para que nomes e parâmetros sejam inferidos.

Para compartilhar um módulo gerado mesmo assim (por exemplo, a partir de um pacote de monorepo), use framework: "manual" e liste as rotas em extraRoutes; o gerador escreve o mesmo módulo tipado sem varrer arquivos.

```tsx
// src/routes.ts
import { createRoutes } from "@triooo/named-routes";
export const route = createRoutes({
  home: "/",
  "users.show": "/users/[id]",       // <Route path="/users/:id">
  "docs.page": "/docs/[[...path]]",   // <Route path="/docs/*">
});

// React Router
<Link to={route("users.show", { id: 42 })}>Ana</Link>
// Vue Router
<RouterLink :to="route('users.show', { id: 42 })">Ana</RouterLink>
```

---

← Anterior: [Primeiros passos](getting-started.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Desenvolva com rotas](build-with-routes.md) →
