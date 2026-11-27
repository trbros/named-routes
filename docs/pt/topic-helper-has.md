# route.has()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-has.md) · [Português](../pt/topic-helper-has.md) · [Español](../es/topic-helper-has.md) · [日本語](../ja/topic-helper-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-has"></a>

`route.has(name)` verifica o manifesto e restringe uma string arbitrária a um nome válido. Não verifica se o servidor está servindo a rota. Use antes de acessar rotas escolhidas por entrada externa.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

## Tópicos relacionados

- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.breadcrumbs()](topic-helper-breadcrumbs.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.names()](topic-helper-names.md) →
