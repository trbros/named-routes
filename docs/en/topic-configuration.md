# Generator configuration

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-configuration.md) · [Português](../pt/topic-configuration.md) · [Español](../es/topic-configuration.md) · [日本語](../ja/topic-configuration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="configuration"></a>

A configuration file is optional. The integrations generate routes with defaults; add only the settings you need. Files are discovered in .ts, .mts, .mjs, .js, .cjs, .json order; use .mjs if Node cannot load TypeScript configs. defineConfig gives autocomplete and rejects unknown options during generation. The CLI --config selects another file.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

## Related topics

- [Discovery & directories](topic-config-discovery.md)
- [Generated output & exports](topic-config-output.md)
- [Naming conventions](topic-config-naming.md)
- [URL defaults](topic-config-defaults.md)
- [Enable API discovery](topic-config-api.md)
- [Add explicit routes](topic-config-extra-routes.md)

---

← Previous: [Runtime API reference](topic-runtime-api.md) · [All topics](api-reference.md) · Next: [Discovery & directories](topic-config-discovery.md) →
