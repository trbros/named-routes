# HTTP boundaries

[Documentation](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-endpoints.md) · [Português](../pt/topic-vue-endpoints.md) · [Español](../es/topic-vue-endpoints.md) · [日本語](../ja/topic-vue-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-endpoints"></a>

Vue Router client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

## Example

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [Rewrites and boundaries](topic-boundaries.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Localized links](topic-vue-i18n.md) · [All topics](framework-vue.md)
