# Named Routes

**O toolkit type-safe para rotas, URLs e assets.**

[English](README.md) · [Português](README.pt-BR.md) · [Español](README.es.md) · [日本語](README.ja.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

`@triooo/named-routes` · **v2.1.0** · [Guia de instalação local](LOCAL-DEVELOPMENT.pt-BR.md)

## Conteúdo

- [O que ele faz](#overview)
- [Instalação](#installation)
- [Configuração única no Next.js](#quick-start)
- [Outros frameworks (plugin Vite)](#frameworks)
- [Regras de nomes automáticos](#naming)
- [Documentação](#documentation)

<a id="overview"></a>

## O que ele faz

O Named Routes é o toolkit type-safe para rotas, URLs e assets. Ele descobre as páginas que seu framework já roteia e gera helpers tipados: route() para navegação, asset() para arquivos públicos e URLs de CDN, e helpers que leem, localizam e canonicalizam URLs existentes. O sistema de arquivos continua sendo a fonte da verdade.

Next.js usa withNamedRoutes, Nuxt usa o módulo nativo e Astro usa a integração nativa. Vue Router por arquivos, SvelteKit, React Router/Remix e TanStack Router usam o plugin Vite. Roteadores manuais usam o mesmo runtime tipado com um manifesto escrito à mão.

Todos os frameworks convergem para uma sintaxe de padrão e uma regra de nomes: app/users/[user]/page.tsx, pages/users/[user].vue, src/routes/users/[user]/+page.svelte e app/routes/users.$user.tsx viram users.$user. URLs com idioma (next-intl, i18n do Pages Router, @nuxtjs/i18n e similares) são suportadas desde a v1.

O runtime de URLs funciona no navegador sem imports de framework ou Node.js. O gerador Node lê caminhos de arquivos; nunca executa suas páginas. As ferramentas exigem Node.js 22.12+ e os tipos, TypeScript 5.4+. Cada exemplo de examples/ é instalado a partir do tarball empacotado, compilado, servido e navegado em um navegador real no CI.

Desde a 2.0 a tabela de rotas vem do próprio framework sempre que ele a publica (Nuxt, Vue Router 5, React Router, TanStack Router), então caminhos declarados em código, como definePageMeta({ path }) ou route() em app/routes.ts, também ganham nomes; route() retorna hrefs tipados por padrão.

```ts
// Next.js   app/users/[user]/page.tsx          → users.$user
// Nuxt      pages/users/[user].vue             → users.$user
// SvelteKit src/routes/users/[user]/+page.svelte → users.$user
// Remix/RR  app/routes/users.$user.tsx         → users.$user
route("users.$user", { user: 42 });                    // /users/42
route("users.$user", { user: 42 }, { locale: "pt" });  // /pt/users/42
```

<a id="installation"></a>

## Instalação

Instale o pacote com o gerenciador que preferir. Ele não tem dependências de runtime. O gerador exige Node.js 22.12 ou superior.

Conecte uma única vez: withNamedRoutes no next.config, @triooo/named-routes/nuxt em modules do Nuxt, @triooo/named-routes/astro em integrations do Astro, ou namedRoutes() de @triooo/named-routes/vite nos outros frameworks Vite. Para a CLI independente, use npx @triooo/named-routes generate.

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

<a id="quick-start"></a>

## Configuração única no Next.js

Envolva a configuração existente do Next uma única vez. Não é necessário cadastrar rotas, anotar páginas ou executar outro watcher. São aceitos objetos, Promises e funções assíncronas de configuração do Next.

O módulo gerado usa src/routes.generated.ts por padrão e exporta routes, route e RouteName. Ele é criado antes do dev/build. Use o helper em Server Components, Client Components ou no Pages Router.

O alias @/routes.generated abaixo pressupõe que @/* aponta para src/*. Se ele aponta para a raiz, use @/src/routes.generated ou um import relativo. A configuração do Next pode continuar em next.config.mjs ou usar next.config.ts.

**Caminho base.** Next.js fornece seu basePath automaticamente; os nomes e caminhos internos não mudam. Use basePath: true apenas quando o consumidor precisar do caminho público completo.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

```ts
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app" });

// In your application:
import { asset, route } from "@/routes.generated";
route("user.profile"); // /user/profile (Next Link)
route("users.$user", { user: "ana" }); // /users/ana
route("users.$user", { user: "ana" }, { basePath: true }); // /app/users/ana
asset("images/logo.svg"); // /app/images/logo.svg
```

<a id="frameworks"></a>

## Outros frameworks (plugin Vite)

Use namedRoutes() de @triooo/named-routes/vite em Vue, SvelteKit, React Router/Remix e TanStack Router. Registre @triooo/named-routes/nuxt em modules do Nuxt e o import padrão de @triooo/named-routes/astro em integrations do Astro. As integrações geram na inicialização/build e atualizam quando arquivos de rotas ou artefatos dos frameworks mudam.

O framework é detectado pelo package.json (nuxt, next, @sveltejs/kit, astro, @react-router/dev ou @remix-run/dev, plugin/CLI/Start do TanStack Router, unplugin-vue-router ou vue-router). Defina framework explicitamente em monorepos ou quando a detecção for ambígua. Execute npx @triooo/named-routes init para criar uma configuração para o framework detectado.

As convenções são convertidas para a sintaxe do runtime. Nuxt e Vue: index, [id], [[id]] opcional, [...slug] (aceita resto vazio, então vira [[...slug]]), pastas (grupo), aninhamento parent.vue + parent/, segmentos mistos como v[major]-[minor]; no Vue, pontos também aninham (users.edit.vue) e [id]+ indica parâmetro repetível. O Nuxt ignora arquivos iniciados por - e, com includeApi, varre server/api (com prefixo /api) e server/routes, removendo sufixos .get/.post.

SvelteKit: arquivos +page.*, [id=matcher] (o matcher é descartado), [[lang]], [...rest] (zero ou mais segmentos), (grupo), escapes [x+2f] e endpoints +server com includeApi. Astro: src/pages com .astro/.md/.mdx/.html, arquivos _privados ignorados, parâmetros [...slug] e endpoints .ts/.js com includeApi.

Flat routes do React Router / Remix (app/routes): pontos aninham, _index, $param, ($opcional), splat $ (chamado splat), layouts _sem-caminho, opt-out nome_, escapes [.] e módulos pasta/route.tsx. TanStack Router (src/routes): arquivos planos e em pastas, index/route, $param, {-$opcional}, prefixo{$param}, splat $ (chamado _splat), _layouts, arquivos -ignorados, (grupos) e arquivos .lazy. Segmentos estáticos opcionais como (beta) não podem ser nomeados; exclua o arquivo ou use extraRoutes.

Descoberta pelo framework (padrão desde a 2.0): quando o framework publica sua tabela final de rotas por um canal documentado, os nomes vêm dela, então caminhos declarados em código entram também. Nuxt: o módulo lê pages:resolved (path e alias de definePageMeta, páginas adicionadas por módulos). Vue Router 5: o typed-router.d.ts que ele gera (path de definePage). React Router: react-router routes --json (route(), index(), layout() e prefix() em app/routes.ts). TanStack Router: routeTree.gen.ts. Nada executa nem analisa o seu código. Enquanto o framework não escreveu a tabela, valem as convenções de arquivos acima e a CLI avisa; discovery: "files" mantém o scanner da 1.x. Next.js, SvelteKit e Astro não declaram rotas em código, então os arquivos são a fonte.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```ts
// vite.config.ts (Vue, SvelteKit, React Router, TanStack Router)
import { defineConfig } from "vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({ plugins: [namedRoutes({ routerBase: "/app" })] });
// Configure the same navigation base in the router itself.

// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});

// astro.config.mjs
import { defineConfig as defineAstroConfig } from "astro/config";
import namedRoutesAstro from "@triooo/named-routes/astro";
export default defineAstroConfig({
  base: "/app",
  integrations: [namedRoutesAstro()],
});

// Any component (adjust the import to your configured output):
import { asset, route } from "@/routes.generated";
route("users.$id", { id: 42 }); // internal path
route("users.$id", { id: 42 }, { basePath: true }); // /app/users/42
asset("images/logo.svg"); // /app/images/logo.svg
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

<a id="documentation"></a>

## Documentação

**[Primeiros passos](docs/pt/getting-started.md)** — [O que ele faz](docs/pt/getting-started.md#overview) · [Comparação com alternativas](docs/pt/getting-started.md#comparison) · [Instalação](docs/pt/getting-started.md#installation) · [Configuração única no Next.js](docs/pt/getting-started.md#quick-start) · [Regras de nomes automáticos](docs/pt/getting-started.md#naming)

**[Frameworks](docs/pt/frameworks.md)** — [Outros frameworks (plugin Vite)](docs/pt/frameworks.md#frameworks) · [Next.js](docs/pt/frameworks.md#nextjs) · [Nuxt](docs/pt/frameworks.md#nuxt) · [Vue Router](docs/pt/frameworks.md#vue) · [SvelteKit](docs/pt/frameworks.md#sveltekit) · [Astro](docs/pt/frameworks.md#astro) · [React Router / Remix](docs/pt/frameworks.md#react-router) · [TanStack Router](docs/pt/frameworks.md#tanstack-router) · [Rotas manuais (React, Vue, qualquer router)](docs/pt/frameworks.md#manual-routes)

**[Desenvolva com rotas](docs/pt/build-with-routes.md)** — [Exemplos com App Router](docs/pt/build-with-routes.md#app-router) · [Exemplos com Pages Router](docs/pt/build-with-routes.md#pages-router) · [Parâmetros e codificação](docs/pt/build-with-routes.md#parameters) · [Query strings e fragmentos](docs/pt/build-with-routes.md#query-hash) · [Query parameters tipados](docs/pt/build-with-routes.md#typed-query) · [Roteamento reverso e rota ativa](docs/pt/build-with-routes.md#reverse-routing) · [basePath, barras finais e origens](docs/pt/build-with-routes.md#base-path) · [Idiomas e i18n](docs/pt/build-with-routes.md#i18n) · [TypeScript e typedRoutes do Next](docs/pt/build-with-routes.md#typescript) · [Hrefs tipados para o typedRoutes do Next.js](docs/pt/build-with-routes.md#typed-hrefs)

**[Helpers de rotas](docs/pt/route-helpers.md)** — [route()](docs/pt/route-helpers.md#helper-route) · [route.localize()](docs/pt/route-helpers.md#helper-localize) · [route.match()](docs/pt/route-helpers.md#helper-match) · [route.parseQuery()](docs/pt/route-helpers.md#helper-parse-query) · [route.is()](docs/pt/route-helpers.md#helper-is) · [route.breadcrumbs()](docs/pt/route-helpers.md#helper-breadcrumbs) · [route.has()](docs/pt/route-helpers.md#helper-has) · [route.names()](docs/pt/route-helpers.md#helper-names) · [route.pattern()](docs/pt/route-helpers.md#helper-pattern) · [route.locales()](docs/pt/route-helpers.md#helper-locales) · [route.forLocale()](docs/pt/route-helpers.md#helper-for-locale)

**[Arquivos públicos](docs/pt/public-assets.md)** — [asset() / route.asset()](docs/pt/public-assets.md#assets) · [assetBase e CDN](docs/pt/public-assets.md#asset-base)

**[Referência da API](docs/pt/api-reference.md)** — [Referência da API de runtime](docs/pt/api-reference.md#runtime-api) · [Configuração do gerador](docs/pt/api-reference.md#configuration) · [Nomes estáveis opcionais](docs/pt/api-reference.md#stable-names) · [API programática do gerador](docs/pt/api-reference.md#generator-api)

**[Guias](docs/pt/guides.md)** — [Casos especiais de descoberta](docs/pt/guides.md#discovery) · [Atualização automática em desenvolvimento](docs/pt/guides.md#development) · [CLI e CI](docs/pt/guides.md#cli) · [Diagnóstico: named-routes doctor](docs/pt/guides.md#doctor) · [Erros e solução de problemas](docs/pt/guides.md#errors) · [Rewrites e limites](docs/pt/guides.md#boundaries)

**[Projeto](docs/pt/project.md)** — [Site de documentação](docs/pt/project.md#website) · [Teste: demos por framework](docs/pt/project.md#demos) · [Contribua passo a passo](docs/pt/project.md#contributing) · [Versões e atualizações](docs/pt/project.md#versioning) · [Atualizando da 1.x](docs/pt/project.md#migration)

**[Helpers avançados de URL](docs/pt/advanced-helpers.md)** — [Assets tipados](docs/pt/advanced-helpers.md#typed-assets) · [asset.has() / paths() / info()](docs/pt/advanced-helpers.md#asset-metadata) · [Versionamento de assets](docs/pt/advanced-helpers.md#asset-versioning) · [route.withQuery()](docs/pt/advanced-helpers.md#helper-with-query) · [route.alternates()](docs/pt/advanced-helpers.md#helper-alternates) · [route.canonical()](docs/pt/advanced-helpers.md#helper-canonical) · [route.withDefaults()](docs/pt/advanced-helpers.md#helper-with-defaults) · [Auditoria de rotas e assets](docs/pt/advanced-helpers.md#audit) · [Playground dos helpers](docs/pt/advanced-helpers.md#helpers-playground)

## Referências oficiais

[Next.js App Router](https://nextjs.org/docs/app) · [Pages Router](https://nextjs.org/docs/pages) · [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages) · [Vue Router file-based routing](https://router.vuejs.org/file-based-routing/file-based-routing) · [SvelteKit routing](https://svelte.dev/docs/kit/routing) · [Astro routing](https://docs.astro.build/en/guides/routing/) · [React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions) · [TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) · [next-intl routing](https://next-intl.dev/docs/routing)
