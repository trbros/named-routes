# Endpoints HTTP

[Documentación](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-endpoints.md) · [Português](../pt/topic-nuxt-endpoints.md) · [Español](../es/topic-nuxt-endpoints.md) · [日本語](../ja/topic-nuxt-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-endpoints"></a>

Activa includeApi: true y crea `server/api/admin.get.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

## Ejemplo

```ts
export default defineEventHandler(() => ({ ok: true }));
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Activar descubrimiento de API](topic-config-api.md)

---

← Anterior: [Enlaces localizados](topic-nuxt-i18n.md) · [Todos los temas](framework-nuxt.md)
