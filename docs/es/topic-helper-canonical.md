# route.canonical()

[Documentación](index.md) / [SEO y metadatos](seo.md)

[English](../en/topic-helper-canonical.md) · [Português](../pt/topic-helper-canonical.md) · [Español](../es/topic-helper-canonical.md) · [日本語](../ja/topic-helper-canonical.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-canonical"></a>

Genera URL absoluta para metadatos con idioma explícito, vinculado o predeterminado (si se configuró). La URL incluye la base de navegación. Query y hash solo si se proporcionan. No decide qué contenido es canónico ni elimina parámetros de seguimiento automáticamente.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/pt/sobre
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", origin: "https://example.com", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

---

[Todos los temas](seo.md) · Siguiente: [route.alternates()](topic-helper-alternates.md) →
