# Endpoints HTTP

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Ative includeApi: true em named-routes.config e crie `server/api/admin.get.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
