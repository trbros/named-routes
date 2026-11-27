# formatPattern()

[Documentación](index.md) / [Referencia de rutas e inspección](route-helpers.md)

[English](../en/topic-helper-format-pattern.md) · [Português](../pt/topic-helper-format-pattern.md) · [Español](../es/topic-helper-format-pattern.md) · [日本語](../ja/topic-helper-format-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-format-pattern"></a>

Serializa los segmentos a la sintaxis canónica. No es una URL concreta.

## Ejemplo

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

## Temas relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parámetros obligatorios y codificación](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [parsePattern()](topic-helper-parse-pattern.md) · [Todos los temas](route-helpers.md) · Siguiente: [patternParameters()](topic-helper-pattern-parameters.md) →
