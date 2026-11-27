# Read the generated manifest

[Documentation](index.md) / [Start here](getting-started.md)

[English](../en/topic-generated-source.md) · [Português](../pt/topic-generated-source.md) · [Español](../es/topic-generated-source.md) · [日本語](../ja/topic-generated-source.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generated-source"></a>

Each manifest entry shows the relative source file. Ordinary property keys are string literals, avoiding computed-key lint warnings. __proto__ remains computed to preserve a safe data property. Never edit the generated module; edit the source route or config and regenerate.

## Example

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```

---

← Previous: [Automatic naming rules](topic-naming.md) · [All topics](getting-started.md) · Next: [Compared with alternatives](topic-comparison.md) →
