# route.alternates()

[Documentação](index.md) / [SEO e metadados](seo.md)

[English](../en/topic-helper-alternates.md) · [Português](../pt/topic-helper-alternates.md) · [Español](../es/topic-helper-alternates.md) · [日本語](../ja/topic-helper-alternates.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-alternates"></a>

Gere um mapa de URLs por idioma usando pathnames, domains, parâmetros e query existentes. Por padrão URLs absolutas com a base. Rotas não localizadas ou sem i18n retornam mapa vazio. Use para hreflang e sitemaps multilíngues; informe parâmetros dinâmicos reais. Slugs não são traduzidos automaticamente.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/app/en/about", pt: "https://example.com/app/pt/sobre" }
```

---

← Anterior: [route.canonical()](topic-helper-canonical.md) · [Todos os tópicos](seo.md)
