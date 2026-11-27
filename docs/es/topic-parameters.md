# Parámetros obligatorios y codificación

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-parameters.md) · [Português](../pt/topic-parameters.md) · [Español](../es/topic-parameters.md) · [日本語](../ja/topic-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="parameters"></a>

Un parámetro [user] acepta una cadena no vacía o número finito. Se codifica como un segmento; se rechazan valores ausentes o inválidos. No valida la existencia del recurso.

## Ejemplo

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

## Temas relacionados

- [Parámetros opcionales](topic-optional-parameters.md)
- [Parámetros catch-all](topic-catch-all-parameters.md)
- [Segmentos mixtos](topic-mixed-parameters.md)
- [route()](topic-helper-route.md)

---

← Anterior: [route.url() — URL públicas](topic-public-url.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Parámetros opcionales](topic-optional-parameters.md) →
