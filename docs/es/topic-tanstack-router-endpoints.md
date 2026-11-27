# Límites de HTTP

[Documentación](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-endpoints.md) · [Português](../pt/topic-tanstack-router-endpoints.md) · [Español](../es/topic-tanstack-router-endpoints.md) · [日本語](../ja/topic-tanstack-router-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-endpoints"></a>

Las rutas cliente de TanStack Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

## Ejemplo

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [Rewrites y límites](topic-boundaries.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces localizados](topic-tanstack-router-i18n.md) · [Todos los temas](framework-tanstack-router.md)
