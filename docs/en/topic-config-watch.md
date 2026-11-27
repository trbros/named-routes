# Watch & development options

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-watch.md) · [Português](../pt/topic-config-watch.md) · [Español](../es/topic-config-watch.md) · [日本語](../ja/topic-config-watch.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-watch"></a>

The integration handles updates during development. withNamedRoutes accepts watch, watchMode and watchInterval; use polling only when native events are unreliable. CLI watch supports --watch-mode poll. Restart the framework after changing its router base.

## Example

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

## Related topics

- [Automatic development updates](topic-development.md)
- [watch](topic-cli-watch.md)

---

← Previous: [Enable API discovery](topic-config-api.md) · [All topics](api-reference.md)
