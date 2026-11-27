# SvelteKit

# SvelteKit: configuração

Topic: `sveltekit` · Named Routes v2.2.0

Adicione namedRoutes() antes de sveltekit() no vite.config. Gerar o módulo em src/lib permite importá-lo como $lib/routes.generated em qualquer componente, função load ou endpoint.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas. Esta configuração é para SvelteKit 3. No SvelteKit 2 defina kit.paths.base em svelte.config.js e compartilhe o prefixo com routerBase.

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
---

# Convenções de arquivos e descoberta

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Crie `src/routes/users/[id]/+page.svelte` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** src/routes com +page.svelte, +page.ts ou +page.server.ts (eles se mesclam em uma rota); pastas (grupo) são omitidas; [id=matcher] mantém o parâmetro e descarta o matcher; [[lang]] é opcional; [...rest] aceita zero ou mais segmentos ([[...rest]]) e pode vir antes de segmentos estáticos; resets de layout +page@ são páginas normais; escapes [x+2f] e [u+0041] são decodificados. Endpoints +server são opcionais via includeApi.

**Verificação.** Os testes de convenção e a integração examples/sveltekit cobrem descoberta e navegação; o exemplo atual usa SvelteKit 3 com Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# Links e navegação

Topic: `sveltekit-navigation` · Named Routes v2.2.0

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

## Sem base path

URL no navegador: `/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## Com base path

URL no navegador: `/app/users/42`.

```svelte
<script lang="ts">
  import { route } from "$lib/routes.generated";
</script>
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, sveltekit-programmatic
---

# Navegação — goto()

Topic: `sveltekit-programmatic` · Named Routes v2.2.0

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

Related topic IDs: sveltekit-navigation, sveltekit-deployment, public-url
---

# Base path e deploy

Topic: `sveltekit-deployment` · Named Routes v2.2.0

Configure `paths.base` no SvelteKit. O route() gerado inclui a base e a âncora recebe /app/users/42.

Configure o mesmo prefixo de navegação em namedRoutes({ routerBase: "/app" }); o base do Vite não é automaticamente a base do roteador. Se a base do Vite também for a de navegação, inheritViteBase: true é uma alternativa. O framework também precisa servir o subcaminho.

No SvelteKit 2 defina kit.paths.base em svelte.config.js e compartilhe o valor com namedRoutes; o exemplo de setup usa SvelteKit 3. Não passe uma URL já prefixada a outro helper que adiciona a base.

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

Topic: `sveltekit-assets` · Named Routes v2.2.0

Coloque um arquivo em `static/images/logo.svg`. Importe asset do mesmo módulo gerado que route. Com base /app, asset("images/logo.svg") retorna /app/images/logo.svg. O CDN é independente da navegação.

## Sem base path

URL do arquivo público: `/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## Com base path

URL do arquivo público: `/app/images/logo.svg`.

```ts
// Generated module (adjust import for your component)
import { asset } from "$lib/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# Links internacionalizados

Topic: `sveltekit-i18n` · Named Routes v2.2.0

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

# Endpoints HTTP

Topic: `sveltekit-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `src/routes/api/admin/+server.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
