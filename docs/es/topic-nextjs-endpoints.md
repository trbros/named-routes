# Endpoints HTTP

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-endpoints.md) · [Português](../pt/topic-nextjs-endpoints.md) · [Español](../es/topic-nextjs-endpoints.md) · [日本語](../ja/topic-nextjs-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-endpoints"></a>

Activa includeApi: true y crea `app/api/admin/route.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

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

← Anterior: [Enlaces localizados](topic-nextjs-i18n.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Recetas para el App Router](topic-app-router.md) →
