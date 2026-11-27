# createRoutes()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-create-routes.md) · [Português](../pt/topic-helper-create-routes.md) · [Español](../es/topic-helper-create-routes.md) · [日本語](../ja/topic-helper-create-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-create-routes"></a>

Crea un helper independiente y congelado a partir del manifiesto. Conserva tipos literales para autocompletado.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

## Temas relacionados

- [Rutas manuales (React, Vue, cualquier router)](topic-manual-routes.md)
- [route()](topic-helper-route.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Anterior: [route.pattern()](topic-helper-pattern.md) · [Todos los temas](route-helpers.md) · Siguiente: [route.withDefaults()](topic-helper-with-defaults.md) →
