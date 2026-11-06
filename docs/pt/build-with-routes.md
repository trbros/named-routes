# Desenvolva com rotas · @triooo/next-named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Exemplos com App Router](#app-router)
- [Exemplos com Pages Router](#pages-router)
- [Parâmetros e codificação](#parameters)
- [Query strings e fragmentos](#query-hash)
- [basePath, barras finais e origens](#base-path)
- [Idiomas e i18n](#i18n)
- [TypeScript e typedRoutes do Next](#typescript)

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

---

← Anterior: [Frameworks](frameworks.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Referência da API](api-reference.md) →
