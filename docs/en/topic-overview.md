# What it does

[Documentation](index.md) / [Start here](getting-started.md)

[English](../en/topic-overview.md) · [Português](../pt/topic-overview.md) · [Español](../es/topic-overview.md) · [日本語](../ja/topic-overview.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="overview"></a>

Named Routes generates typed URL helpers from routes your framework already knows. Use a stable name instead of reconstructing paths. It does not replace your router, perform navigation or send HTTP requests. Start with installation and choose your framework; explore the reference as needed.

## Example

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

## Related topics

- [Installation](topic-installation.md)
- [Choose your framework](topic-frameworks.md)
- [Automatic naming rules](topic-naming.md)
- [Optional stable names](topic-stable-names.md)
- [route()](topic-helper-route.md)
- [Install and start MCP](topic-mcp-installation.md)

---

[All topics](getting-started.md) · Next: [Installation](topic-installation.md) →
