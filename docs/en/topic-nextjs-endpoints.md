# HTTP endpoints

[Documentation](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-endpoints.md) · [Português](../pt/topic-nextjs-endpoints.md) · [Español](../es/topic-nextjs-endpoints.md) · [日本語](../ja/topic-nextjs-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-endpoints"></a>

Enable includeApi: true in named-routes.config and create `app/api/admin/route.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

## Example

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Enable API discovery](topic-config-api.md)

---

← Previous: [Localized links](topic-nextjs-i18n.md) · [All topics](framework-nextjs.md) · Next: [App Router recipes](topic-app-router.md) →
