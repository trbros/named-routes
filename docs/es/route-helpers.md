# Helpers de rutas · @triooo/named-routes

[← Volver al README](../../README.es.md) · [English](../en/route-helpers.md) · [Português](../pt/route-helpers.md) · [Español](../es/route-helpers.md) · [日本語](../ja/route-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [route()](#helper-route)
- [route.localize()](#helper-localize)
- [route.match()](#helper-match)
- [route.parseQuery()](#helper-parse-query)
- [route.is()](#helper-is)
- [route.breadcrumbs()](#helper-breadcrumbs)
- [route.has()](#helper-has)
- [route.names()](#helper-names)
- [route.pattern()](#helper-pattern)
- [route.locales()](#helper-locales)
- [route.forLocale()](#helper-for-locale)

<a id="helper-route"></a>

## route()

`route(name, params?, options?)` genera una URL con nombre. Los nombres y parámetros obligatorios están tipados. Por defecto omite la base de navegación y el idioma; indica las opciones para enlaces HTML, fetch y URLs externas. Una URL absoluta requiere origin. Los nombres o parámetros inválidos lanzan NamedRouteError. No realiza la navegación.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, {
  basePath: "/app", origin: "https://example.com",
});
urls("home"); // /
urls("users.show", { id: 42 }); // /users/42
urls("users.show", { id: 42 }, { basePath: true, query: { tab: "posts" }, hash: "bio" });
// /app/users/42?tab=posts#bio
urls("users.show", { id: 42 }, { absolute: true });
// https://example.com/app/users/42
```

<a id="helper-localize"></a>

## route.localize()

`route.localize(url, locale?, options?)` traduce una URL existente mediante la tabla de rutas, conservando query y fragmento. Úsalo en selectores de idioma y redirecciones. Devuelve null si no hay una ruta localizada inequívoca. Para URLs públicas con basePath usa `{ basePath: true }`; usa `sourceLocale` para desambiguar rutas sin prefijo cuando sea necesario. No traduce valores de slugs ni detecta el idioma del visitante.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.localize("/sobre", "en"); // /en/about
urls.localize("/pt/artigos/42?tab=comments#top", "en");
// /en/posts/42?tab=comments#top
urls.localize("/missing", "en"); // null
```

<a id="helper-match"></a>

## route.match()

`route.match(url, options?)` reconoce una ruta y devuelve un resultado discriminado con name, pattern, params, locale y query sin procesar, o null. Usa `{ basePath: true }` si la entrada incluye la base. Los parámetros se refinan por nombre; usa parseQuery para convertirlos mediante esquemas. No es autorización.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
const found = urls.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") {
  console.log(found.params.id); // "42"
  console.log(found.query.tab); // "posts"
}
urls.match("/unknown"); // null
```

<a id="helper-parse-query"></a>

## route.parseQuery()

`route.parseQuery(name, input)` lee la query de una URL o cadena y devuelve un resultado con `ok`. Un Standard Schema en runtime convierte y valida valores; los esquemas solo de tipos devuelven valores sin procesar. En módulos generados usa `query` y `validateQuery: true`. Zod es una dependencia opcional del consumidor. No uses el valor si falla la validación.

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```

<a id="helper-is"></a>

## route.is()

`route.is(name, url, options?)` verifica si una URL coincide con la ruta nombrada. Usa `exact: false` para incluir descendientes y `{ basePath: true }` para URLs con base. Sirve para navegación activa, no para controlar acceso. Rechaza nombres desconocidos.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ users: "/users", "users.show": "/users/[id]" });
urls.is("users", "/users/42"); // false
urls.is("users", "/users/42", { exact: false }); // true
urls.is("users.show", "/users/42"); // true
```

<a id="helper-breadcrumbs"></a>

## route.breadcrumbs()

`route.breadcrumbs(url, options?)` devuelve coincidencias conocidas de los caminos ancestros, de raíz a hoja. No inventa rutas ni etiquetas; asigna los nombres a textos traducidos en la aplicación. Usa `{ basePath: true }` si la URL incluye la base.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });
urls.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="helper-has"></a>

## route.has()

`route.has(name)` consulta el manifiesto y restringe una cadena a un nombre válido. No verifica que el servidor sirva la ruta. Úsalo antes de acceder a rutas seleccionadas desde entradas externas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

<a id="helper-names"></a>

## route.names()

`route.names()` devuelve los nombres conocidos en un array tipado. Úsalo en depuración y herramientas de desarrollo; no expresa permisos ni garantiza acceso a todas las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

<a id="helper-pattern"></a>

## route.pattern()

`route.pattern(name, locale?)` devuelve la plantilla, no una URL generada. Un idioma devuelve la plantilla traducida si está configurada. No sustituye parámetros ni añade prefijos. Usa route() para una URL navegable.

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

<a id="helper-locales"></a>

## route.locales()

`route.locales()` lista los idiomas configurados o un array vacío sin i18n. Es configuración, no detección del navegador o la petición. Úsalo en selectores de idioma.

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

<a id="helper-for-locale"></a>

## route.forLocale()

`route.forLocale(locale)` crea un helper ligado al idioma configurado. Una opción locale explícita posterior puede reemplazarlo. El helper original no cambia y los assets nunca heredan el idioma. Úsalo para varios enlaces de un idioma conocido.

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

← Anterior: [Construye con rutas](build-with-routes.md) · [Volver al README](../../README.es.md) · Siguiente: [Archivos públicos](public-assets.md) →
