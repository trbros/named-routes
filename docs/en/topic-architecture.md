# How generation works

[Documentation](index.md) / [Start here](getting-started.md)

[English](../en/topic-architecture.md) · [Português](../pt/topic-architecture.md) · [Español](../es/topic-architecture.md) · [日本語](../ja/topic-architecture.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="architecture"></a>

The Node-only generator reads route files and framework route tables. It parses endpoint declarations statically when includeApi is enabled; it does not invoke endpoint handlers. Framework-specific discovery may run the framework route-list command. The generated module contains public patterns and helpers; the browser runtime has no Node.js imports. The framework remains responsible for serving pages and applying navigation rules.

## Example

```sh
npx @triooo/named-routes list
```

## Related topics

- [Discovery edge cases](topic-discovery.md)
- [Programmatic generator API](topic-generator-api.md)
- [Read the generated manifest](topic-generated-source.md)

---

← Previous: [Compared with alternatives](topic-comparison.md) · [All topics](getting-started.md)
