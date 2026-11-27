# validateOptions()

[Documentation](index.md) / [Generator & tooling API](generator.md)

[English](../en/topic-generator-validate.md) · [Português](../pt/topic-generator-validate.md) · [Español](../es/topic-generator-validate.md) · [日本語](../ja/topic-generator-validate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-validate"></a>

Validate generator options in Node tooling. Unknown keys or invalid values throw INVALID_CONFIG. defineConfig is the typed config authoring helper; actual generation validates the runtime input.

## Example

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

## Related topics

- [Generator configuration](topic-configuration.md)
- [Programmatic generator API](topic-generator-api.md)

---

← Previous: [generateRoutes()](topic-generator-generate.md) · [All topics](generator.md)
