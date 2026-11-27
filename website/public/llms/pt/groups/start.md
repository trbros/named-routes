# Primeiros passos

# O que ele faz

Topic: `overview` · Named Routes v2.2.0

O Named Routes gera helpers de URL tipados a partir das rotas que seu framework já conhece. Use um nome estável em vez de reconstruir caminhos. Ele não substitui o roteador, não navega e não envia requisições HTTP. Comece pela instalação e escolha seu framework; consulte a referência quando precisar.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
---

# Instalação

Topic: `installation` · Named Routes v2.2.0

Instale com o gerenciador de pacotes. O gerador exige Node.js 22.12 ou superior e os contratos de tipo exigem TypeScript 5.4 ou superior. O runtime no navegador não tem dependências externas; o gerador Node usa um parser de declarações de endpoints.

```sh
npm install @triooo/named-routes
# pnpm
pnpm add @triooo/named-routes
# Yarn
yarn add @triooo/named-routes
# Bun
bun add @triooo/named-routes
```

Related topic IDs: frameworks, quick-start, configuration, mcp-installation
---

# Escolha seu framework

Topic: `frameworks` · Named Routes v2.2.0

Instale o pacote uma vez. Use a integração do seu framework, crie uma página e importe o helper gerado. Os links abaixo levam aos guias individuais de configuração, convenções, navegação, deploy, assets, internacionalização e endpoints.

Related topic IDs: nextjs, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual-routes
---

# Sua primeira rota nomeada (Next.js)

Topic: `quick-start` · Named Routes v2.2.0

Configuração mínima do Next.js: adicione o wrapper em next.config.ts, inicie o servidor de desenvolvimento e siga o guia de navegação do Next.js. Para outro framework, use sua página de configuração.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

Related topic IDs: nextjs-navigation, frameworks, generated-source, mcp-installation
---

# Regras de nomes automáticos

Topic: `naming` · Named Routes v2.2.0

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

# Leia o manifesto gerado

Topic: `generated-source` · Named Routes v2.2.0

Cada entrada mostra o arquivo de origem relativo. Chaves comuns são literais de string, sem o aviso de chave computada. __proto__ permanece computada por segurança. Nunca edite o módulo gerado: altere a rota ou a configuração e gere novamente.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
---

# Comparação com alternativas

Topic: `comparison` · Named Routes v2.2.0

Vários pacotes e recursos de frameworks também geram URLs tipadas. Eles diferem em de onde vêm as rotas, se as rotas têm nomes, quais frameworks cobrem e se os idiomas fazem parte do modelo. As tabelas resumem o que cada projeto documenta ou publica; os números do npm são a versão mais recente e os downloads do último mês, coletados em 2026-11-05. ✓ significa suportado, ½ parcial, — não oferecido ou não documentado.

**Onde este pacote se diferencia.** Os nomes são inferidos dos arquivos que você já tem e ficam idênticos entre Next.js, Nuxt, Vue, SvelteKit, Astro, React Router e TanStack Router; os idiomas (prefixos, caminhos traduzidos, domínios) fazem parte da mesma chamada tipada; e route() retorna uma string simples que funciona fora de qualquer router: redirects, e-mails, sitemaps ou um pacote compartilhado por vários apps em um monorepo.

**Quando outra escolha é melhor.** Se você usa um único framework e não se importa em identificar rotas pelo caminho, o recurso nativo dele dispensa dependências. Se precisa validar search params contra um schema (Zod, Valibot), next-typesafe-url e next-safe-navigation fazem isso e este pacote não. Se suas rotas vivem num backend Laravel, o Ziggy é o encaixe natural. O next-routes atende o Pages Router legado com React 15/16, e o pacote named-routes sem escopo é um projeto de 2022 sem relação, apenas com nome parecido.

**Nativos dos frameworks.** typedRoutes do Next.js, href() do React Router, resolve() do SvelteKit e o TanStack Router tipam caminhos escritos na sintaxe do próprio framework; o typedPages do Nuxt tipa os nomes de rota do Nuxt. Eles funcionam dentro de um framework e não compartilham nomes nem um modelo de idiomas com outros. O getRelativeLocaleUrl() do Astro monta URLs de idioma a partir de um caminho não tipado.

**Pacotes**

| Pacote | Frameworks | Rotas vêm de | Nomes | Parâmetros tipados | i18n | Gerador de URL | npm (última · mês) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **@triooo/named-routes** | Next.js, Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router | files · `createRoutes()` | ✓ `users.$user` | ✓ | ✓ | ✓ `route()` | 1.0.0 · new |
| nextjs-routes | Next.js | files | — `"/users/[id]"` | ✓ | ½ Pages Router | ✓ `route()` | 2.2.5 · 173k |
| next-typesafe-url | Next.js (peer ≤ 15) | files + Zod | — `"/users/[id]"` | ✓ + Zod | — | ✓ `$path()` | 6.1.0 · 41k |
| next-safe-navigation | Next.js App Router | `defineRoute()` | ✓ | ✓ + schema | — | ✓ `routes.name()` | 0.4.0 · 13k |
| vite-plugin-kit-routes | SvelteKit | files | — `"/about"` | ✓ | — | ✓ `route()` | 1.1.2 · 24k |
| typesafe-routes | any | `createRoutes({})` | ✓ `routes.users.edit` | ✓ | — | ✓ `renderPath()` | 12.3.0 · 25k |
| ziggy-js | any + Laravel | Laravel routes | ✓ Laravel | ✓ | — | ✓ `route()` | 2.6.5 · 567k |
| next-routes | Next.js Pages (React ≤ 16) | `routes.add()` | ✓ | — | — | ✓ `pushRoute()` | 1.4.2 · 49k |
| named-routes | Next.js Pages | `add(name, path)` | ✓ enum | ½ | — | ✓ `pathnameForParams()` | 0.1.0 · 0.3k |

**Nativos dos frameworks**

| Framework | Recurso | Chave da rota | Parâmetros tipados | Nomes compartilhados entre frameworks | Idiomas |
| --- | --- | --- | --- | --- | --- |
| Next.js 16 | `typedRoutes: true` | `"/users/[id]"` | ✓ | — | — |
| React Router 7 | `href()` | `"/users/:id"` | ✓ | — | — |
| SvelteKit 2.26+ | `resolve()` | `"/blog/[slug]"` | ✓ | — | — |
| Nuxt 4 | `experimental.typedPages` | `users-id` | ✓ | — | ½ @nuxtjs/i18n |
| TanStack Router | `<Link to>` | `"/posts/$postId"` | ✓ | — | — |
| Astro 5 | `getRelativeLocaleUrl()` | `string` | — | — | ✓ |
---

# Como a geração funciona

Topic: `architecture` · Named Routes v2.2.0

O gerador Node lê arquivos e tabelas de rotas do framework. Analisa declarações de endpoints estaticamente quando includeApi está ativo, sem executar handlers. A descoberta pode usar o comando de listagem do framework. O módulo gerado contém padrões públicos e helpers; o runtime do navegador não importa Node.js. O framework continua responsável por servir páginas e aplicar as regras de navegação.

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
