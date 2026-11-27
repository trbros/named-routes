# route.has()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-has.md) · [Português](../pt/topic-helper-has.md) · [Español](../es/topic-helper-has.md) · [日本語](../ja/topic-helper-has.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-has"></a>

`route.has(name)` checks the manifest and narrows an arbitrary string to a valid route name. It does not check whether a server currently serves the route. Use it before accessing routes selected from external input.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

## Related topics

- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Previous: [route.breadcrumbs()](topic-helper-breadcrumbs.md) · [All topics](route-helpers.md) · Next: [route.names()](topic-helper-names.md) →
