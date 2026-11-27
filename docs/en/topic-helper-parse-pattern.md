# parsePattern()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-parse-pattern.md) · [Português](../pt/topic-helper-parse-pattern.md) · [Español](../es/topic-helper-parse-pattern.md) · [日本語](../ja/topic-helper-parse-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-parse-pattern"></a>

Parse and validate a canonical pattern into segment records. Use it in tooling, not instead of route() for navigation.

## Example

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

## Related topics

- [createRoutes()](topic-helper-create-routes.md)
- [Required parameters & encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Previous: [route.withDefaults()](topic-helper-with-defaults.md) · [All topics](route-helpers.md) · Next: [formatPattern()](topic-helper-format-pattern.md) →
