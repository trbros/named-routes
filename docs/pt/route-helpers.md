# Helpers de rotas · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/route-helpers.md) · [Português](../pt/route-helpers.md) · [Español](../es/route-helpers.md) · [日本語](../ja/route-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [route()](#helper-route)
- [route.localize()](#helper-localize)
- [route.match()](#helper-match)
- [route.parseQuery()](#helper-parse-query)
- [route.is()](#helper-is)
- [route.breadcrumbs()](#helper-breadcrumbs)
- [route.has()](#helper-has)
- [route.names()](#helper-names)
- [route.pattern()](#helper-pattern)
- [route.locales()](#helper-locales)
- [route.forLocale()](#helper-for-locale)

<a id="helper-route"></a>

## route()

`route(name, params?, options?)` gera uma URL nomeada. Nomes e parâmetros obrigatórios são tipados. Por padrão, omite a base de navegação e o idioma; defina as opções para links HTML, fetch e URLs externas. Uma URL absoluta exige origin configurada. Nomes ou parâmetros inválidos lançam NamedRouteError. O helper não navega.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, {
  basePath: "/app", origin: "https://example.com",
});
urls("home"); // /
urls("users.show", { id: 42 }); // /users/42
urls("users.show", { id: 42 }, { basePath: true, query: { tab: "posts" }, hash: "bio" });
// /app/users/42?tab=posts#bio
urls("users.show", { id: 42 }, { absolute: true });
// https://example.com/app/users/42
```

<a id="helper-localize"></a>

## route.localize()

`route.localize(url, locale?, options?)` traduz uma URL existente pela tabela de rotas, preservando query e fragmento. Use em seletores de idioma e redirects. Retorna null quando não existe uma rota localizada inequívoca. Para uma URL pública com basePath, use `{ basePath: true }`; use `sourceLocale` para desambiguar caminhos traduzidos sem prefixo quando necessário. Não traduz valores de slugs dinâmicos nem detecta o idioma do visitante.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.localize("/sobre", "en"); // /en/about
urls.localize("/pt/artigos/42?tab=comments#top", "en");
// /en/posts/42?tab=comments#top
urls.localize("/missing", "en"); // null
```

<a id="helper-match"></a>

## route.match()

`route.match(url, options?)` reconhece um caminho e retorna um resultado discriminado com name, pattern, params, locale e query bruta, ou null. Use `{ basePath: true }` quando a entrada incluir a base configurada. Os parâmetros são refinados pelo nome; use parseQuery para conversão por schema. Reconhecer uma rota não é autorização.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
const found = urls.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") {
  console.log(found.params.id); // "42"
  console.log(found.query.tab); // "posts"
}
urls.match("/unknown"); // null
```

<a id="helper-parse-query"></a>

## route.parseQuery()

`route.parseQuery(name, input)` lê a query de uma URL ou query string e retorna um resultado com `ok`. Um Standard Schema em runtime converte e valida valores; schemas apenas de tipo retornam os valores brutos. No módulo gerado, use `query` e `validateQuery: true` para incluir schemas em runtime. Zod abaixo é uma dependência opcional do consumidor. Não use o valor quando a validação falhar.

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```

<a id="helper-is"></a>

## route.is()

`route.is(name, url, options?)` verifica se uma URL corresponde à rota nomeada. Use `exact: false` para incluir descendentes correspondentes e `{ basePath: true }` para URLs públicas com base. Ideal para menus ativos, não para controle de acesso. Nomes desconhecidos são rejeitados.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ users: "/users", "users.show": "/users/[id]" });
urls.is("users", "/users/42"); // false
urls.is("users", "/users/42", { exact: false }); // true
urls.is("users.show", "/users/42"); // true
```

<a id="helper-breadcrumbs"></a>

## route.breadcrumbs()

`route.breadcrumbs(url, options?)` retorna correspondências conhecidas dos caminhos ancestrais, da raiz à folha. Não inventa rotas ausentes nem rótulos; associe os nomes a textos traduzidos na aplicação. Passe `{ basePath: true }` quando a URL contiver a base.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });
urls.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="helper-has"></a>

## route.has()

`route.has(name)` verifica o manifesto e restringe uma string arbitrária a um nome válido. Não verifica se o servidor está servindo a rota. Use antes de acessar rotas escolhidas por entrada externa.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

<a id="helper-names"></a>

## route.names()

`route.names()` retorna os nomes conhecidos em um array tipado. Use em depuração e ferramentas de desenvolvimento; não informa regras de autorização nem garante acesso a todas as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

<a id="helper-pattern"></a>

## route.pattern()

`route.pattern(name, locale?)` retorna o template da rota, não a URL gerada. Informar o idioma retorna o template traduzido quando configurado. Não substitui parâmetros nem adiciona idioma ou base. Use route() para gerar uma URL navegável.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

<a id="helper-locales"></a>

## route.locales()

`route.locales()` lista os idiomas configurados ou um array vazio sem i18n. Trata-se da configuração, não da detecção de idioma do navegador ou da requisição. Use em seletores de idioma.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.locales(); // ["en", "pt"]
createRoutes({ home: "/" }).locales(); // []
```

<a id="helper-for-locale"></a>

## route.forLocale()

`route.forLocale(locale)` cria um helper vinculado ao idioma configurado. Uma opção locale explícita em uma chamada posterior pode sobrescrevê-lo. O helper original não muda e assets nunca recebem o idioma. Use para gerar vários links em um idioma conhecido.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
const pt = urls.forLocale("pt");
pt("about"); // /pt/sobre
pt("posts.show", { id: 42 }); // /pt/artigos/42
urls("about"); // /about
pt.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [Desenvolva com rotas](build-with-routes.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Arquivos públicos](public-assets.md) →
