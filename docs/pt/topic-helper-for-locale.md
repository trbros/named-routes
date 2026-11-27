# route.forLocale()

[Documentação](index.md) / [Internacionalização](internationalization.md)

[English](../en/topic-helper-for-locale.md) · [Português](../pt/topic-helper-for-locale.md) · [Español](../es/topic-helper-for-locale.md) · [日本語](../ja/topic-helper-for-locale.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-for-locale"></a>

`route.forLocale(locale)` cria um helper vinculado ao idioma configurado. Uma opção locale explícita em uma chamada posterior pode sobrescrevê-lo. O helper original não muda e assets nunca recebem o idioma. Use para gerar vários links em um idioma conhecido.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
const pt = urls.forLocale("pt");
pt("about"); // /pt/sobre
pt("posts.show", { id: 42 }); // /pt/artigos/42
urls("about"); // /about
pt.asset("logo.svg"); // /logo.svg
```

---

← Anterior: [route.locales()](topic-helper-locales.md) · [Todos os tópicos](internationalization.md)
