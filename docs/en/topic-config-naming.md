# Naming conventions

[Documentation](index.md) / [Configuration & runtime reference](api-reference.md)

[English](../en/topic-config-naming.md) · [Português](../pt/topic-config-naming.md) · [Español](../es/topic-config-naming.md) · [日本語](../ja/topic-config-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-naming"></a>

naming.style controls path or semantic names. separator, paramPrefix and home customize the path convention; transform can override an automatic name in a JavaScript or TypeScript config. names wins over automatic naming. Collisions fail generation.

## Example

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Related topics

- [Semantic route names and groups](topic-semantic-names.md)
- [Optional stable names](topic-stable-names.md)
- [Automatic naming rules](topic-naming.md)

---

← Previous: [Generated output & exports](topic-config-output.md) · [All topics](api-reference.md) · Next: [URL defaults](topic-config-defaults.md) →
