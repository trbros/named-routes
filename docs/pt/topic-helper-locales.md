# route.locales()

[Documentação](index.md) / [Internacionalização](internationalization.md)

[English](../en/topic-helper-locales.md) · [Português](../pt/topic-helper-locales.md) · [Español](../es/topic-helper-locales.md) · [日本語](../ja/topic-helper-locales.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-locales"></a>

`route.locales()` lista os idiomas configurados ou um array vazio sem i18n. Trata-se da configuração, não da detecção de idioma do navegador ou da requisição. Use em seletores de idioma.

## Exemplo

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

← Anterior: [route.localize()](topic-helper-localize.md) · [Todos os tópicos](internationalization.md) · Próximo: [route.forLocale()](topic-helper-for-locale.md) →
