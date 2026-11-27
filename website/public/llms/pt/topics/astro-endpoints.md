# Endpoints HTTP

Topic: `astro-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `src/pages/api/admin.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
