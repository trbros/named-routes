# formatPattern()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-format-pattern.md) · [Português](../pt/topic-helper-format-pattern.md) · [Español](../es/topic-helper-format-pattern.md) · [日本語](../ja/topic-helper-format-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-format-pattern"></a>

Serialize registros de segmentos de volta à sintaxe canônica de colchetes. O resultado é um padrão, não uma URL concreta.

## Exemplo

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

## Tópicos relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [parsePattern()](topic-helper-parse-pattern.md) · [Todos os tópicos](route-helpers.md) · Próximo: [patternParameters()](topic-helper-pattern-parameters.md) →
