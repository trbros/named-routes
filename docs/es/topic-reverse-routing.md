# Enrutamiento inverso y ruta activa

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-reverse-routing.md) · [Português](../pt/topic-reverse-routing.md) · [Español](../es/topic-reverse-routing.md) · [日本語](../ja/topic-reverse-routing.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="reverse-routing"></a>

route.match(url) devuelve la ruta con nombre a la que apunta una ruta, con los params decodificados, la query (las claves repetidas se convierten en arrays), el hash y el idioma, o null. Acepta una ruta relativa a la raíz, como /users/42?tab=posts#bio, o un objeto URL; las URLs absolutas solo coinciden en el origin configurado o en un dominio de i18n. route.is(nombre, url) compara una URL con una ruta; { exact: false } también acepta descendientes, para secciones activas de la navegación. route.breadcrumbs(url) devuelve las coincidencias de cada ruta antecesora.

Los segmentos estáticos ganan, luego los mixtos, dinámicos, opcionales, catch-all y catch-all opcionales, comparados de izquierda a derecha; los patrones igual de específicos se resuelven por orden de declaración. Los segmentos se separan antes de decodificarse, así que %2F permanece dentro de un parámetro; un percent-encoding mal formado, los segmentos vacíos y las URLs relativas o sin protocolo devuelven null. Pasa { basePath: true } cuando la URL incluye basePath (window.location.pathname). Se reconocen los prefijos de idioma, los prefijos personalizados y los pathnames localizados.

La coincidencia describe solo tu tabla de rutas: no es autorización, no demuestra que un recurso exista ni que una navegación vaya a funcionar, y no sustituye al router del framework. La query se devuelve como strings; analízala con tu propio schema, por ejemplo schema.parse(found.query) con coerción.

## Ejemplo

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

## Temas relacionados

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

[Todos los temas](route-helpers.md) · Siguiente: [route.match()](topic-helper-match.md) →
