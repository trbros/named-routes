# @triooo/next-named-routes

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json and docs/locales.json; run pnpm docs. -->

## Conteúdo

**v1.0.0**

[Guia de instalação local](LOCAL-DEVELOPMENT.pt-BR.md)

- [O que ele faz](#overview)
- [Comparação com alternativas](#comparison)
- [Instalação](#installation)
- [Configuração única no Next.js](#quick-start)
- [Outros frameworks (plugin Vite)](#frameworks)
- [Next.js](#nextjs)
- [Nuxt](#nuxt)
- [Vue Router](#vue)
- [SvelteKit](#sveltekit)
- [Astro](#astro)
- [React Router / Remix](#react-router)
- [TanStack Router](#tanstack-router)
- [Rotas manuais (React, Vue, qualquer router)](#manual-routes)
- [Regras de nomes automáticos](#naming)
- [Exemplos com App Router](#app-router)
- [Exemplos com Pages Router](#pages-router)
- [Parâmetros e codificação](#parameters)
- [Query strings e fragmentos](#query-hash)
- [basePath, barras finais e origens](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript e typedRoutes do Next](#typescript)
- [Referência da API de runtime](#runtime-api)
- [Configuração do gerador](#configuration)
- [Nomes estáveis opcionais](#stable-names)
- [Casos especiais de descoberta](#discovery)
- [Atualização automática em desenvolvimento](#development)
- [CLI e CI](#cli)
- [API programática do gerador](#generator-api)
- [Erros e solução de problemas](#errors)
- [Rewrites e limites](#boundaries)
- [Site de documentação](#website)
- [Teste: demos por framework](#demos)
- [Contribua passo a passo](#contributing)
- [Versões e atualizações](#versioning)

<a id="overview"></a>

## O que ele faz

O Triooo Named Routes descobre as páginas que seu framework já roteia e gera helpers de URL tipados. Crie uma página, importe route e navegue pelo nome inferido. O sistema de arquivos continua sendo a fonte de verdade.

O Next.js (App Router, Pages Router, diretórios src e migrações mistas) é integrado pelo withNamedRoutes. Nuxt, roteamento por arquivos do Vue Router, SvelteKit, Astro, flat routes do React Router/Remix e TanStack Router são descobertos por adaptadores de convenção e mantidos atualizados por um plugin Vite. Apps que declaram rotas manualmente usam o mesmo runtime tipado com um manifesto escrito à mão.

Todos os frameworks convergem para uma sintaxe de padrão e uma regra de nomes: app/users/[user]/page.tsx, pages/users/[user].vue, src/routes/users/[user]/+page.svelte e app/routes/users.$user.tsx viram users.$user. URLs com idioma (next-intl, i18n do Pages Router, @nuxtjs/i18n e similares) são suportadas desde a v1.

O runtime de URLs funciona no navegador sem imports de framework ou Node.js. O gerador Node lê caminhos de arquivos; nunca executa suas páginas. As ferramentas exigem Node.js 20.19+ e os tipos exportados, TypeScript 5+. Next 16 e Vite 7 são cobertos por testes de integração reais.

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```


<a id="comparison"></a>

## Comparação com alternativas

Vários pacotes e recursos de frameworks também geram URLs tipadas. Eles diferem em de onde vêm as rotas, se as rotas têm nomes, quais frameworks cobrem e se os idiomas fazem parte do modelo. As tabelas resumem o que cada projeto documenta ou publica; os números do npm são a versão mais recente e os downloads do último mês, coletados em 2026-11-05. ✓ significa suportado, ½ parcial, — não oferecido ou não documentado.

**Onde este pacote se diferencia.** Os nomes são inferidos dos arquivos que você já tem e ficam idênticos entre Next.js, Nuxt, Vue, SvelteKit, Astro, React Router e TanStack Router; os idiomas (prefixos, caminhos traduzidos, domínios) fazem parte da mesma chamada tipada; e route() retorna uma string simples que funciona fora de qualquer router: redirects, e-mails, sitemaps ou um pacote compartilhado por vários apps em um monorepo.

**Quando outra escolha é melhor.** Se você usa um único framework e não se importa em identificar rotas pelo caminho, o recurso nativo dele dispensa dependências. Se precisa validar search params contra um schema (Zod, Valibot), next-typesafe-url e next-safe-navigation fazem isso e este pacote não. Se suas rotas vivem num backend Laravel, o Ziggy é o encaixe natural. O next-routes atende o Pages Router legado com React 15/16, e o pacote next-named-routes sem escopo é um projeto de 2022 sem relação, apenas com nome parecido.

**Nativos dos frameworks.** typedRoutes do Next.js, href() do React Router, resolve() do SvelteKit e o TanStack Router tipam caminhos escritos na sintaxe do próprio framework; o typedPages do Nuxt tipa os nomes de rota do Nuxt. Eles funcionam dentro de um framework e não compartilham nomes nem um modelo de idiomas com outros. O getRelativeLocaleUrl() do Astro monta URLs de idioma a partir de um caminho não tipado.

**Pacotes**

| Pacote | Frameworks | Rotas vêm de | Nomes | Parâmetros tipados | i18n | Gerador de URL | npm (última · mês) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/next-named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| next-named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**Nativos dos frameworks**

| Framework | Recurso | Chave da rota | Parâmetros tipados | Nomes compartilhados entre frameworks | Idiomas |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |


<a id="installation"></a>

## Instalação

Instale o pacote com o gerenciador que preferir. Ele não tem dependências de runtime. O gerador exige Node.js 20.19 ou superior.

Depois conecte uma única vez: withNamedRoutes no next.config para Next.js, ou o plugin Vite namedRoutes() nos frameworks baseados em Vite. Também é possível usar a CLI named-routes (generate, check, watch) em qualquer projeto.

```sh
npm install @triooo/next-named-routes
# pnpm
pnpm add @triooo/next-named-routes
# Yarn
yarn add @triooo/next-named-routes
# Bun
bun add @triooo/next-named-routes
```


<a id="quick-start"></a>

## Configuração única no Next.js

Envolva a configuração existente do Next uma única vez. Não é necessário cadastrar rotas, anotar páginas ou executar outro watcher. São aceitos objetos, Promises e funções assíncronas de configuração do Next.

O módulo gerado usa src/routes.generated.ts por padrão e exporta routes, route e RouteName. Ele é criado antes do dev/build. Use o helper em Server Components, Client Components ou no Pages Router.

O alias @/routes.generated abaixo pressupõe que @/* aponta para src/*. Se ele aponta para a raiz, use @/src/routes.generated ou um import relativo. A configuração do Next pode continuar em next.config.mjs ou usar next.config.ts.

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/next-named-routes/next";
export default withNamedRoutes({ reactStrictMode: true });

// In your application:
import { route } from "@/routes.generated";
route("user.profile");
route("users.$user", { user: "ana" });
```


<a id="frameworks"></a>

## Outros frameworks (plugin Vite)

Adicione namedRoutes() de @triooo/next-named-routes/vite aos plugins Vite do Nuxt (vite.plugins no nuxt.config), Vue, SvelteKit, Astro (vite.plugins no astro.config), React Router ou TanStack Router. Ele gera ao iniciar ou compilar o Vite e regenera quando arquivos são criados, removidos ou renomeados, usando o watcher do próprio Vite.

O framework é detectado pelo package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev ou @remix-run/dev, plugin/CLI/Start do TanStack Router, unplugin-vue-router ou vue-router). Defina framework explicitamente em monorepos ou quando a detecção for ambígua. Execute npx named-routes init para criar uma configuração para o framework detectado.

As convenções são convertidas para a sintaxe do runtime. Nuxt e Vue: index, [id], [[id]] opcional, [...slug] (aceita resto vazio, então vira [[...slug]]), pastas (grupo), aninhamento parent.vue + parent/, segmentos mistos como v[major]-[minor]; no Vue, pontos também aninham (users.edit.vue) e [id]+ indica parâmetro repetível. O Nuxt ignora arquivos iniciados por - e, com includeApi, varre server/api (com prefixo /api) e server/routes, removendo sufixos .get/.post.

SvelteKit: arquivos +page.*, [id=matcher] (o matcher é descartado), [[lang]], [...rest] (zero ou mais segmentos), (grupo), escapes [x+2f] e endpoints +server com includeApi. Astro: src/pages com .astro/.md/.mdx/.html, arquivos _privados ignorados, parâmetros [...slug] e endpoints .ts/.js com includeApi.

Flat routes do React Router / Remix (app/routes): pontos aninham, _index, $param, ($opcional), splat $ (chamado splat), layouts _sem-caminho, opt-out nome_, escapes [.] e módulos pasta/route.tsx. TanStack Router (src/routes): arquivos planos e em pastas, index/route, $param, {-$opcional}, prefixo{$param}, splat $ (chamado _splat), _layouts, arquivos -ignorados, (grupos) e arquivos .lazy. Segmentos estáticos opcionais como (beta) não podem ser nomeados; exclua o arquivo ou use extraRoutes.

Caminhos declarados dentro de componentes (definePageMeta({ path }) do Nuxt, routes.ts do React Router) não são visíveis para um scanner de arquivos: mapeie essas URLs com extraRoutes ou use o manifesto manual descrito a seguir.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";
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

Envolva o next.config com withNamedRoutes de @triooo/next-named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

**Convenções.** app/ e pages/ (ou src/app e src/pages) são lidos juntos. App Router: apenas arquivos page; grupos de rotas e slots paralelos são omitidos, interceptações resolvem para a URL canônica, pastas _privadas são ignoradas e %5F vira underscore. Pages Router: index é removido e _app, _document e _error são ignorados. Route Handlers e pages/api são opcionais via includeApi. appDir e pagesDir apontam para pastas personalizadas (ou false para ignorar uma).

**Navegação.** O helper retorna strings para next/link, useRouter de next/navigation ou next/router e redirect. Link e router adicionam o basePath sozinhos; passe { basePath: true } apenas para âncoras simples ou fetch. Com next-intl, passe o objeto routing como i18n: app/[locale]/about vira about e o Link do next-intl recebe o caminho interno.

**Verificado.** Servidores reais do Next 16 (App Router e Pages Router, com basePath e descoberta de páginas ao vivo) rodam no CI. Demos: examples/app-router e examples/pages-router. Veja também as receitas de App Router e Pages Router.

```tsx
import { withNamedRoutes } from "@triooo/next-named-routes/next";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { namedRoutes } from "@triooo/next-named-routes/vite";
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
import { createRoutes } from "@triooo/next-named-routes";
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


<a id="naming"></a>

## Regras de nomes automáticos

Segmentos estáticos são unidos por pontos. Parâmetros dinâmicos, opcionais, catch-all e catch-all opcionais usam $ seguido do nome do parâmetro; segmentos mistos como v[major]-[minor] viram v$major-$minor. A página raiz é home. O cifrão diferencia um parâmetro dinâmico de um segmento literal.

Nomes de arquivo do framework (page.tsx, index, +page.svelte, _index, route.tsx) não viram segmentos do nome. Grupos de rotas, slots paralelos e layouts sem caminho são omitidos. Criar, mover ou excluir uma página altera o nome público inferido; aliases opcionais preservam um nome estável quando URLs mudam.

O estilo é configurável com naming: separator (padrão "."), paramPrefix (padrão "$", pode ser vazio) e home (padrão "home"). Em uma configuração JavaScript ou TypeScript, naming.transform(rota) pode retornar outro nome para qualquer rota automática.

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```


<a id="app-router"></a>

## Exemplos com App Router

O helper retorna uma string de URL normal. Use com next/link, redirect ou useRouter do App Router, importado de next/navigation. Execute redirects no fluxo de servidor ou evento adequado; rotas nomeadas não mudam a semântica de redirect do Next.

Cada nome abaixo pressupõe uma página correspondente: posts/page.tsx, posts/[post]/page.tsx e posts/[post]/edit/page.tsx.

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```


<a id="pages-router"></a>

## Exemplos com Pages Router

Use o mesmo helper gerado. Em aplicações Pages Router, o hook do router vem de next/router. O Link não precisa de adapter. A descoberta pode examinar os dois diretórios durante uma migração, mas URLs canônicas conflitantes interrompem a geração.

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
```


<a id="parameters"></a>

## Parâmetros e codificação

[id] exige string não vazia ou número finito. [[id]] (Nuxt, Vue, SvelteKit, React Router, TanStack) é um escalar opcional; omiti-lo remove o segmento. [...slug] exige um array não vazio de strings/números. [[...slug]] aceita array opcional; valor omitido, null ou [] remove a parte catch-all. Segmentos mistos exigem todos os parâmetros que contêm.

Cada segmento de parâmetro é codificado separadamente. Uma barra dentro de um escalar é codificada; um array catch-all gera segmentos separados. Parâmetros extras, valores obrigatórios vazios, NaN, Infinity, objetos e segmentos . ou .. isolados falham. Essas verificações validam a construção da URL, não os identificadores de negócio da aplicação.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```


<a id="query-hash"></a>

## Query strings e fragmentos

Passe query e hash no terceiro argumento. A query aceita strings, números finitos, booleanos e arrays readonly desses valores. null e undefined são omitidos, inclusive dentro de arrays. Arrays repetem a chave; não usam colchetes.

O hash é uma string sem # inicial, codificada pelo helper. Ele fica no navegador e não é enviado ao servidor. Strings de hash e objetos de query são validados em runtime.

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```


<a id="base-path"></a>

## basePath, barras finais e origens

Next Link e navegação pelo router já adicionam basePath. As URLs relativas do helper o omitem por padrão para evitar prefixos duplicados. Para links comuns, fetch ou outras integrações, use basePath: true. absolute: true sempre inclui basePath e exige defaults.origin.

withNamedRoutes herda basePath e trailingSlash da configuração Next. Uma opção defaults explícita sobrescreve valores herdados. A origem deve usar HTTP(S), sem credenciais, caminho além da raiz, query ou hash; nunca é inferida do request ou de window.

Os defaults são serializados no módulo público gerado. Nunca inclua segredos. trailingSlash formata os caminhos gerados; redirects e normalização final continuam sendo responsabilidade do Next.

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```


<a id="i18n"></a>

## Idiomas e i18n

Configure i18n com locales, defaultLocale e, opcionalmente, localePrefix, pathnames e domains. O formato é o mesmo do defineRouting() do next-intl, então você pode passar esse objeto de routing diretamente; chaves exclusivas do next-intl, como localeCookie, são aceitas e ignoradas. Em projetos Next.js com Pages Router, o withNamedRoutes herda automaticamente o i18n do next.config (localePrefix as-needed, incluindo domains).

Uma primeira pasta dinâmica chamada locale ou lang (app/[locale]/…, pages/[lang]/…, altere com localeParam) é removida dos nomes e padrões: app/[locale]/about/page.tsx vira about → /about. Pastas físicas de idioma (src/pages/pt/about.astro) são mescladas na mesma rota. Sem pasta de idioma (i18n do Pages Router, @nuxtjs/i18n, rewrites de middleware), todas as páginas são localizadas. Endpoints e rotas fora de [locale] ficam como unlocalized e nunca recebem prefixo.

route(nome, params) sem locale retorna o caminho interno, que é o esperado pelo Link do next-intl, pelo Link do Pages Router e pelo localePath do @nuxtjs/i18n. Passe { locale } para âncoras simples, redirects, sitemaps, e-mails ou seletores de idioma. route.forLocale(locale) retorna um helper vinculado a esse idioma, e route.locales() lista os idiomas configurados.

localePrefix: always (padrão) prefixa todos os idiomas; as-needed omite o idioma padrão; never omite todos os prefixos; { mode, prefixes: { "en-US": "/us" } } personaliza os prefixos. pathnames mapeia um padrão interno para padrões traduzidos com os mesmos parâmetros. Com absolute: true, um idioma atendido por um domínio configurado usa esse domínio como origem. Os idiomas são tipados: o módulo gerado exporta RouteLocale e idiomas desconhecidos são erros de tipo e de runtime.

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```


<a id="typescript"></a>

## TypeScript e typedRoutes do Next

Padrões literais inferem a união de nomes e os objetos de parâmetros. Parâmetros obrigatórios são verificados na compilação; catch-all opcionais podem ser chamados sem parâmetros. O runtime também valida chamadas em JavaScript.

route() retorna string, não o tipo Route gerado pelo Next. Com typedRoutes ativado, a validação adicional do Link pode exigir uma asserção Route. O pacote continua verificando nomes e parâmetros. Não use asserções para transformar entradas arbitrárias não confiáveis em nomes de rota.

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```


<a id="runtime-api"></a>

## Referência da API de runtime

route(nome, params?, opções?) retorna uma string de URL. params só é opcional quando o padrão não tem parâmetros obrigatórios. options contém query, hash, absolute, basePath e locale. route.has(nome) verifica a existência e restringe uma string a um nome conhecido; route.names() retorna os nomes; route.pattern(nome, locale?) retorna o padrão original ou traduzido; route.locales() lista os idiomas; route.forLocale(locale) retorna um helper vinculado a um idioma.

createRoutes(manifesto, defaults?) cria um helper congelado e independente e copia o manifesto. Defaults contém basePath, trailingSlash, origin e i18n. parsePattern(padrão) retorna segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed e valida a sintaxe; formatPattern faz o inverso e patternParameters lista os nomes dos parâmetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes e PatternSegment são tipos exportados.

Um manifesto tipado como Record<string, string> simples (por exemplo, carregado de JSON) também funciona: os nomes viram string e os parâmetros, um registro flexível, enquanto o runtime continua validando cada chamada.

```ts
import { createRoutes } from "@triooo/next-named-routes";
const route = createRoutes({
  "users.show": "/users/[user]",
  search: "/search/[[...terms]]",
});
route("users.show", { user: 1 });
route.names(); // ["users.show", "search"]
route.pattern("users.show"); // /users/[user]
const input: string = "search";
if (route.has(input)) console.log(route.pattern(input));
```


<a id="configuration"></a>

## Configuração do gerador

Nenhum arquivo de configuração é obrigatório. Arquivos opcionais são procurados nesta ordem: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. Configurações TypeScript exigem Node.js 22.18+ (remoção nativa de tipos); use .mjs em versões anteriores. Exporte defineConfig({...}) de @triooo/next-named-routes/config para ter autocomplete. A flag --config da CLI seleciona outro arquivo; root dentro da configuração é relativo ao próprio arquivo. Opções desconhecidas ou com erro de digitação falham com INVALID_CONFIG.

Descoberta: framework (auto por padrão, ou next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app ou pages), appDir/pagesDir (pastas personalizadas do Next.js ou false), routesDir (pasta de páginas/rotas personalizada nos outros frameworks), pageExtensions (padrões de cada framework; extensões compostas como page.tsx funcionam), includeApi (false), exclude (globs relativos à raiz com *, ** e ?).

Nomes: names (padrão de URL → nome personalizado; todo caminho deve existir), extraRoutes (nome → padrão explícito, por exemplo destinos de rewrites), naming (separator, paramPrefix, home, transform) e i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Saída: output (padrão src/routes.generated.ts; .ts, .mts, .js ou .mjs, nunca dentro de um arquivo roteável), importSource (módulo de onde o arquivo gerado importa createRoutes; padrão, o nome do pacote), exportNames (renomeia routes, route, RouteName e RouteLocale) e defaults (basePath, trailingSlash e origin públicos; apenas essas chaves são serializadas). Os plugins aceitam watch (padrão true); o withNamedRoutes também aceita watchInterval (750 ms, 25–60000). Opções passadas ao plugin sobrescrevem o arquivo de configuração.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/next-named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/next-named-routes",
  exportNames: { route: "url", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", trailingSlash: false },
});
```


<a id="stable-names"></a>

## Nomes estáveis opcionais

Nomes automáticos acompanham a estrutura da URL. Se uma refatoração mover uma URL pública e você precisar de um nome semântico estável, atualize o mapa opcional names. Todo caminho apelidado deve existir. Rotas não listadas mantêm nomes automáticos. Nomes duplicados e erros de digitação interrompem a geração.

Um nome personalizado substitui o automático daquele caminho; não adiciona um segundo alias automaticamente. Isso é útil para nomes no estilo Laravel, como posts.show, mas não é obrigatório no fluxo normal.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```


<a id="discovery"></a>

## Casos especiais de descoberta

Next.js: o scanner considera app e pages juntos. O diretório app na raiz tem prioridade sobre src/app, independentemente da mesma regra entre pages/src/pages. Os outros frameworks usam suas pastas padrão (Nuxt app/pages ou pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes), a menos que routesDir seja definido. Symlinks de diretório, pastas ocultas e node_modules não são seguidos; arquivos .d.ts são ignorados.

App Router: por padrão, apenas arquivos page são incluídos. Grupos e slots não compõem URLs. Interceptações são resolvidas para caminhos canônicos e variantes equivalentes são consolidadas. Pastas privadas _ são ignoradas; %5F produz um underscore público. Arquivos layout, loading, default, error e de metadados são excluídos.

Pages Router: _app, _document e _error da raiz são excluídos; outras páginas com underscore continuam válidas. index é removido. API Routes, Route Handlers e endpoints dos outros frameworks são opcionais via includeApi ou --api. As URLs não modelam métodos HTTP, permissões ou validação de endpoints.

Formatos de URL conflitantes (por exemplo, [id] e [slug] no mesmo lugar) e colisões de nomes inferidos interrompem a geração. No Next.js, URLs canônicas duplicadas e conflitos de especificidade com catch-all opcional também falham, assim como no Next. Em routers com layouts aninhados (Nuxt, Vue, React Router, TanStack), um layout e seu index com a mesma URL são mesclados em uma única rota.


<a id="development"></a>

## Atualização automática em desenvolvimento

Next.js: o wrapper gera antes de o Next iniciar e depois executa um watcher por polling serializado dentro do processo de desenvolvimento. Ele percebe páginas criadas, removidas e renomeadas; o módulo só muda quando seu conteúdo muda. Nenhum hook de webpack ou Turbopack é alterado. Nunca escreve durante o next start (servidor de produção), então deploys somente leitura são seguros.

Frameworks Vite: o plugin gera no buildStart e reage aos eventos add/unlink do watcher do Vite, além de mudanças no arquivo de configuração do named-routes. Ele encontra a raiz do projeto subindo a partir da raiz do Vite até o package.json, então o srcDir do Nuxt funciona.

Os watchers não rodam em builds de produção e não mantêm o processo vivo sozinhos. Um erro de geração durante a edição preserva o último módulo válido e registra o erro. Mudanças em módulos importados pela configuração exigem reinício. watch: false desativa apenas as atualizações contínuas, não a geração inicial.


<a id="cli"></a>

## CLI e CI

O binário se chama named-routes (next-named-routes é um alias). generate (padrão) escreve o manifesto. list imprime as entradas descobertas em JSON. check compara sem escrever e sai com código 1 quando está desatualizado. watch gera inicialmente e acompanha até SIGINT/SIGTERM. init cria named-routes.config.mjs para o framework detectado e nunca sobrescreve uma configuração existente.

Flags: --root <diretório>, --config <arquivo>, --framework <nome>, --output <arquivo>, --routes-dir <pasta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --version (-v), --help (-h). Execute os comandos no projeto consumidor com o pacote instalado localmente.

Se você versiona o arquivo gerado, rode check antes do build. As integrações regeneram durante o build, então um check após esse build não detecta um arquivo versionado que já estava desatualizado. A geração é determinística, atômica e sem timestamps. Arquivos existentes sem a assinatura do gerador nunca são sobrescritos.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```


<a id="generator-api"></a>

## API programática do gerador

discoverRoutes(opções?) retorna root, framework, directories, routes, entries e os defaults do runtime sem escrever. Cada entrada tem name, path, file, router, framework e, opcionalmente, variant e localized. Rotas extras explícitas têm file: null e router: explicit.

generateRoutes(opções?, { check?: boolean }?) também retorna output e changed. O modo check rejeita saída desatualizada sem modificá-la. validateOptions(opções) lança INVALID_CONFIG para chaves desconhecidas. Importe /generator e /config apenas em ferramentas Node, nunca em código cliente. withNamedRoutes vem de /next e namedRoutes de /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/next-named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```


<a id="errors"></a>

## Erros e solução de problemas

NamedRouteError estende Error e expõe um code estável. UNKNOWN_ROUTE indica nome ausente; MISSING_PARAMETER indica valor obrigatório omitido; UNKNOWN_PARAMETER indica chave extra que pertence à query ou foi digitada errado; INVALID_PARAMETER indica formato inválido ou segmento proibido; INVALID_LOCALE indica idioma passado sem i18n ou não configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identificam definições de rota malformadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identificam opções inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rejeitam defaults de URL. MISSING_ORIGIN exige uma origin antes de pedir URLs absolutas. GENERATION_ERROR cobre conflitos de descoberta, saída insegura e check desatualizado; INVALID_CONFIG cobre configuração ausente, malformada ou com erro de digitação.

Não encontra routes.generated: confirme que a integração está rodando, execute generate e verifique output/aliases de import. basePath ou idioma duplicado: use URLs relativas com os links do framework e passe basePath/locale apenas para URLs simples. Nomes desatualizados: confirme que o watcher está ativo e veja os erros do terminal. Erro de tipo após mover uma página é esperado: atualize o nome inferido ou defina um nome estável.

A geração se recusa a sobrescrever um arquivo escrito manualmente. Escolha outro output em vez de adicionar a assinatura de gerado a um código não relacionado. Mantenha a saída gerada fora de arquivos roteáveis. A interpolação dinâmica não autoriza uma requisição; valide permissões e entradas no destino.

```ts
import { NamedRouteError } from "@triooo/next-named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```


<a id="boundaries"></a>

## Rewrites e limites

Este é um construtor de URLs, não um substituto para router, middleware, autorização ou cliente HTTP. Não cria rotas em runtime, não verifica a existência de recursos, não detecta o idioma do visitante e não faz requests de backend.

Redirects, rewrites, detecção de idioma por middleware e caminhos declarados no código dos componentes continuam sendo responsabilidade da aplicação. Mapeie explicitamente padrões externos ou reescritos com extraRoutes e evite aplicar locale ou basePath duas vezes. O scanner não lê arquivos de configuração do framework; use o withNamedRoutes ou as opções para repassar configurações.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```


<a id="website"></a>

## Site de documentação

Esta documentação é um app Next.js em website/. É o site público do projeto, construído com o próprio pacote: todos os links internos usam route(), o playground e as páginas de destino são rotas reais do App Router, e o conteúdo em inglês, português, espanhol e japonês vem do mesmo docs/content.json que gera os READMEs.

A landing page mostra cada framework suportado como uma linha de um mapa de metrô, um painel de partidas alimentado com saídas reais do gerador, uma tabela de compatibilidade e uma jornada de instalação. As animações são finitas ou acionadas pelo usuário, pausam fora da tela e são desativadas por prefers-reduced-motion.

Para publicar na Vercel, crie um projeto com Root Directory em website e mantenha "Include files outside the root directory" ativado. O website/vercel.json instala o repositório, compila o pacote e depois compila o site. Nenhuma variável de ambiente é necessária.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```


<a id="demos"></a>

## Teste: demos por framework

examples/ tem um app pequeno e executável para cada configuração suportada: app-router e pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router e react (rotas declaradas manualmente com createRoutes). Cada um aponta por nome para uma página estática, uma página dinâmica de usuários e uma página catch-all de docs.

As demos dependem do pacote via file:../.., então compile o pacote uma vez na raiz do repositório e depois instale e rode qualquer demo com npm. O módulo gerado aparece no primeiro dev ou build e muda conforme você cria páginas. Cada demo é compilada com o framework real.

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```


<a id="contributing"></a>

## Contribua passo a passo

**1. Pré-requisitos.** Instale Node.js 20.19 ou superior (22.18+ se quiser carregar arquivos named-routes.config.ts), Git e Python 3 (usado apenas para gerar os READMEs). Ative o pnpm 12.16.1, a versão fixada no package.json: corepack enable ou npm install --global pnpm@12.16.1.

**2. Clone e compile.** Clone o repositório, rode pnpm install na raiz e depois pnpm build. O build limpa o dist/ e compila src/*.ts para JavaScript ESM, declarações e source maps. Rode pnpm build de novo a cada mudança em src/: o site e as demos usam o dist/, não os fontes TypeScript.

**3. Conheça a estrutura.** src/index.ts é o runtime que roda no navegador (createRoutes, i18n, padrões); src/frameworks.ts tem os adaptadores de convenção de arquivos; src/generator.ts descobre, valida e escreve o módulo; src/config.ts carrega named-routes.config.*; src/next.ts e src/vite.ts são as integrações; src/cli.ts é o binário named-routes. tests/ tem a suíte Node e os smoke tests. docs/locales.json lista os idiomas, docs/content.json guarda a documentação multilíngue e website/messages/<código>.json os textos da interface. website/ é este site, examples/ tem uma demo por framework e scripts/ tem os utilitários de release, documentação e idiomas.

**4. Teste enquanto desenvolve.** pnpm check compila e roda todos os testes Node mais os contratos TypeScript positivos e negativos; é o que o CI executa no Node 20, 22, 24 e 26. pnpm test:next inicia servidores reais do Next.js (instale antes examples/app-router com pnpm --dir examples/app-router install). pnpm test:vite inicia um servidor Vite real. pnpm test:package empacota o tarball e o instala em um projeto limpo. pnpm release:check roda todos eles.

**5. Edite a documentação.** docs/content.json é a fonte única do site e de todos os READMEs. Cada seção tem id, title.<código>, paragraphs.<código> (uma lista de parágrafos por idioma), code e language; os códigos são en, pt, es e ja. O inglês é o idioma de origem: escreva primeiro o texto em inglês e mantenha o mesmo número de parágrafos em todos os idiomas. **texto** vira negrito no site e no README. Uma seção nova também precisa entrar em um grupo de website/lib/docs.ts (com título em todos os idiomas), senão não aparece na barra lateral. A página dela é /docs/<id>.

**6. Traduza e sincronize os idiomas.** Rode pnpm locales (node scripts/sync-locales.mjs) depois de mudar textos em inglês. Ele compara cada idioma com o inglês em docs/content.json e website/messages/*.json, preenche o que faltar com o texto em inglês para o site continuar funcionando, remove chaves da interface que não existem mais no inglês, reordena as chaves conforme o en.json e imprime a lista "Needs translation". Traduza cada item listado no seu idioma e depois rode pnpm locales:check (node scripts/sync-locales.mjs --check): ele não altera nada e falha quando faltam títulos ou parágrafos, quando o número de parágrafos é diferente, quando os marcadores **negrito** estão desbalanceados, quando faltam ou sobram chaves da interface, quando placeholders ICU como {count} diferem, quando as chaves estão fora de ordem ou quando um idioma não está em website/lib/locales.ts. O CI roda esse check. node scripts/sync-locales.mjs --untranslated também lista textos que ainda estão iguais ao inglês, útil para revisar um idioma antes de uma release.

**7. Sincronize os READMEs.** Rode pnpm docs (python3 scripts/sync-docs.py) para gerar README.md, README.pt-BR.md, README.es.md e README.ja.md a partir de docs/content.json e docs/locales.json e versione todos eles. pnpm docs:check falha quando qualquer README está desatualizado; o CI roda esse check, então nunca edite os READMEs à mão. A ordem usual é: editar o inglês, pnpm locales, traduzir, pnpm locales:check, pnpm docs.

**8. Adicione um idioma novo.** (a) Adicione uma entrada em docs/locales.json com code, name, htmlLang, readme (por exemplo README.fr.md) e os rótulos do README contents, references e localGuide. (b) Adicione o código à união Locale em website/lib/locales.ts e um título para ele em cada grupo de website/lib/docs.ts. (c) Rode pnpm locales: ele cria website/messages/<código>.json e preenche docs/content.json com o texto em inglês como provisório. (d) Traduza cada item que ele listar. (e) Adicione o README novo à lista files do package.json. (f) Se a escrita precisar de outras fontes ou de quebra de linha diferente (como o japonês), adicione regras para html[lang="<código>"] em website/app/transit.css. (g) Rode pnpm locales:check, pnpm docs, pnpm --dir website check:i18n e pnpm --dir website build. O seletor de idioma do header passa a mostrar o idioma novo automaticamente.

**9. Edite os textos do site.** As strings da interface ficam em website/messages/<código>.json dentro de ui, com as mesmas chaves em todos os arquivos; a sintaxe ICU é verificada, então evite chaves sem escape e mantenha os placeholders idênticos. Adicione chaves novas primeiro no en.json, depois rode pnpm locales e traduza. pnpm --dir website check:i18n valida todos os catálogos. Os dados de frameworks da landing (linhas do painel, linhas do mapa, tabela de compatibilidade) ficam em website/lib/transit.ts e precisam corresponder a saídas reais do gerador.

**10. Rode o site.** Depois do pnpm build na raiz, rode pnpm --dir website install uma vez e pnpm --dir website dev (ou pnpm website). O site depende do pacote via link:.., então recompile o pacote e reinicie o servidor de desenvolvimento ao mudar src/. Troque de idioma com EN, PT, ES e JA no header. Antes de um pull request rode pnpm --dir website typecheck e pnpm --dir website build.

**11. Teste uma demo.** Cada pasta em examples/ é um app pequeno: cd examples/sveltekit (ou nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Crie uma página e veja o routes.generated.ts mudar. As demos de Next.js usam pnpm.

**12. Adicione um framework.** Escreva o adaptador em src/frameworks.ts (sources, extensions, skipDirectory, map) e ensine o detectFramework a reconhecer o pacote; adicione testes de convenção em tests/frameworks.test.mjs; crie uma demo em examples/ e inclua-a na matriz do workflow de demos; documente no docs/content.json em todos os idiomas; adicione a linha em website/lib/transit.ts somente depois que a demo compilar.

**13. Abra um pull request.** Mantenha a mudança focada, adicione testes de regressão, atualize o CHANGELOG.md na próxima versão, rode pnpm release:check, pnpm locales:check e pnpm docs:check e nunca versione arquivos gerados (dist/, routes.generated.ts, .next/, saída de build das demos); o .gitignore já os exclui.

**14. Releases (mantenedores).** Aumente a version no package.json, mova a entrada do CHANGELOG para ela, rode pnpm release:check e publique uma release no GitHub com a tag next-named-routes-vX.Y.Z. O workflow de publicação valida a tag, roda o CI de novo e publica no npm com provenance via trusted publishing do npm (nenhum token do npm é armazenado). Aplica-se a Licença Apache 2.0; as fontes incluídas mantêm suas licenças OFL.

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> next-named-routes && cd next-named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.md, .pt-BR, .es, .ja
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json website/lib/locales.ts website/lib/docs.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```


<a id="versioning"></a>

## Versões e atualizações

A versão 1.x define o contrato público para nomes inferidos, geração tipada de URLs, adaptadores de framework, i18n, o wrapper do Next.js, o plugin Vite e a CLI.

Versões patch preservam a API documentada enquanto corrigem bugs. Versões minor adicionam funcionalidades compatíveis, como novos adaptadores de framework. Mudanças incompatíveis exigem uma nova versão major. Consulte o changelog antes de atualizar.

Depois de atualizar, reinicie o servidor de desenvolvimento para regenerar o manifesto e execute o type check e os testes de navegação da aplicação. Se mover uma página e precisar preservar o nome público da rota, use um alias explícito.

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

## Referências oficiais

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
