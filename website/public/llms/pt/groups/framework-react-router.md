# React Router / Remix

# React Router / Remix: configuração

Topic: `react-router` · Named Routes v2.2.0

Para o modo framework do React Router 7 e 8 (e Remix v2), adicione namedRoutes() antes de reactRouter() no vite.config. Os nomes vêm de react-router routes --json, a resolução do próprio framework para app/routes.ts, então arquivos de flatRoutes() e rotas declaradas com route(), index(), layout() e prefix() são todos descobertos. Uma boa saída é app/routes.generated.ts, fora de app/routes.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ output: "app/routes.generated.ts" }), reactRouter()],
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Em react-router.config.ts defina basename: "/app"; no Remix use a configuração equivalente.

```ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { namedRoutes } from "@triooo/named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes({ routerBase: "/app", output: "app/routes.generated.ts" }), reactRouter()],
});
```

Related topic IDs: react-router-conventions, react-router-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `react-router-conventions` · Named Routes v2.2.0

Crie `app/routes/users.$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** Pontos aninham (concerts.$city.tsx é /concerts/[city]); _index é o index; $param; ($lang) é opcional ([[lang]]); um $ isolado é um splat chamado splat ([[...splat]]); prefixos _auth são layouts sem caminho; concerts_ sai do aninhamento; escapes [.] mantêm caracteres; uma pasta com route.tsx é uma rota e pastas mais profundas são ignoradas. Um layout e seu _index compartilham a URL e se mesclam.

**Limites e verificação.** Sem @react-router/dev instalado, ou quando o comando falha, os arquivos de flat routes acima são varridos e a CLI diz por quê. Segmentos estáticos opcionais como (beta) não podem ser nomeados; o gerador para com um erro claro para que você exclua o arquivo. Verificado por testes de convenção e pelo examples/react-router, que compila e roda com React Router 8, incluindo uma rota declarada com route() em app/routes.ts.

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `react-router-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## Com base path

URL no navegador: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, react-router-programmatic
---

# Navegação — useNavigate()

Topic: `react-router-programmatic` · Named Routes v2.2.0

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

Related topic IDs: react-router-navigation, react-router-deployment, public-url
---

# Base path e deploy

Topic: `react-router-deployment` · Named Routes v2.2.0

Configure `basename` no React Router / Remix. O route() gerado retorna o caminho interno; route.url() retorna o caminho público /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

Em react-router.config.ts defina basename: "/app". No Remix, use a configuração equivalente.

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

Topic: `react-router-assets` · Named Routes v2.2.0

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

Topic: `react-router-i18n` · Named Routes v2.2.0

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

Topic: `react-router-endpoints` · Named Routes v2.2.0

Rotas cliente do React Router / Remix não estabelecem contratos de métodos HTTP. O Named Routes não infere verbos de componentes, loaders, actions ou server functions. Use sua API de servidor ou cliente OpenAPI; para uma URL nomeada conhecida use route.url().

```ts
route.url("users.$id", { params: { id: 42 } });
```

Related topic IDs: endpoint-methods, boundaries, public-url
