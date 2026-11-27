# Límites de HTTP

[Documentación](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-endpoints.md) · [Português](../pt/topic-react-router-endpoints.md) · [Español](../es/topic-react-router-endpoints.md) · [日本語](../ja/topic-react-router-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-endpoints"></a>

Las rutas cliente de React Router / Remix no establecen contratos HTTP. Usa tu API o cliente OpenAPI; route.url() genera URL conocidas.

## Ejemplo

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [Rewrites y límites](topic-boundaries.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Enlaces localizados](topic-react-router-i18n.md) · [Todos los temas](framework-react-router.md)
