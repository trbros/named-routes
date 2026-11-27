# HTTP endpoints

[Documentation](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-endpoints.md) · [Português](../pt/topic-sveltekit-endpoints.md) · [Español](../es/topic-sveltekit-endpoints.md) · [日本語](../ja/topic-sveltekit-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-endpoints"></a>

Enable includeApi: true in named-routes.config and create `src/routes/api/admin/+server.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

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

← Previous: [Localized links](topic-sveltekit-i18n.md) · [All topics](framework-sveltekit.md)
