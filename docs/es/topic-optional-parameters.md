# Parámetros opcionales

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-optional-parameters.md) · [Português](../pt/topic-optional-parameters.md) · [Español](../es/topic-optional-parameters.md) · [日本語](../ja/topic-optional-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="optional-parameters"></a>

Usa [[id]] para un parámetro escalar opcional. Omite el valor para omitir el segmento. Las convenciones dependen del router.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

## Temas relacionados

- [Parámetros obligatorios y codificación](topic-parameters.md)
- [Parámetros catch-all](topic-catch-all-parameters.md)
- [Reglas de nombres automáticos](topic-naming.md)

---

← Anterior: [Parámetros obligatorios y codificación](topic-parameters.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Parámetros catch-all](topic-catch-all-parameters.md) →
