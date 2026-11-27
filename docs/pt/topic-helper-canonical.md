# route.canonical()

[Documentação](index.md) / [SEO e metadados](seo.md)

[English](../en/topic-helper-canonical.md) · [Português](../pt/topic-helper-canonical.md) · [Español](../es/topic-helper-canonical.md) · [日本語](../ja/topic-helper-canonical.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-canonical"></a>

Gere URL absoluta para metadados com idioma explícito, vinculado ou padrão (se configurado). A URL canônica inclui a base de navegação. Query e hash só entram se fornecidos explicitamente. O helper não determina qual conteúdo é canônico nem remove parâmetros de rastreamento automaticamente.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/pt/sobre
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

---

[Todos os tópicos](seo.md) · Próximo: [route.alternates()](topic-helper-alternates.md) →
