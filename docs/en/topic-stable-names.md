# Optional stable names

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-stable-names.md) · [Português](../pt/topic-stable-names.md) · [Español](../es/topic-stable-names.md) · [日本語](../ja/topic-stable-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="stable-names"></a>

Automatic names follow URL structure. If a refactor moves a public URL and you need a stable semantic name, update the optional names map. Every aliased path must exist. Unlisted routes keep automatic names. Duplicate names and typos fail generation instead of silently creating broken links.

A custom name replaces the automatic name for that path; it does not add a second alias automatically. This is useful for Laravel-style names such as posts.show, but it is not required for normal use.

## Example

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

## Related topics

- [Semantic route names and groups](topic-semantic-names.md)
- [Naming conventions](topic-config-naming.md)
- [Automatic naming rules](topic-naming.md)

---

← Previous: [Semantic route names and groups](topic-semantic-names.md) · [All topics](build-with-routes.md) · Next: [TypeScript and Next typedRoutes](topic-typescript.md) →
