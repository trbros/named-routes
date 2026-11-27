# route.pattern()

Topic: `helper-pattern` · Named Routes v2.2.0

`route.pattern(name, locale?)` retorna o template da rota, não a URL gerada. Informar o idioma retorna o template traduzido quando configurado. Não substitui parâmetros nem adiciona idioma ou base. Use route() para gerar uma URL navegável.

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

Related topic IDs: helper-parse-pattern, helper-format-pattern
