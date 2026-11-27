# formatPattern()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-format-pattern.md) · [Português](../pt/topic-helper-format-pattern.md) · [Español](../es/topic-helper-format-pattern.md) · [日本語](../ja/topic-helper-format-pattern.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-format-pattern"></a>

Serialize segment records back into the canonical bracket syntax. This is a pattern, not a concrete URL.

## Example

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

## Related topics

- [createRoutes()](topic-helper-create-routes.md)
- [Required parameters & encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Previous: [parsePattern()](topic-helper-parse-pattern.md) · [All topics](route-helpers.md) · Next: [patternParameters()](topic-helper-pattern-parameters.md) →
