# defineQuery()

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-helper-define-query.md) · [Português](../pt/topic-helper-define-query.md) · [Español](../es/topic-helper-define-query.md) · [日本語](../ja/topic-helper-define-query.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-define-query"></a>

Use um mapa de Standard Schema por rota. O helper preserva tipos de entrada e saída. Validadores síncronos podem validar em runtime; o pacote de schema é dependência opcional do consumidor.

## Exemplo

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

## Tópicos relacionados

- [Query parameters tipados](topic-typed-query.md)
- [Conectar um schema de query](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Usar queries tipadas](topic-query-schema-use.md) · [Todos os tópicos](queries.md) · Próximo: [defineQuery.type<T>()](topic-helper-define-query-type.md) →
