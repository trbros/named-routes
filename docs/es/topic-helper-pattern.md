# route.pattern()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-pattern.md) · [Português](../pt/topic-helper-pattern.md) · [Español](../es/topic-helper-pattern.md) · [日本語](../ja/topic-helper-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern"></a>

`route.pattern(name, locale?)` devuelve la plantilla, no una URL generada. Un idioma devuelve la plantilla traducida si está configurada. No sustituye parámetros ni añade prefijos. Usa route() para una URL navegable.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

## Temas relacionados

- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)

---

← Anterior: [route.names()](topic-helper-names.md) · [Todos los temas](route-helpers.md) · Siguiente: [createRoutes()](topic-helper-create-routes.md) →
