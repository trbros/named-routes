# HTTP endpoints

[Documentation](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-endpoints.md) · [Português](../pt/topic-astro-endpoints.md) · [Español](../es/topic-astro-endpoints.md) · [日本語](../ja/topic-astro-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-endpoints"></a>

Enable includeApi: true in named-routes.config and create `src/pages/api/admin.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

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

← Previous: [Localized links](topic-astro-i18n.md) · [All topics](framework-astro.md)
