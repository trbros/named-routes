# Semantic route names and groups

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-semantic-names.md) · [Português](../pt/topic-semantic-names.md) · [Español](../es/topic-semantic-names.md) · [日本語](../ja/topic-semantic-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="semantic-names"></a>

Set naming.style to semantic to use index for parent pages and show for terminal required scalar parameters. Existing names remain the default. Static segment names are not translated or singularized. Set names to give individual URLs a stable semantic name (including create); update that map when the URL moves. Collisions fail generation rather than silently changing behavior.

## Example

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Related topics

- [Optional stable names](topic-stable-names.md)
- [Automatic naming rules](topic-naming.md)
- [Naming conventions](topic-config-naming.md)
- [Read the generated manifest](topic-generated-source.md)

---

← Previous: [Trailing slashes](topic-trailing-slash.md) · [All topics](build-with-routes.md) · Next: [Optional stable names](topic-stable-names.md) →
