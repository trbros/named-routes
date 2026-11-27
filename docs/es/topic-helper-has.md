# route.has()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-has.md) · [Português](../pt/topic-helper-has.md) · [Español](../es/topic-helper-has.md) · [日本語](../ja/topic-helper-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-has"></a>

`route.has(name)` consulta el manifiesto y restringe una cadena a un nombre válido. No verifica que el servidor sirva la ruta. Úsalo antes de acceder a rutas seleccionadas desde entradas externas.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

## Temas relacionados

- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.breadcrumbs()](topic-helper-breadcrumbs.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.names()](topic-helper-names.md) →
