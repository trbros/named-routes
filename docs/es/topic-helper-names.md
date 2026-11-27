# route.names()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-names.md) · [Português](../pt/topic-helper-names.md) · [Español](../es/topic-helper-names.md) · [日本語](../ja/topic-helper-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-names"></a>

`route.names()` devuelve los nombres conocidos en un array tipado. Úsalo en depuración y herramientas de desarrollo; no expresa permisos ni garantiza acceso a todas las rutas.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

## Temas relacionados

- [route.has()](topic-helper-has.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.has()](topic-helper-has.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.pattern()](topic-helper-pattern.md) →
