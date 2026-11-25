# Desenvolva com rotas · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Exemplos com App Router](#app-router)
- [Exemplos com Pages Router](#pages-router)
- [Parâmetros e codificação](#parameters)
- [Query strings e fragmentos](#query-hash)
- [Query parameters tipados](#typed-query)
- [Roteamento reverso e rota ativa](#reverse-routing)
- [basePath, barras finais e origens](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript e typedRoutes do Next](#typescript)
- [Hrefs tipados para o typedRoutes do Next.js](#typed-hrefs)

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

<a id="typed-query"></a>

## Query parameters tipados

Declare schemas de query por rota em um módulo cujo export default é defineQuery({...}) e aponte a opção query para ele. As chaves são nomes de rota; os valores são validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType e outros) ou defineQuery.type<T>() para tipos apenas do TypeScript. Rotas sem schema mantêm a query da 1.0.

Com um schema, o TypeScript rejeita chaves desconhecidas e valores incompatíveis, e chaves obrigatórias tornam options.query obrigatório. Nenhuma biblioteca de schema vira dependência: saídas TypeScript importam o módulo apenas como tipos, então nada é empacotado e nada é validado em runtime.

Defina validateQuery: true para empacotar os schemas e validar cada objeto de query quando uma URL é gerada; falhas lançam INVALID_QUERY com os problemas encontrados. A validação nunca altera a URL: os valores são serializados como você os passa, sem defaults nem transformações do schema. Schemas assíncronos são rejeitados porque route() é síncrono. Saídas JavaScript importam o módulo como valor para inferir os tipos. Zod 4 e Valibot 1 exigem TypeScript 5.4+.

route.parseQuery(name, url) lê de volta a query de uma URL com o schema da rota quando ele está disponível em runtime (validateQuery: true, ou schemas passados ao createRoutes) e retorna { ok: true, value } com o tipo de saída do schema, ou { ok: false, issues }. Os valores chegam como strings; nas chaves que o schema rejeita, as strings que route() escreve para números e true/false são convertidas de volta e um valor único vira array, então o mesmo schema monta e lê. Rotas sem schema em runtime (sem schema, defineQuery.type() ou schemas importados só como tipos) retornam a query crua, e o tipo diz isso.

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});

// named-routes.config.ts: defineConfig({ query: "src/route-query.ts" })
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required

// With validateQuery: true
const parsed = route.parseQuery("products", "/products?page=2&sort=newest");
if (parsed.ok) parsed.value.page; // 2 (number | undefined)
```

<a id="reverse-routing"></a>

## Roteamento reverso e rota ativa

route.match(url) retorna a rota nomeada para a qual um caminho aponta, com params decodificados, a query (chaves repetidas viram arrays), o hash e o idioma, ou null. Aceita um caminho relativo à raiz, como /users/42?tab=posts#bio, ou um objeto URL; URLs absolutas só correspondem na origin configurada ou em um domínio de i18n. route.is(nome, url) compara uma URL com uma rota; { exact: false } também aceita descendentes, para seções ativas da navegação. route.breadcrumbs(url) retorna as correspondências de cada caminho ancestral.

Segmentos estáticos vencem, depois os mistos, dinâmicos, opcionais, catch-all e catch-all opcionais, comparados da esquerda para a direita; padrões igualmente específicos são resolvidos pela ordem de declaração. Os segmentos são separados antes de serem decodificados, então %2F continua dentro de um parâmetro; percent-encoding malformado, segmentos vazios e URLs relativas ou sem protocolo retornam null. Passe { basePath: true } quando a URL inclui o basePath (window.location.pathname). Prefixos de idioma, prefixos personalizados e pathnames traduzidos são reconhecidos.

A correspondência descreve apenas a sua tabela de rotas: não é autorização, não prova que um recurso existe nem que uma navegação vai funcionar, e não substitui o router do framework. A query é retornada como strings; faça o parse com o seu próprio schema, por exemplo schema.parse(found.query) com coerção.

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
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

Desde a 2.0 route() retorna hrefs tipados (veja Hrefs tipados): tipos template literal que o typedRoutes do Next.js, <Link> e router.push() aceitam sem afirmar Route. hrefs: "string" retorna string como na 1.x. Os tipos exportados exigem TypeScript 5.4+. Não afirme entradas arbitrárias e não confiáveis como nome de rota para contornar a validação.

```ts
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes (typed hrefs are the default):
// <Link href={route(name)}>Profile</Link>   // no cast
```

<a id="typed-hrefs"></a>

## Hrefs tipados para o typedRoutes do Next.js

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

← Anterior: [Frameworks](frameworks.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Referência da API](api-reference.md) →
