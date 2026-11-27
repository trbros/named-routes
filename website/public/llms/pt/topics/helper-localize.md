# route.localize()

Topic: `helper-localize` · Named Routes v2.2.0

`route.localize(url, locale?, options?)` traduz uma URL existente pela tabela de rotas, preservando query e fragmento. Use em seletores de idioma e redirects. Retorna null quando não existe uma rota localizada inequívoca. Para uma URL pública com basePath, use `{ basePath: true }`; use `sourceLocale` para desambiguar caminhos traduzidos sem prefixo quando necessário. Não traduz valores de slugs dinâmicos nem detecta o idioma do visitante.

## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```
