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
