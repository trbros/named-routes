# Usar consultas tipadas

[Documentación](index.md) / [Consultas tipadas y actualización de URL](queries.md)

[English](../en/topic-query-schema-use.md) · [Português](../pt/topic-query-schema-use.md) · [Español](../es/topic-query-schema-use.md) · [日本語](../ja/topic-query-schema-use.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-schema-use"></a>

Tras configurar los esquemas products y search, regenera el módulo. TypeScript rechaza claves desconocidas y exige los parámetros obligatorios.

## Ejemplo

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

## Temas relacionados

- [Parámetros de query tipados](topic-typed-query.md)
- [Conectar un esquema de consulta](topic-query-schema-config.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← Anterior: [Conectar un esquema de consulta](topic-query-schema-config.md) · [Todos los temas](queries.md) · Siguiente: [defineQuery()](topic-helper-define-query.md) →
