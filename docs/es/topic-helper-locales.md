# route.locales()

[Documentación](index.md) / [Internacionalización](internationalization.md)

[English](../en/topic-helper-locales.md) · [Português](../pt/topic-helper-locales.md) · [Español](../es/topic-helper-locales.md) · [日本語](../ja/topic-helper-locales.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-locales"></a>

`route.locales()` lista los idiomas configurados o un array vacío sin i18n. Es configuración, no detección del navegador o la petición. Úsalo en selectores de idioma.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.locales(); // ["en", "pt"]
createRoutes({ home: "/" }).locales(); // []
```

---

← Anterior: [route.localize()](topic-helper-localize.md) · [Todos los temas](internationalization.md) · Siguiente: [route.forLocale()](topic-helper-for-locale.md) →
