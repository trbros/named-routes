# patternParameters()

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-helper-pattern-parameters.md) · [Português](../pt/topic-helper-pattern-parameters.md) · [Español](../es/topic-helper-pattern-parameters.md) · [日本語](../ja/topic-helper-pattern-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-pattern-parameters"></a>

List parameter names from parsed segments. This is useful when inspecting a manifest or generating tooling.

## Example

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

## Related topics

- [createRoutes()](topic-helper-create-routes.md)
- [Required parameters & encoding](topic-parameters.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Previous: [formatPattern()](topic-helper-format-pattern.md) · [All topics](route-helpers.md)
