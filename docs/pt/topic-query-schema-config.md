# Conectar um schema de query

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-query-schema-config.md) · [Português](../pt/topic-query-schema-config.md) · [Español](../es/topic-query-schema-config.md) · [日本語](../ja/topic-query-schema-config.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-config"></a>

Aponte query para o módulo que exporta defineQuery como default. Ative validateQuery quando quiser validação em runtime; schemas apenas de tipo nunca validam valores em runtime.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

## Tópicos relacionados

- [Query parameters tipados](topic-typed-query.md)
- [Usar queries tipadas](topic-query-schema-use.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Query parameters tipados](topic-typed-query.md) · [Todos os tópicos](queries.md) · Próximo: [Usar queries tipadas](topic-query-schema-use.md) →
