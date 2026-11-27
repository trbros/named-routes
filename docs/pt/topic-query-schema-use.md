# Usar queries tipadas

[Documentação](index.md) / [Queries tipadas e atualização de URLs](queries.md)

[English](../en/topic-query-schema-use.md) · [Português](../pt/topic-query-schema-use.md) · [Español](../es/topic-query-schema-use.md) · [日本語](../ja/topic-query-schema-use.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-use"></a>

Depois de configurar os schemas products e search do guia de query tipada, gere o módulo. O TypeScript rejeita chaves desconhecidas e exige os parâmetros obrigatórios.

## Exemplo

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

## Tópicos relacionados

- [Query parameters tipados](topic-typed-query.md)
- [Conectar um schema de query](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Conectar um schema de query](topic-query-schema-config.md) · [Todos os tópicos](queries.md) · Próximo: [defineQuery()](topic-helper-define-query.md) →
