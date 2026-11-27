# parsePattern()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-parse-pattern.md) · [Português](../pt/topic-helper-parse-pattern.md) · [Español](../es/topic-helper-parse-pattern.md) · [日本語](../ja/topic-helper-parse-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-pattern"></a>

Interprete e valide um padrão canônico em registros de segmentos. Use em ferramentas, não para navegar.

## Exemplo

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

## Tópicos relacionados

- [createRoutes()](topic-helper-create-routes.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.withDefaults()](topic-helper-with-defaults.md) · [Todos os tópicos](route-helpers.md) · Próximo: [formatPattern()](topic-helper-format-pattern.md) →
