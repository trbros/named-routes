# Lee el manifiesto generado

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-generated-source.md) · [Português](../pt/topic-generated-source.md) · [Español](../es/topic-generated-source.md) · [日本語](../ja/topic-generated-source.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generated-source"></a>

Cada entrada indica el archivo relativo. Las claves normales son literales; __proto__ conserva la clave computada por seguridad. Regenera en vez de editar el archivo.

## Ejemplo

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```

---

← Anterior: [Reglas de nombres automáticos](topic-naming.md) · [Todos los temas](getting-started.md) · Siguiente: [Comparación con alternativas](topic-comparison.md) →
