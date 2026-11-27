# route.names()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-names.md) · [Português](../pt/topic-helper-names.md) · [Español](../es/topic-helper-names.md) · [日本語](../ja/topic-helper-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-names"></a>

`route.names()` returns the known names as a typed array. Use it for debugging or development tools; it does not expose authorization rules or guarantee that every route is reachable by a given user.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

## Related topics

- [route.has()](topic-helper-has.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Previous: [route.has()](topic-helper-has.md) · [All topics](route-helpers.md) · Next: [route.pattern()](topic-helper-pattern.md) →
