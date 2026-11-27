# Endpoints HTTP

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-endpoints.md) · [Português](../pt/topic-sveltekit-endpoints.md) · [Español](../es/topic-sveltekit-endpoints.md) · [日本語](../ja/topic-sveltekit-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-endpoints"></a>

Activa includeApi: true y crea `src/routes/api/admin/+server.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

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

← Anterior: [Enlaces localizados](topic-sveltekit-i18n.md) · [Todos los temas](framework-sveltekit.md)
