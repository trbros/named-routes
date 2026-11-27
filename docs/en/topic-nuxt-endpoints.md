# HTTP endpoints

[Documentation](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-endpoints.md) · [Português](../pt/topic-nuxt-endpoints.md) · [Español](../es/topic-nuxt-endpoints.md) · [日本語](../ja/topic-nuxt-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-endpoints"></a>

Enable includeApi: true in named-routes.config and create `server/api/admin.get.ts`. Only explicitly detected methods are generated. The descriptor does not call the handler. Use fetch or your existing HTTP client to send it.

## Example

```ts
export default defineEventHandler(() => ({ ok: true }));
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Enable API discovery](topic-config-api.md)

---

← Previous: [Localized links](topic-nuxt-i18n.md) · [All topics](framework-nuxt.md)
