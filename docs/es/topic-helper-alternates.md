# route.alternates()

[Documentación](index.md) / [SEO y metadatos](seo.md)

[English](../en/topic-helper-alternates.md) · [Português](../pt/topic-helper-alternates.md) · [Español](../es/topic-helper-alternates.md) · [日本語](../ja/topic-helper-alternates.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-alternates"></a>

Genera un mapa de URLs por idioma usando pathnames, domains, parámetros y query existentes. Por defecto URLs absolutas con la base. Rutas no localizadas o sin i18n devuelven mapa vacío. Úsalo para hreflang y sitemaps multilingües; proporciona parámetros dinámicos reales. Los slugs no se traducen automáticamente.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.alternates("about");
// { en: "https://example.com/app/en/about", pt: "https://example.com/app/pt/sobre" }
```

---

← Anterior: [route.canonical()](topic-helper-canonical.md) · [Todos los temas](seo.md)
