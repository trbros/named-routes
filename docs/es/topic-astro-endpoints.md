# Endpoints HTTP

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-endpoints.md) · [Português](../pt/topic-astro-endpoints.md) · [Español](../es/topic-astro-endpoints.md) · [日本語](../ja/topic-astro-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-endpoints"></a>

Activa includeApi: true y crea `src/pages/api/admin.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

## Ejemplo

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

## Temas relacionados

- [api generada — descriptores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Activar descubrimiento de API](topic-config-api.md)

---

← Anterior: [Enlaces localizados](topic-astro-i18n.md) · [Todos los temas](framework-astro.md)
