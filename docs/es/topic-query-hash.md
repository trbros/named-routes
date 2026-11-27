# Cadenas de consulta

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-query-hash.md) · [Português](../pt/topic-query-hash.md) · [Español](../es/topic-query-hash.md) · [日本語](../ja/topic-query-hash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="query-hash"></a>

Pasa query en las opciones. Los números y booleanos se serializan; los arrays repiten la clave; null y undefined se omiten. Los esquemas son opcionales.

## Ejemplo

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

## Temas relacionados

- [Parámetros de query tipados](topic-typed-query.md)
- [route.withQuery()](topic-helper-with-query.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [Fragmentos de URL (hash)](topic-hash-fragments.md)

---

← Anterior: [Segmentos mixtos](topic-mixed-parameters.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Fragmentos de URL (hash)](topic-hash-fragments.md) →
