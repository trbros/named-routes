# HTTP endpoints

Topic: `sveltekit-endpoints` · Named Routes v2.2.0

Enable includeApi: true in named-routes.config and create `src/routes/api/admin/+server.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
