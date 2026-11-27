# Read the generated manifest

Topic: `generated-source` · Named Routes v2.2.0

Each manifest entry shows the relative source file. Ordinary property keys are string literals, avoiding computed-key lint warnings. __proto__ remains computed to preserve a safe data property. Never edit the generated module; edit the source route or config and regenerate.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
