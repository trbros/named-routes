# discoverRoutes()

[Documentation](index.md) / [Generator & tooling API](generator.md)

[English](../en/topic-generator-discover.md) · [Português](../pt/topic-generator-discover.md) · [Español](../es/topic-generator-discover.md) · [日本語](../ja/topic-generator-discover.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-discover"></a>

Node tooling only: discover route entries without writing the output file. Inspect entries, framework and discovery metadata.

## Example

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

## Related topics

- [Programmatic generator API](topic-generator-api.md)
- [Discovery edge cases](topic-discovery.md)

---

← Previous: [Programmatic generator API](topic-generator-api.md) · [All topics](generator.md) · Next: [generateRoutes()](topic-generator-generate.md) →
