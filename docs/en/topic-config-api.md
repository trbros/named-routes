# Enable API discovery

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-api.md) · [Português](../pt/topic-config-api.md) · [Español](../es/topic-config-api.md) · [日本語](../ja/topic-config-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-api"></a>

includeApi is false by default. Enable it to include endpoint URLs recognized by the adapter. Method descriptors are generated only where method declarations are statically identifiable. This is not OpenAPI generation or an authorization layer.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Previous: [Add explicit routes](topic-config-extra-routes.md) · [All topics](api-reference.md) · Next: [Watch & development options](topic-config-watch.md) →
