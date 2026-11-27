# Query strings

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-query-hash.md) · [Português](../pt/topic-query-hash.md) · [Español](../es/topic-query-hash.md) · [日本語](../ja/topic-query-hash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-hash"></a>

Passe query nas opções para adicionar chaves e valores. Números e booleanos são serializados; arrays repetem a chave; null e undefined são omitidos. Query é diferente de params. Schemas tipados são opcionais.

## Exemplo

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

## Tópicos relacionados

- [Query parameters tipados](topic-typed-query.md)
- [route.withQuery()](topic-helper-with-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [Fragmentos da URL (hash)](topic-hash-fragments.md)

---

← Anterior: [Segmentos mistos](topic-mixed-parameters.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Fragmentos da URL (hash)](topic-hash-fragments.md) →
