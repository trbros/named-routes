# Referência de rotas e inspeção

# Roteamento reverso e rota ativa

Topic: `reverse-routing` · Named Routes v2.2.0

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

Related topic IDs: helper-match, helper-is, helper-breadcrumbs
---

# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` reconhece um caminho e retorna um resultado discriminado com name, pattern, params, locale e query bruta, ou null. Use `{ basePath: true }` quando a entrada incluir a base configurada. Os parâmetros são refinados pelo nome; use parseQuery para conversão por schema. Reconhecer uma rota não é autorização.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
---

# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` verifica se uma URL corresponde à rota nomeada. Use `exact: false` para incluir descendentes correspondentes e `{ basePath: true }` para URLs públicas com base. Ideal para menus ativos, não para controle de acesso. Nomes desconhecidos são rejeitados.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
---

# route.breadcrumbs()

Topic: `helper-breadcrumbs` · Named Routes v2.2.0

`route.breadcrumbs(url, options?)` retorna correspondências conhecidas dos caminhos ancestrais, da raiz à folha. Não inventa rotas ausentes nem rótulos; associe os nomes a textos traduzidos na aplicação. Passe `{ basePath: true }` quando a URL contiver a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

Related topic IDs: helper-match, helper-is
---

# route.has()

Topic: `helper-has` · Named Routes v2.2.0

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

Related topic IDs: helper-names, helper-pattern
---

# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` retorna os nomes conhecidos em um array tipado. Use em depuração e ferramentas de desenvolvimento; não informa regras de autorização nem garante acesso a todas as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
---

# route.pattern()

Topic: `helper-pattern` · Named Routes v2.2.0

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

Related topic IDs: helper-parse-pattern, helper-format-pattern
---

# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

Crie um helper independente e congelado a partir do manifesto nome → padrão. Preserve tipos literais para autocomplete. Defaults pertencem ao helper; não há imports do filesystem ou framework no navegador.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
---

# route.withDefaults()

Topic: `helper-with-defaults` · Named Routes v2.2.0

Crie um helper isolado com origin, basePath, assetBase ou trailingSlash diferentes. Rotas, idiomas, idioma vinculado, manifesto e schemas permanecem disponíveis. O helper original não muda; use configuração de tenant confiável no servidor, não cabeçalhos Host arbitrários. O retorno usa string para hrefs de forma conservadora.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

Related topic IDs: base-path, absolute-urls, helper-create-routes
---

# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Interprete e valide um padrão canônico em registros de segmentos. Use em ferramentas, não para navegar.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serialize registros de segmentos de volta à sintaxe canônica de colchetes. O resultado é um padrão, não uma URL concreta.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

Liste nomes dos parâmetros dos segmentos analisados. Útil para inspecionar manifestos e gerar ferramentas.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
