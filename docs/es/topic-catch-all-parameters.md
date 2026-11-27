# Parámetros catch-all

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-catch-all-parameters.md) · [Português](../pt/topic-catch-all-parameters.md) · [Español](../es/topic-catch-all-parameters.md) · [日本語](../ja/topic-catch-all-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="catch-all-parameters"></a>

Un [...slug] obligatorio recibe un array no vacío; [[...slug]] puede omitirse. Cada elemento es un segmento distinto.

## Ejemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

## Temas relacionados

- [Parámetros opcionales](topic-optional-parameters.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)

---

← Anterior: [Parámetros opcionales](topic-optional-parameters.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Segmentos mixtos](topic-mixed-parameters.md) →
