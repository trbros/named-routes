# HTTP endpoints

Topic: `astro-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `src/pages/api/admin.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
