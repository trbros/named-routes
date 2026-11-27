# Construção de URLs e nomes

# route()

Topic: `helper-route` · Named Routes v2.2.0

route(nome, params?, options?) retorna uma string de URL de uma rota conhecida; não navega. Parâmetros obrigatórios são tipados e validados. Query, hash e locale ficam no terceiro argumento. Para URL pública ou objeto de opções nomeadas use route.url().

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
---

# route.url() — URLs públicas

Topic: `public-url` · Named Routes v2.2.0

Assinatura: route.url(nome, { params?, query?, hash?, locale?, absolute?, basePath? }). O objeto é opcional somente quando o caminho e a query permitem. A base configurada é incluída por padrão; use basePath: false para o caminho interno. Retorna string; para Link nativo tipado use route().

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

Related topic IDs: helper-route, base-path, helper-endpoint
---

# Parâmetros obrigatórios e encoding

Topic: `parameters` · Named Routes v2.2.0

Um parâmetro [user] aceita string não vazia ou número finito. O valor é codificado como um único segmento: uma barra no valor não vira separador. Parâmetros ausentes, extras ou inválidos são rejeitados. O helper valida a URL, não a existência do recurso.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
---

# Parâmetros opcionais

Topic: `optional-parameters` · Named Routes v2.2.0

Use [[id]] para um parâmetro escalar opcional. Omita o valor para omitir o segmento. Em apps gerados use a convenção equivalente do framework; o suporte varia.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
---

# Parâmetros catch-all

Topic: `catch-all-parameters` · Named Routes v2.2.0

Um [...slug] obrigatório recebe um array não vazio; [[...slug]] aceita omissão ou array vazio. Cada item é codificado como segmento distinto. Não passe uma string com barras como catch-all.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
---

# Segmentos mistos

Topic: `mixed-parameters` · Named Routes v2.2.0

Um segmento misto combina texto literal e parâmetros obrigatórios. Cada parâmetro dinâmico possui sua própria chave tipada.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
---

# Query strings

Topic: `query-hash` · Named Routes v2.2.0

Passe query nas opções para adicionar chaves e valores. Números e booleanos são serializados; arrays repetem a chave; null e undefined são omitidos. Query é diferente de params. Schemas tipados são opcionais.

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
---

# Fragmentos da URL (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Use hash para apontar a uma seção da página. O helper remove um # inicial opcional e codifica o fragmento. O navegador não o envia ao servidor.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
---

# Base path — URL interna e pública

Topic: `base-path` · Named Routes v2.2.0

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

Use o guia de deploy do framework para configurar sua base. A CLI reutiliza a última base em .named-routes/ ou aceita --base-path /app; --base-path / limpa o prefixo. Não use um CDN de assets como base de navegação.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

Related topic IDs: public-url, absolute-urls, trailing-slash, asset-base, cli-generate
---

# URLs absolutas e origin

Topic: `absolute-urls` · Named Routes v2.2.0

Defina defaults.origin como uma origem HTTP(S) confiável, sem credenciais, caminho, query ou hash. absolute: true inclui a base. O runtime não adivinha a origem por window ou headers; não coloque segredos na configuração pública.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
---

# Barras finais

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash muda a formatação do caminho gerado, não os redirects do servidor. Configure a mesma política no framework. O Next.js herda a opção do next.config.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
---

# Nomes semânticos e grupos

Topic: `semantic-names` · Named Routes v2.2.0

Defina naming.style como semantic para usar index em páginas-pai e show em parâmetros escalares obrigatórios finais. Os nomes atuais continuam sendo o padrão. Segmentos estáticos não são traduzidos nem singularizados. Use names para dar nomes estáveis a URLs específicas (inclusive create); atualize o mapa quando uma URL mudar. Colisões interrompem a geração.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
---

# Nomes estáveis opcionais

Topic: `stable-names` · Named Routes v2.2.0

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

Related topic IDs: semantic-names, config-naming, naming
---

# TypeScript e typedRoutes do Next

Topic: `typescript` · Named Routes v2.2.0

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
