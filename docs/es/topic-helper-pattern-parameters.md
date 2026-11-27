# patternParameters()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-pattern-parameters.md) · [Português](../pt/topic-helper-pattern-parameters.md) · [Español](../es/topic-helper-pattern-parameters.md) · [日本語](../ja/topic-helper-pattern-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern-parameters"></a>

Lista los nombres de parámetros de los segmentos. Útil en herramientas.

## Ejemplo

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

## Temas relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [formatPattern()](topic-helper-format-pattern.md) · [Todos los temas](route-helpers.md)
