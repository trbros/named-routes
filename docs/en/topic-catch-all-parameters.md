# Catch-all parameters

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-catch-all-parameters.md) · [Português](../pt/topic-catch-all-parameters.md) · [Español](../es/topic-catch-all-parameters.md) · [日本語](../ja/topic-catch-all-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="catch-all-parameters"></a>

A required [...slug] takes a nonempty array; optional [[...slug]] accepts omitted or empty values. Each element is encoded as a distinct segment. Do not pass a slash-separated string as a catch-all.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

## Related topics

- [Optional route parameters](topic-optional-parameters.md)
- [Required parameters & encoding](topic-parameters.md)

---

← Previous: [Optional route parameters](topic-optional-parameters.md) · [All topics](build-with-routes.md) · Next: [Mixed route segments](topic-mixed-parameters.md) →
