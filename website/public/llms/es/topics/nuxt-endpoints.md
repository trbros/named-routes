# Endpoints HTTP

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Activa includeApi: true y crea `server/api/admin.get.ts`. Solo se generan métodos detectados explícitamente. Usa fetch o tu cliente HTTP para enviar la petición.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
