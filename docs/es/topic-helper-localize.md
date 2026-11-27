# route.localize()

[Documentación](index.md) / [Internacionalización](internationalization.md)

[English](../en/topic-helper-localize.md) · [Português](../pt/topic-helper-localize.md) · [Español](../es/topic-helper-localize.md) · [日本語](../ja/topic-helper-localize.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-localize"></a>

`route.localize(url, locale?, options?)` traduce una URL existente mediante la tabla de rutas, conservando query y fragmento. Úsalo en selectores de idioma y redirecciones. Devuelve null si no hay una ruta localizada inequívoca. Para URLs públicas con basePath usa `{ basePath: true }`; usa `sourceLocale` para desambiguar rutas sin prefijo cuando sea necesario. No traduce valores de slugs ni detecta el idioma del visitante.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```

---

← Anterior: [Generar una URL localizada](topic-localized-url.md) · [Todos los temas](internationalization.md) · Siguiente: [route.locales()](topic-helper-locales.md) →
