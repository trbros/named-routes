# Referencia de rutas e inspección

# Enrutamiento inverso y ruta activa

Topic: `reverse-routing` · Named Routes v2.2.0

route.match(url) devuelve la ruta con nombre a la que apunta una ruta, con los params decodificados, la query (las claves repetidas se convierten en arrays), el hash y el idioma, o null. Acepta una ruta relativa a la raíz, como /users/42?tab=posts#bio, o un objeto URL; las URLs absolutas solo coinciden en el origin configurado o en un dominio de i18n. route.is(nombre, url) compara una URL con una ruta; { exact: false } también acepta descendientes, para secciones activas de la navegación. route.breadcrumbs(url) devuelve las coincidencias de cada ruta antecesora.

Los segmentos estáticos ganan, luego los mixtos, dinámicos, opcionales, catch-all y catch-all opcionales, comparados de izquierda a derecha; los patrones igual de específicos se resuelven por orden de declaración. Los segmentos se separan antes de decodificarse, así que %2F permanece dentro de un parámetro; un percent-encoding mal formado, los segmentos vacíos y las URLs relativas o sin protocolo devuelven null. Pasa { basePath: true } cuando la URL incluye basePath (window.location.pathname). Se reconocen los prefijos de idioma, los prefijos personalizados y los pathnames localizados.

La coincidencia describe solo tu tabla de rutas: no es autorización, no demuestra que un recurso exista ni que una navegación vaya a funcionar, y no sustituye al router del framework. La query se devuelve como strings; analízala con tu propio schema, por ejemplo schema.parse(found.query) con coerción.

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

Related topic IDs: helper-match, helper-is, helper-breadcrumbs
---

# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` reconoce una ruta y devuelve un resultado discriminado con name, pattern, params, locale y query sin procesar, o null. Usa `{ basePath: true }` si la entrada incluye la base. Los parámetros se refinan por nombre; usa parseQuery para convertirlos mediante esquemas. No es autorización.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
---

# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` verifica si una URL coincide con la ruta nombrada. Usa `exact: false` para incluir descendientes y `{ basePath: true }` para URLs con base. Sirve para navegación activa, no para controlar acceso. Rechaza nombres desconocidos.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
---

# route.breadcrumbs()

Topic: `helper-breadcrumbs` · Named Routes v2.2.0

`route.breadcrumbs(url, options?)` devuelve coincidencias conocidas de los caminos ancestros, de raíz a hoja. No inventa rutas ni etiquetas; asigna los nombres a textos traducidos en la aplicación. Usa `{ basePath: true }` si la URL incluye la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

Related topic IDs: helper-match, helper-is
---

# route.has()

Topic: `helper-has` · Named Routes v2.2.0

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

Related topic IDs: helper-names, helper-pattern
---

# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` devuelve los nombres conocidos en un array tipado. Úsalo en depuración y herramientas de desarrollo; no expresa permisos ni garantiza acceso a todas las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
---

# route.pattern()

Topic: `helper-pattern` · Named Routes v2.2.0

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

Related topic IDs: helper-parse-pattern, helper-format-pattern
---

# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

Crea un helper independiente y congelado a partir del manifiesto. Conserva tipos literales para autocompletado.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
---

# route.withDefaults()

Topic: `helper-with-defaults` · Named Routes v2.2.0

Crea un helper aislado con origin, basePath, assetBase o trailingSlash distintos. Rutas, idiomas, idioma vinculado, manifiesto y esquemas siguen disponibles. El helper original no cambia; usa configuración de tenant confiable, no cabeceras Host arbitrarias. Los hrefs del resultado se tipan como string de forma conservadora.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

Related topic IDs: base-path, absolute-urls, helper-create-routes
---

# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

Interpreta y valida un patrón en segmentos. Úsalo en herramientas.

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

Serializa los segmentos a la sintaxis canónica. No es una URL concreta.

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

Lista los nombres de parámetros de los segmentos. Útil en herramientas.

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
