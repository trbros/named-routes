# generateRoutes()

[Documentation](index.md) / [Generator & tooling API](generator.md)

[English](../en/topic-generator-generate.md) · [Português](../pt/topic-generator-generate.md) · [Español](../es/topic-generator-generate.md) · [日本語](../ja/topic-generator-generate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-generate"></a>

Node tooling only: discover and write the generated module. With check: true, reject a stale output without modifying it. Returns output and changed as well as discovery information.

## Example

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

## Related topics

- [Programmatic generator API](topic-generator-api.md)
- [generate](topic-cli-generate.md)
- [check](topic-cli-check.md)

---

← Previous: [discoverRoutes()](topic-generator-discover.md) · [All topics](generator.md) · Next: [validateOptions()](topic-generator-validate.md) →
