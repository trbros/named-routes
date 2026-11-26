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

<a id="nextjs"></a>

## Next.js

Envolva o next.config com withNamedRoutes de @triooo/named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

**Convenções.** app/ e pages/ (ou src/app e src/pages) são lidos juntos. App Router: apenas arquivos page; grupos de rotas e slots paralelos são omitidos, interceptações resolvem para a URL canônica, pastas _privadas são ignoradas e %5F vira underscore. Pages Router: index é removido e _app, _document e _error são ignorados. Route Handlers e pages/api são opcionais via includeApi. appDir e pagesDir apontam para pastas personalizadas (ou false para ignorar uma).

**Navegação.** O helper retorna strings para next/link, useRouter de next/navigation ou next/router e redirect. Link e router adicionam o basePath sozinhos; passe { basePath: true } apenas para âncoras simples ou fetch. Com next-intl, passe o objeto routing como i18n: app/[locale]/about vira about e o Link do next-intl recebe o caminho interno.

**Verificado.** Servidores reais do Next 16 (App Router e Pages Router, com basePath e descoberta de páginas ao vivo) rodam no CI. Demos: examples/app-router e examples/pages-router. Veja também as receitas de App Router e Pages Router.

Com typedRoutes: true na configuração do Next, os resultados de route() são aceitos por <Link>, router.push(), replace() e prefetch() sem casts, porque hrefs tipados são o padrão desde a 2.0; o wrapper avisa quando o typedRoutes encontra hrefs: "string". Verificado com o next typegen e o TypeScript reais no Next 16, nos dois routers, com webpack e Turbopack.

**CLI e mudanças na configuração.** Após dev/build, o prefixo efetivo é salvo em .named-routes/ para a CLI. Reinicie o Next após mudar basePath. Antes do primeiro build no CI, use defaults.basePath compartilhado ou --base-path. Para redirecionar URLs traduzidas, veja i18n e route.localize().

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```tsx
// next.config.ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({ basePath: "/app", typedRoutes: true });

// app/users/[user]/page.tsx → users.$user
import Link from "next/link";
import { asset, route } from "@/routes.generated";
// Next Link adds /app itself.
<Link href={route("users.$user", { user: "ana" })}>Ana</Link>;
// Plain anchors need the public path.
<a href={route("users.$user", { user: "ana" }, { basePath: true })}>Ana</a>;
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="nuxt"></a>

## Nuxt

Adicione "@triooo/named-routes/nuxt" a modules no nuxt.config. O módulo nomeia as rotas que o próprio Nuxt resolve (o hook pages:resolved), então definePageMeta({ path, alias }) e páginas adicionadas por outros módulos entram, e gera de novo quando você adiciona, move ou remove páginas durante o nuxt dev. Mantenha a saída dentro do diretório de código e importe-a com o alias ~: no Nuxt 4 (srcDir app/) use output app/routes.generated.ts e importe ~/routes.generated. As opções ficam no named-routes.config (compartilhado com a CLI) ou em namedRoutes no nuxt.config.

**Convenções.** app/pages ou pages: index.vue, [id], [[id]] opcional, [...slug] (também aceita resto vazio, então vira [[...slug]]), pastas (grupo), segmentos mistos como v[major]-[minor] e aninhamento parent.vue + parent/ mesclado em uma rota. Arquivos iniciados por - são ignorados. Com includeApi, server/api (com prefixo /api) e server/routes são lidos e os sufixos .get/.post são removidos.

**Navegação e i18n.** Use a URL com NuxtLink :to, navigateTo ou useRouter().push. Com @nuxtjs/i18n, configure os mesmos idiomas aqui: a estratégia prefix_except_default corresponde a localePrefix as-needed, prefix (ou prefix_and_default) a always e no_prefix a never. Assim route(nome, params, { locale }) retorna a URL localizada; sem locale você recebe o caminho interno para o localePath(). Caminhos traduzidos com defineI18nRoute precisam ser repetidos em i18n.pathnames.

**Limites e verificação.** O módulo também grava .nuxt/named-routes/pages.json, então named-routes check e generate veem as mesmas rotas depois do nuxt prepare. Liste-o antes de @nuxtjs/i18n em modules, para que ele veja as rotas antes de serem localizadas. O plugin Vite continua funcionando no Nuxt, mas só enxerga os arquivos. Os nomes seguem o estilo com pontos deste pacote (users.$id), não os nomes de rota do Nuxt (users-id). Verificado por testes de convenção e pelo examples/nuxt, que compila e roda com Nuxt 4, incluindo uma página com definePageMeta({ path }).

**URL base.** O módulo nativo herda app.baseURL. NuxtLink usa o prefixo do roteador, então mantenha to interno; href comum e fetch precisam de basePath: true. Reinicie o Nuxt após mudar app.baseURL para atualizar o cache da CLI.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```vue
// nuxt.config.ts
export default defineNuxtConfig({
  app: { baseURL: "/app/" },
  modules: ["@triooo/named-routes/nuxt"],
  namedRoutes: { output: "app/routes.generated.ts" },
});

<!-- app/pages/about.vue: definePageMeta({ path: "/sobre" }) → sobre -->

<!-- app/pages/users/[id].vue → users.$id -->
<script setup lang="ts">
import { asset, route } from "~/routes.generated";
</script>
<template>
  <!-- NuxtLink applies app.baseURL -->
  <NuxtLink :to="route('users.$id', { id: 42 })">User 42</NuxtLink>
  <!-- Plain HTML link: /app/users/42 -->
  <a :href="route('users.$id', { id: 42 }, { basePath: true })">User 42</a>
  <img :src="asset('images/logo.svg')" alt="Logo" />
</template>
<!-- File: public/images/logo.svg -->
```

<a id="vue"></a>

## Vue Router

Para apps Vue com roteamento por arquivos (vue-router/vite do Vue Router 5, ou unplugin-vue-router no Vue Router 4), adicione namedRoutes() antes de VueRouter() e vue() no vite.config. users/_parent.vue é tratado como o pai não navegável de users/, como no Vue Router 5.0.3+. O framework é detectado por unplugin-vue-router ou vue-router; src/pages é lido, a menos que routesDir indique outra pasta. Apps que declaram um array de rotas manualmente devem usar um manifesto manual.

**Convenções.** index.vue e (nome).vue são rotas index; pontos aninham (users.edit.vue é /users/edit); [id] e [[id]]; [id]+ é parâmetro repetível de um ou mais ([...id]) e [[id]]+ de zero ou mais ([[...id]]); [...path] também aceita resto vazio ([[...path]]); pastas (grupo) são omitidas; aninhamento parent.vue + parent/ é mesclado; segmentos mistos como v[major]-[minor] funcionam.

**Navegação.** Passe a URL para RouterLink :to ou router.push. O Vue Router resolve a string como qualquer caminho, então o pacote não precisa acessar a instância do router.

**Verificado.** Os nomes vêm do typed-router.d.ts que o Vue Router 5 grava (opção dts), então sobrescritas com definePage({ path }) são nomeadas pela URL que servem; antes de ele existir, os arquivos são varridos. Um servidor Vite real com essas convenções roda no CI, e o examples/vue compila, roda e é navegado em um navegador com Vue Router 5 (vue-router/vite), incluindo um layout users/_parent.vue e uma página com definePage({ path }).

**Base do history.** Se o roteador usa createWebHistory(import.meta.env.BASE_URL), defina inheritViteBase: true e o base do Vite como no exemplo. Caso contrário, passe o prefixo do history em routerBase; o base do Vite pode ser apenas de assets/CDN. RouterLink e router.push aplicam o prefixo; use basePath: true apenas em URLs públicas comuns.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite"; // Vue Router 5 (4: unplugin-vue-router/vite)
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  base: "/app/",
  plugins: [namedRoutes({ inheritViteBase: true }), VueRouter(), vue()],
});

// src/main.ts — use the same base in the actual router:
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

// src/pages/users/[id].vue → users.$id (inside the template)
import { asset, route } from "@/routes.generated";
<RouterLink :to="route('users.$id', { id: 42 })">User 42</RouterLink>
<img :src="asset('images/logo.svg')" alt="Logo" />
// File: public/images/logo.svg
```

<a id="sveltekit"></a>

## SvelteKit

Adicione namedRoutes() antes de sveltekit() no vite.config. Gerar o módulo em src/lib permite importá-lo como $lib/routes.generated em qualquer componente, função load ou endpoint.

**Convenções.** src/routes com +page.svelte, +page.ts ou +page.server.ts (eles se mesclam em uma rota); pastas (grupo) são omitidas; [id=matcher] mantém o parâmetro e descarta o matcher; [[lang]] é opcional; [...rest] aceita zero ou mais segmentos ([[...rest]]) e pode vir antes de segmentos estáticos; resets de layout +page@ são páginas normais; escapes [x+2f] e [u+0041] são decodificados. Endpoints +server são opcionais via includeApi.

**Navegação.** Passe o mesmo prefixo em routerBase e em paths.base do SvelteKit. Âncoras, goto e redirects precisam da URL pública; use { basePath: true } como terceiro argumento de route(). No SvelteKit 2, compartilhe kit.paths.base do svelte.config com vite.config; no SvelteKit 3, passe paths em sveltekit(), como abaixo.

**Verificação.** Os testes de convenção e a integração examples/sveltekit cobrem descoberta e navegação; o exemplo atual usa SvelteKit 3 com Svelte 5.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```svelte
// vite.config.ts (SvelteKit 3)
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});

<!-- src/routes/blog/[slug]/+page.svelte → blog.$slug -->
<script lang="ts">
  import { asset, route } from "$lib/routes.generated";
</script>
<!-- Public URL: /app/blog/hello -->
<a href={route("blog.$slug", { slug: "hello" }, { basePath: true })}>Hello</a>
<img src={asset("images/logo.svg")} alt="Logo" />
<!-- File: static/images/logo.svg -->
```

<a id="astro"></a>

## Astro

Registre a integração nativa de @triooo/named-routes/astro em integrations do astro.config. Ela herda o base final do Astro. Se migrar da configuração antiga, remova namedRoutes() de vite.plugins. O módulo é gerado em src/routes.generated.ts por padrão e pode ser usado no frontmatter .astro, em ilhas e endpoints.

**Convenções.** src/pages com páginas .astro, .md, .mdx, .markdown e .html; arquivos e pastas iniciados por _ são privados; [id]; [...slug] aceita zero ou mais segmentos ([[...slug]]); segmentos mistos como [lang]-[version]. Endpoints .ts/.js são opcionais via includeApi e mantêm a extensão interna (api/data.json.ts é /api/data.json).

**i18n.** As pastas físicas de idioma do Astro (src/pages/pt/about.astro) se mesclam na mesma rota nomeada que src/pages/about.astro quando o idioma está em i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed e true a always.

**Limites e verificação.** Builds estáticos continuam precisando de getStaticPaths nas páginas dinâmicas: o pacote constrói URLs, não enumera parâmetros. Verificado por testes de convenção e pelo examples/astro, que compila e roda com Astro 5.

**Publicação sob um prefixo.** Com base: "/app", route() continua retornando o caminho interno. Em um link HTML Astro, use o terceiro argumento { basePath: true } para obter /app/docs/guide/install. Reinicie o dev server Astro ou faça o build após mudar base; a CLI pode reutilizar o último prefixo gerado com sucesso ou receber --base-path.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```astro
// astro.config.mjs
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({
  base: "/app",
  integrations: [namedRoutes()],
});

---
// src/pages/docs/[...slug].astro → docs.$slug
import { asset, route } from "../../routes.generated";
---
<!-- Public URL: /app/docs/guide/install -->
<a href={route("docs.$slug", { slug: ["guide", "install"] }, { basePath: true })}>
  Install guide
</a>
<img src={asset("images/logo.svg")} alt="Logo" />
<!-- File: public/images/logo.svg -->
```

<a id="react-router"></a>

## React Router / Remix

Para o modo framework do React Router 7 e 8 (e Remix v2), adicione namedRoutes() antes de reactRouter() no vite.config. Os nomes vêm de react-router routes --json, a resolução do próprio framework para app/routes.ts, então arquivos de flatRoutes() e rotas declaradas com route(), index(), layout() e prefix() são todos descobertos. Uma boa saída é app/routes.generated.ts, fora de app/routes.

**Convenções.** Pontos aninham (concerts.$city.tsx é /concerts/[city]); _index é o index; $param; ($lang) é opcional ([[lang]]); um $ isolado é um splat chamado splat ([[...splat]]); prefixos _auth são layouts sem caminho; concerts_ sai do aninhamento; escapes [.] mantêm caracteres; uma pasta com route.tsx é uma rota e pastas mais profundas são ignoradas. Um layout e seu _index compartilham a URL e se mesclam.

**Navegação.** Use <Link to={route(...)}>, useNavigate() ou redirect() em loaders e actions.

**Limites e verificação.** Sem @react-router/dev instalado, ou quando o comando falha, os arquivos de flat routes acima são varridos e a CLI diz por quê. Segmentos estáticos opcionais como (beta) não podem ser nomeados; o gerador para com um erro claro para que você exclua o arquivo. Verificado por testes de convenção e pelo examples/react-router, que compila e roda com React Router 8, incluindo uma rota declarada com route() em app/routes.ts.

**Basename.** Compartilhe o mesmo valor entre basename do React Router e namedRoutes({ routerBase }). No Remix, use a configuração de basename equivalente e o mesmo routerBase; em um roteador manual, use createBrowserRouter(..., { basename }) e um manifesto manual quando necessário. Link e navegação já aplicam basename; use basePath: true em URLs HTML comuns.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```tsx
// react-router.config.ts
export default { basename: "/app" };

// vite.config.ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }),
    reactRouter(),
  ],
});

// app/routes/concerts.$city.tsx → concerts.$city
import { Link } from "react-router";
import { asset, route } from "../routes.generated";
// Link applies basename; do not pass basePath: true here.
<Link to={route("concerts.$city", { city: "lisbon" })}>Lisbon</Link>;
<a href={route("concerts.$city", { city: "lisbon" }, { basePath: true })}>Lisbon</a>;

// app/routes.ts: [...(await flatRoutes()), route("sobre", "about.tsx")] → sobre
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="tanstack-router"></a>

## TanStack Router

Adicione namedRoutes() junto do tanstackRouter() de @tanstack/router-plugin no vite.config. O plugin lê src/routes (ou app/routes) e escreve src/routes.generated.ts por padrão, fora da pasta de rotas, então ele nunca vira uma rota.

**Convenções.** __root é ignorado; index e route.tsx são a rota da pasta; arquivos planos (posts.$postId.tsx) e em pastas se misturam; $param; {-$locale} é opcional ([[locale]]); prefixo{$id}sufixo vira um segmento misto; um $ isolado é um splat chamado _splat ([[..._splat]]); _layout não tem caminho; posts_ sai do aninhamento; arquivos com prefixo - e pastas (grupo) são ignorados; arquivos .lazy pertencem à mesma rota.

**Quando usar.** O TanStack Router já tipa o próprio <Link to> pelo id da rota. Use route() onde é preciso uma string simples: <a href>, redirects para outros apps, e-mails, sitemaps, analytics, URLs com prefixo de idioma e nomes compartilhados com outros frameworks em um monorepo.

**Verificado.** Os nomes vêm do routeTree.gen.ts que o plugin ou a CLI do TanStack Router gera (seus caminhos navegáveis); antes de ele existir, os arquivos são varridos. Testes de convenção mais o examples/tanstack-router, que compila e roda com o plugin do TanStack Router.

**Basepath do roteador.** Defina createRouter({ routeTree, basepath: "/app" }) na aplicação e namedRoutes({ routerBase: "/app" }) no Vite. Configure o base do Vite separadamente para servir assets sob o prefixo. Use basePath: true em âncoras e defaults.origin se precisar de URLs absolutas. Ignore arquivos temporários .tanstack, não routeTree.gen.ts: a descoberta usa a tabela publicada.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```tsx
// vite.config.ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});

// src/main.tsx (existing router setup):
// const router = createRouter({ routeTree, basepath: "/app" });

// src/routes/posts/$postId.tsx → posts.$postId
import { asset, route } from "../../routes.generated";
<a href={route("posts.$postId", { postId: 42 }, { basePath: true })}>Share</a>;
<img src={asset("images/logo.svg")} alt="Logo" />;
// File: public/images/logo.svg
```

<a id="manual-routes"></a>

## Rotas manuais (React, Vue, qualquer router)

Quando as rotas são declaradas em código (<Route> do React Router, array de rotas do vue-router, servidores no estilo Express), escreva o manifesto com createRoutes. Você recebe a mesma inferência de nomes, checagem de parâmetros, codificação, query/hash, basePath e opções de i18n; apenas a descoberta é manual.

Os padrões usam a sintaxe de colchetes independentemente da sintaxe do router: /users/:id vira /users/[id], um :id? opcional vira [[id]] e um splat * vira [...splat] ou [[...splat]]. Mantenha o objeto literal (ou as const) para que nomes e parâmetros sejam inferidos.

Para compartilhar um módulo gerado mesmo assim (por exemplo, a partir de um pacote de monorepo), use framework: "manual" e liste as rotas em extraRoutes; o gerador escreve o mesmo módulo tipado sem varrer arquivos.

**Prefixo manual.** Defina basePath nos defaults de createRoutes() e configure o mesmo history base ou basename no roteador. Em projetos manuais com o generator, use defaults.basePath no named-routes.config. Os nomes nunca incluem o prefixo.

**Arquivos públicos.** Exporte `const asset = route.asset` do seu módulo manual e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

```tsx
// src/routes.ts
import { createRoutes } from "@triooo/named-routes";
export const route = createRoutes({
  home: "/",
  "users.show": "/users/[id]",       // <Route path="/users/:id">
  "docs.page": "/docs/[[...path]]",   // <Route path="/docs/*">
}, { basePath: "/app" });

// Configure basename/history base in your actual router too.
// React Router
<Link to={route("users.show", { id: 42 })}>Ana</Link>
// Vue Router
<RouterLink :to="route('users.show', { id: 42 })">Ana</RouterLink>
// Plain HTML anchor: /app/users/42
<a href={route("users.show", { id: 42 }, { basePath: true })}>Ana</a>;
// Public files: export the helper with the manual manifest.
export const asset = route.asset;
asset("images/logo.svg"); // /app/images/logo.svg
```

---

← Anterior: [Primeiros passos](getting-started.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Desenvolva com rotas](build-with-routes.md) →
