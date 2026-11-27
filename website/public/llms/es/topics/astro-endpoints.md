# Endpoints HTTP

Topic: `astro-endpoints` · Named Routes v2.2.0

Activa includeApi: true y crea `src/pages/api/admin.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
