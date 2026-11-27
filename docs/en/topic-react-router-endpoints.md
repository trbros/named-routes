# HTTP boundaries

[Documentation](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-endpoints.md) · [Português](../pt/topic-react-router-endpoints.md) · [Español](../es/topic-react-router-endpoints.md) · [日本語](../ja/topic-react-router-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-endpoints"></a>

React Router / Remix client routes do not establish HTTP method contracts. Named Routes does not infer verbs from client components, loaders, actions or server functions. Use your server API or generated OpenAPI client; for a known named URL use route.url().

## Example

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Related topics

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [Rewrites and boundaries](topic-boundaries.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Localized links](topic-react-router-i18n.md) · [All topics](framework-react-router.md)
