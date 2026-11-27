# HTTP endpoints

Topic: `nuxt-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `server/api/admin.get.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
