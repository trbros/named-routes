# patternParameters()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-pattern-parameters.md) · [Português](../pt/topic-helper-pattern-parameters.md) · [Español](../es/topic-helper-pattern-parameters.md) · [日本語](../ja/topic-helper-pattern-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern-parameters"></a>

Liste nomes dos parâmetros dos segmentos analisados. Útil para inspecionar manifestos e gerar ferramentas.

## Exemplo

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

## Tópicos relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [formatPattern()](topic-helper-format-pattern.md) · [Todos os tópicos](route-helpers.md)
