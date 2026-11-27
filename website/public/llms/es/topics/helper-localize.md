# route.localize()

Topic: `helper-localize` · Named Routes v2.2.0

`route.localize(url, locale?, options?)` traduce una URL existente mediante la tabla de rutas, conservando query y fragmento. Úsalo en selectores de idioma y redirecciones. Devuelve null si no hay una ruta localizada inequívoca. Para URLs públicas con basePath usa `{ basePath: true }`; usa `sourceLocale` para desambiguar rutas sin prefijo cuando sea necesario. No traduce valores de slugs ni detecta el idioma del visitante.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/pt/sobre?tab=info#top", "en");
// /en/about?tab=info#top
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app", i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } } });

route.localize("/app/pt/sobre?tab=info#top", "en", { basePath: true });
// /app/en/about?tab=info#top
```
