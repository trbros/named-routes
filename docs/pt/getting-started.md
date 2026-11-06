# Primeiros passos · @triooo/next-named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/getting-started.md) · [Português](../pt/getting-started.md) · [Español](../es/getting-started.md) · [日本語](../ja/getting-started.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [O que ele faz](#overview)
- [Comparação com alternativas](#comparison)
- [Instalação](#installation)
- [Configuração única no Next.js](#quick-start)
- [Regras de nomes automáticos](#naming)

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

---

[Voltar ao README](../../README.pt-BR.md) · Próximo: [Frameworks](frameworks.md) →
