# Mixed route segments

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-mixed-parameters.md) · [Português](../pt/topic-mixed-parameters.md) · [Español](../es/topic-mixed-parameters.md) · [日本語](../ja/topic-mixed-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mixed-parameters"></a>

A mixed segment combines literal text and required parameters. Every dynamic parameter still has its own typed key.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

## Related topics

- [Required parameters & encoding](topic-parameters.md)
- [Automatic naming rules](topic-naming.md)

---

← Previous: [Catch-all parameters](topic-catch-all-parameters.md) · [All topics](build-with-routes.md) · Next: [Query strings](topic-query-hash.md) →
