# parsePattern()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-parse-pattern.md) · [Português](../pt/topic-helper-parse-pattern.md) · [Español](../es/topic-helper-parse-pattern.md) · [日本語](../ja/topic-helper-parse-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-pattern"></a>

Interpreta y valida un patrón en segmentos. Úsalo en herramientas.

## Ejemplo

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

## Temas relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.withDefaults()](topic-helper-with-defaults.md) · [Todos los temas](route-helpers.md) · Siguiente: [formatPattern()](topic-helper-format-pattern.md) →
