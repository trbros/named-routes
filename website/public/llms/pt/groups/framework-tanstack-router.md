# TanStack Router

# TanStack Router: configuração

Topic: `tanstack-router` · Named Routes v2.2.0

Adicione namedRoutes() junto do tanstackRouter() de @tanstack/router-plugin no vite.config. O plugin lê src/routes (ou app/routes) e escreve src/routes.generated.ts por padrão, fora da pasta de rotas, então ele nunca vira uma rota.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), namedRoutes(), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Na configuração do roteador existente use createRouter({ routeTree, basepath: "/app" }).

```ts
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  base: "/app/",
  plugins: [tanstackRouter({ target: "react" }), namedRoutes({ routerBase: "/app" }), react()],
  server: { watch: { ignored: ["**/.tanstack/**"] } },
});
```

Related topic IDs: tanstack-router-conventions, tanstack-router-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Crie `src/routes/users/$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** __root é ignorado; index e route.tsx são a rota da pasta; arquivos planos (posts.$postId.tsx) e em pastas se misturam; $param; {-$locale} é opcional ([[locale]]); prefixo{$id}sufixo vira um segmento misto; um $ isolado é um splat chamado _splat ([[..._splat]]); _layout não tem caminho; posts_ sai do aninhamento; arquivos com prefixo - e pastas (grupo) são ignorados; arquivos .lazy pertencem à mesma rota.

**Verificado.** Os nomes vêm do routeTree.gen.ts que o plugin ou a CLI do TanStack Router gera (seus caminhos navegáveis); antes de ele existir, os arquivos são varridos. Testes de convenção mais o examples/tanstack-router, que compila e roda com o plugin do TanStack Router.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

**Quando usar.** O TanStack Router já tipa o próprio <Link to> pelo id da rota. Use route() onde é preciso uma string simples: <a href>, redirects para outros apps, e-mails, sitemaps, analytics, URLs com prefixo de idioma e nomes compartilhados com outros frameworks em um monorepo.

## Sem base path

URL no navegador: `/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## Com base path

URL no navegador: `/app/users/42`.

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
---

# Navegação — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Use apenas para navegação de documento inteiro no navegador. Para SPA, use navigate/Link tipado do TanStack com ID e params nativos; uma URL pública gerada não é um ID do TanStack.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
---

# Base path e deploy

Topic: `tanstack-router-deployment` · Named Routes v2.2.0

Configure `basepath` no TanStack Router. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

Use createRouter({ routeTree, basepath: "/app" }) no roteador existente. Use o Link nativo tipado para os IDs próprios do TanStack.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Arquivos públicos

Topic: `tanstack-router-assets` · Named Routes v2.2.0

Coloque um arquivo em `public/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Links internacionalizados

Topic: `tanstack-router-i18n` · Named Routes v2.2.0

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

## Sem base path

URL no navegador: `/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## Com base path

URL no navegador: `/app/pt/users/42`.

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# Limites de HTTP

Topic: `tanstack-router-endpoints` · Named Routes v2.2.0

Rotas cliente do TanStack Router não estabelecem contratos de métodos HTTP. O Named Routes não infere verbos de componentes, loaders, actions ou server functions. Use sua API de servidor ou cliente OpenAPI; para uma URL nomeada conhecida use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
