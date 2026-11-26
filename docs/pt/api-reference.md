# Referência da API · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Referência da API de runtime](#runtime-api)
- [Configuração do gerador](#configuration)
- [Nomes estáveis opcionais](#stable-names)
- [API programática do gerador](#generator-api)

<a id="runtime-api"></a>

## Referência da API de runtime

route(nome, params?, opções?) retorna uma string de URL. params só é opcional quando o padrão não tem parâmetros obrigatórios. options contém query, hash, absolute, basePath e locale. route.has(nome) verifica a existência e restringe uma string a um nome conhecido; route.names() retorna os nomes; route.pattern(nome, locale?) retorna o padrão original ou traduzido; route.locales() lista os idiomas; route.forLocale(locale) retorna um helper vinculado a um idioma. route.match(url), route.is(nome, url) e route.breadcrumbs(url) mapeiam URLs de volta para nomes (veja Roteamento reverso).

createRoutes(manifesto, defaults?) cria um helper congelado e independente e copia o manifesto. Defaults contém basePath, assetBase, trailingSlash, origin e i18n. parsePattern(padrão) retorna segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed e valida a sintaxe; formatPattern faz o inverso e patternParameters lista os nomes dos parâmetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes e PatternSegment são tipos exportados.

Um manifesto tipado como Record<string, string> simples (por exemplo, carregado de JSON) também funciona: os nomes viram string e os parâmetros, um registro flexível, enquanto o runtime continua validando cada chamada.

route.localize(url, locale?, options?: LocalizeOptions): string | null — traduz uma URL existente entre aliases configurados. Opções: sourceLocale, basePath (entrada com prefixo), includeBasePath (saída com prefixo), absolute (origin/domínio configurado). Preserva a query e o hash sem revalidar schemas de query.

`route.asset(path, options?)` e a exportação gerada `asset` resolvem arquivos públicos sem depender do idioma, schemas de query ou nomes de rotas. `AssetHelper` e `AssetOptions` são tipos exportados. `route.localize(url, locale, options?)` traduz URLs conhecidas; `route.match()` encontra nome e parâmetros; `route.parseQuery()` valida a query quando há schemas em runtime.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```ts
import { createRoutes } from "@triooo/named-routes";
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

Nenhum arquivo de configuração é obrigatório. Arquivos opcionais são procurados nesta ordem: named-routes.config.ts, .mts, .mjs, .js, .cjs, .json. Configurações TypeScript exigem Node.js 22.18+ (remoção nativa de tipos); use .mjs em versões anteriores. Exporte defineConfig({...}) de @triooo/named-routes/config para ter autocomplete. A flag --config da CLI seleciona outro arquivo; root dentro da configuração é relativo ao próprio arquivo. Opções desconhecidas ou com erro de digitação falham com INVALID_CONFIG.

Descoberta: discovery ("framework" por padrão desde a 2.0: a tabela de rotas do próprio framework quando ele a publica, senão os arquivos; "files" para o scanner da 1.x), framework (auto por padrão, ou next, nuxt, vue, sveltekit, astro, react-router, tanstack-router, manual), router (Next.js: auto, app ou pages), appDir/pagesDir (pastas personalizadas do Next.js ou false), routesDir (pasta de páginas/rotas personalizada nos outros frameworks), pageExtensions (padrões de cada framework; extensões compostas como page.tsx funcionam), includeApi (false), exclude (globs relativos à raiz com *, ** e ?).

Nomes: names (padrão de URL → nome personalizado; todo caminho deve existir), extraRoutes (nome → padrão explícito, por exemplo destinos de rewrites), naming (separator, paramPrefix, home, transform) e i18n (locales, defaultLocale, localePrefix, pathnames, domains, localeParam, unlocalized).

Saída: output (padrão src/routes.generated.ts; .ts, .mts, .js ou .mjs, nunca dentro de um arquivo roteável), importSource (módulo de onde o arquivo gerado importa createRoutes; padrão, o nome do pacote), exportNames (renomeia routes, route, asset, RouteName e RouteLocale), defaults (basePath, assetBase, trailingSlash e origin públicos; apenas essas chaves são serializadas), hrefs ("typed" por padrão desde a 2.0, ou "string"; só de tipos), query (módulo de schemas de query por rota) e validateQuery (empacota e executa esses schemas; padrão false). Os plugins aceitam watch (padrão true); o withNamedRoutes também aceita watchInterval (750 ms, 25–60000) e watchMode (auto, native ou poll). Opções passadas ao plugin sobrescrevem o arquivo de configuração.

`defaults.assetBase` sobrescreve apenas o prefixo das URLs de arquivos públicos. Omita para herdar o `basePath` efetivo; use `"/"` ou `""` para arquivos na raiz do domínio, ou uma URL HTTP(S) de CDN. Navegação, localização e roteamento reverso não mudam.

`exportNames.asset` renomeia a exportação gerada (padrão `asset`). Se uma exportação antiga já usar esse nome, um alias livre `$asset` será escolhido; `route.asset` continua disponível no helper. Nunca inclua segredos nos defaults públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  discovery: "framework",            // or "files" (1.x)
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", asset: "publicAsset", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", assetBase: "https://cdn.example.com/public", trailingSlash: false },
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

<a id="generator-api"></a>

## API programática do gerador

discoverRoutes(opções?) retorna root, framework, directories, routes, entries e os defaults do runtime sem escrever. Cada entrada tem name, path, file, router, framework e, opcionalmente, variant e localized. Rotas extras explícitas têm file: null e router: explicit.

generateRoutes(opções?, { check?: boolean }?) também retorna output e changed. O modo check rejeita saída desatualizada sem modificá-la. validateOptions(opções) lança INVALID_CONFIG para chaves desconhecidas. Importe /generator e /config apenas em ferramentas Node, nunca em código cliente. withNamedRoutes vem de /next e namedRoutes de /vite.

```ts
import { discoverRoutes, generateRoutes } from "@triooo/named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```

---

← Anterior: [Arquivos públicos](public-assets.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Guias](guides.md) →
