# defineQuery.type<T>()

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-helper-define-query-type.md) · [Português](../pt/topic-helper-define-query-type.md) · [Español](../es/topic-helper-define-query-type.md) · [日本語](../ja/topic-helper-define-query-type.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query-type"></a>

Declare o contrato da query apenas com TypeScript. Não adiciona validação em runtime. Valide separadamente valores recebidos do usuário.

## Exemplo

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

## Tópicos relacionados

- [defineQuery()](topic-helper-define-query.md)
- [Query parameters tipados](topic-typed-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [defineQuery()](topic-helper-define-query.md) · [Todos os tópicos](queries.md) · Próximo: [route.parseQuery()](topic-helper-parse-query.md) →
