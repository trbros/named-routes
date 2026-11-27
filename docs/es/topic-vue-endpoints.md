# Límites de HTTP

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-endpoints.md) · [Português](../pt/topic-vue-endpoints.md) · [Español](../es/topic-vue-endpoints.md) · [日本語](../ja/topic-vue-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-endpoints"></a>

Las rutas cliente de Vue Router no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

## Ejemplo

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [Rewrites y límites](topic-boundaries.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces localizados](topic-vue-i18n.md) · [Todos los temas](framework-vue.md)
