# Base path — URL interna e pública

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-base-path.md) · [Português](../pt/topic-base-path.md) · [Español](../es/topic-base-path.md) · [日本語](../ja/topic-base-path.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="base-path"></a>

Use route() na navegação nativa de Next.js, Nuxt, Vue Router, React Router e TanStack Router. Manifestos gerados de Astro, SvelteKit e manual incluem a base configurada por padrão. Use route.url() para uma URL pública em qualquer framework. defaults.includeBasePath e basePath por chamada permitem sobrescrever o padrão; URLs absolutas incluem a base.

Use o guia de deploy do framework para configurar sua base. A CLI reutiliza a última base em .named-routes/ ou aceita --base-path /app; --base-path / limpa o prefixo. Não use um CDN de assets como base de navegação.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

## Tópicos relacionados

- [route.url() — URLs públicas](topic-public-url.md)
- [URLs absolutas e origin](topic-absolute-urls.md)
- [Barras finais](topic-trailing-slash.md)
- [assetBase e CDN](topic-asset-base.md)
- [generate](topic-cli-generate.md)

---

← Anterior: [Fragmentos da URL (hash)](topic-hash-fragments.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [URLs absolutas e origin](topic-absolute-urls.md) →
