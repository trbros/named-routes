# Configuração e referência do runtime

# Referência da API de runtime

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifesto, defaults?) cria um helper congelado e independente e copia o manifesto. Defaults contém basePath, assetBase, trailingSlash, origin e i18n. parsePattern(padrão) retorna segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed e valida a sintaxe; formatPattern faz o inverso e patternParameters lista os nomes dos parâmetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes e PatternSegment são tipos exportados.

Um manifesto tipado como Record<string, string> simples (por exemplo, carregado de JSON) também funciona: os nomes viram string e os parâmetros, um registro flexível, enquanto o runtime continua validando cada chamada.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
---

# Configuração do gerador

Topic: `configuration` · Named Routes v2.2.0

O arquivo de configuração é opcional. As integrações geram rotas com defaults; adicione apenas o necessário. A busca segue .ts, .mts, .mjs, .js, .cjs, .json; use .mjs se Node não carregar TypeScript. defineConfig fornece autocomplete e a geração rejeita opções desconhecidas. --config seleciona outro arquivo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
---

# Descoberta e diretórios

Topic: `config-discovery` · Named Routes v2.2.0

Use framework: auto (padrão) ou um framework explícito. discovery: framework lê a tabela publicada quando disponível; files força o scanner. Next possui router, appDir e pagesDir; outros usam routesDir. pageExtensions e exclude ajustam a busca. root é relativo ao arquivo de configuração quando declarado nele.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
---

# Saída gerada e exports

Topic: `config-output` · Named Routes v2.2.0

output é src/routes.generated.ts por padrão; use .ts, .mts, .js ou .mjs fora de diretório roteável. exportNames renomeia exports e importSource altera o import do runtime. hrefs: typed é padrão; string restaura o tipo de retorno simples.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
---

# Convenções de nomes

Topic: `config-naming` · Named Routes v2.2.0

naming.style controla path ou semantic. separator, paramPrefix e home personalizam a convenção; transform pode alterar nomes em config JS/TS. names tem prioridade sobre nomes automáticos. Colisões interrompem a geração.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
---

# Defaults de URL

Topic: `config-defaults` · Named Routes v2.2.0

defaults contém basePath, includeBasePath, origin, trailingSlash e assetBase. São valores públicos serializados no módulo. Configurações explícitas sobrescrevem as herdadas do framework. Não use credenciais.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
---

# Adicionar rotas explícitas

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes mapeia um nome escolhido a um padrão canônico para rewrite, manifesto manual ou rota conhecida da aplicação. Ao contrário de names, a URL não precisa ser descoberta. O pacote não cria a página nem o endpoint.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
---

# Ativar descoberta de APIs

Topic: `config-api` · Named Routes v2.2.0

includeApi é false por padrão. Ative para incluir URLs de endpoints reconhecidas pelo adaptador. Descritores são gerados somente para métodos detectáveis estaticamente. Não gera OpenAPI nem autorização.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
---

# Watch e opções de desenvolvimento

Topic: `config-watch` · Named Routes v2.2.0

A integração atualiza rotas durante o desenvolvimento. withNamedRoutes aceita watch, watchMode e watchInterval; use polling quando eventos nativos forem instáveis. A CLI aceita --watch-mode poll. Reinicie o framework após alterar a base.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
