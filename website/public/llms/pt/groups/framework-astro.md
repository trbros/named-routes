# Astro

# Astro: configuração

Topic: `astro` · Named Routes v2.2.0

Registre a integração nativa de @triooo/named-routes/astro em integrations do astro.config. Ela herda o base final do Astro. Se migrar da configuração antiga, remova namedRoutes() de vite.plugins. O módulo é gerado em src/routes.generated.ts por padrão e pode ser usado no frontmatter .astro, em ilhas e endpoints.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `astro-conventions` · Named Routes v2.2.0

Crie `src/pages/users/[id].astro` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/pages com páginas .astro, .md, .mdx, .markdown e .html; arquivos e pastas iniciados por _ são privados; [id]; [...slug] aceita zero ou mais segmentos ([[...slug]]); segmentos mistos como [lang]-[version]. Endpoints .ts/.js são opcionais via includeApi e mantêm a extensão interna (api/data.json.ts é /api/data.json).

**Limites e verificação.** Builds estáticos continuam precisando de getStaticPaths nas páginas dinâmicas: o pacote constrói URLs, não enumera parâmetros. Verificado por testes de convenção e pelo examples/astro, que compila e roda com Astro 5.

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `astro-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Com base path

URL no navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, astro-programmatic
---

# Navegação — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

No frontmatter de uma página Astro renderizada no servidor, retorne Astro.redirect com a URL pública. O framework controla a resposta; a saída estática tem semântica diferente.

## Sem base path

URL no navegador: `/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## Com base path

URL no navegador: `/app/users/42`.

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
---

# Base path e deploy

Topic: `astro-deployment` · Named Routes v2.2.0

Configure `base` no Astro. O route() gerado inclui a base e a âncora recebe /app/users/42.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# Arquivos públicos

Topic: `astro-assets` · Named Routes v2.2.0

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

Topic: `astro-i18n` · Named Routes v2.2.0

Configure locales e pathnames correspondentes em named-routes.config. O framework continua responsável pela escolha de idioma e pelo roteamento. Use route.url com locale para URL pública completa; não aplique o mesmo prefixo duas vezes no Link localizado.

**i18n.** As pastas físicas de idioma do Astro (src/pages/pt/about.astro) se mesclam na mesma rota nomeada que src/pages/about.astro quando o idioma está em i18n.locales. prefixDefaultLocale: false corresponde a localePrefix as-needed e true a always.

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

# Endpoints HTTP

Topic: `astro-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `src/pages/api/admin.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
