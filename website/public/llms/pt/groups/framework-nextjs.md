# Next.js

# Next.js: configuração

Topic: `nextjs` · Named Routes v2.2.0

Envolva o next.config com withNamedRoutes de @triooo/named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `nextjs-conventions` · Named Routes v2.2.0

Crie `app/users/[user]/page.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$user`. O framework continua responsável por renderizar a página.

**Convenções.** app/ e pages/ (ou src/app e src/pages) são lidos juntos. App Router: apenas arquivos page; grupos de rotas e slots paralelos são omitidos, interceptações resolvem para a URL canônica, pastas _privadas são ignoradas e %5F vira underscore. Pages Router: index é removido e _app, _document e _error são ignorados. Route Handlers e pages/api são opcionais via includeApi. appDir e pagesDir apontam para pastas personalizadas (ou false para ignorar uma).

**Verificado.** Servidores reais do Next 16 (App Router e Pages Router, com basePath e descoberta de páginas ao vivo) rodam no CI. Demos: examples/app-router e examples/pages-router. Veja também as receitas de App Router e Pages Router.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `nextjs-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## Com base path

URL no navegador: `/app/users/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url
---

# Base path e deploy

Topic: `nextjs-deployment` · Named Routes v2.2.0

Configure `basePath` no Next.js. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Arquivos públicos

Topic: `nextjs-assets` · Named Routes v2.2.0

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

Topic: `nextjs-i18n` · Named Routes v2.2.0

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

## Sem base path

URL no navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

## Com base path

URL no navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Endpoints HTTP

Topic: `nextjs-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `app/api/admin/route.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
---

# Exemplos com App Router

Topic: `app-router` · Named Routes v2.2.0

O helper retorna uma string de URL normal. Use com next/link, redirect ou useRouter do App Router, importado de next/navigation. Execute redirects no fluxo de servidor ou evento adequado; rotas nomeadas não mudam a semântica de redirect do Next.

Cada nome abaixo pressupõe uma página correspondente: posts/page.tsx, posts/[post]/page.tsx e posts/[post]/edit/page.tsx.

**Prefixo e URLs traduzidas.** O wrapper herda basePath. Mantenha Next Link e navegação do router internos; use basePath: true em âncoras comuns. Para redirecionar aliases traduzidos recebidos, use route.localize() com o idioma já selecionado no proxy ou middleware; consulte i18n.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

## Sem base path

URL no navegador: `/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## Com base path

URL no navegador: `/app/posts/42`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-router-push, nextjs-redirect, nextjs-deployment
---

# Exemplos com Pages Router

Topic: `pages-router` · Named Routes v2.2.0

Use o mesmo helper gerado. Em aplicações Pages Router, o hook do router vem de next/router. O Link não precisa de adapter. A descoberta pode examinar os dois diretórios durante uma migração, mas URLs canônicas conflitantes interrompem a geração.

**Prefixo e i18n.** Next Link e next/router usam basePath e locale da configuração. Mantenha route() interno para esses consumidores. Use basePath: true e, quando necessário, locale em URLs públicas comuns; route.localize() exige i18n configurado e não instala redirecionamentos automaticamente.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

## Sem base path

URL no navegador: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## Com base path

URL no navegador: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
---

# Hrefs tipados para o typedRoutes do Next.js

Topic: `typed-hrefs` · Named Routes v2.2.0

route() retorna tipos template literal em vez de string (o padrão desde a 2.0): route("users.$user", { user: 42 }) tem o tipo `/users/${string}`. O typedRoutes do Next.js aceita esses valores em <Link href>, router.push(), replace() e prefetch() nos dois routers sem cast, e outros routers tipados os aceitam como strings. Só os tipos mudam: as URLs são idênticas.

Chamadas com query ou hash retornam o caminho mais `?${string}` ou `#${string}`. Chamadas com absolute, basePath e locale retornam string, porque o Next adiciona basePath e idiomas por conta própria e rejeita URLs absolutas em links tipados. Segmentos opcionais viram uniões, então /shop/[[...path]] sem parâmetros tem o tipo "/shop"; o próprio typedRoutes do Next.js rejeita esse caminho base de um catch-all opcional, mesmo como literal, então passe um segmento nesse caso.

Um tipo de retorno mais estreito pode quebrar código que guarda uma rota numa variável depois reatribuída a outra string, como useState(route(...)) seguido de setState(window.location.href): anote a variável como string, ou use hrefs: "string" para manter o tipo da 1.x (named-routes migrate --to 2 faz isso). Com hrefs: "string" e typedRoutes, withNamedRoutes() imprime um aviso e named-routes doctor também aponta. Verificado com o next typegen e o tsc reais no Next 16 (App Router e Pages Router, webpack e Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
---

# App Router — navegação programática

Topic: `nextjs-router-push` · Named Routes v2.2.0

Em Client Component, use useRouter de next/navigation e passe uma rota interna tipada. O roteador aplica basePath.

## Sem base path

URL no navegador: `/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## Com base path

URL no navegador: `/app/posts/42/edit`.

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

Related topic IDs: app-router, nextjs-navigation, helper-route
---

# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

Use redirect do Next.js em contexto de servidor suportado. Named Routes apenas constrói a URL; Next.js controla a resposta. Não capture o redirect como erro comum.

## Sem base path

URL no navegador: `/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## Com base path

URL no navegador: `/app/user/profile`.

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
