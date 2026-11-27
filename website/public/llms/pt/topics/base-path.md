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
