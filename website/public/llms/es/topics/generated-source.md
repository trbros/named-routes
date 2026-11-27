# Lee el manifiesto generado

Topic: `generated-source` · Named Routes v2.2.0

Cada entrada indica el archivo relativo. Las claves normales son literales; __proto__ conserva la clave computada por seguridad. Regenera en vez de editar el archivo.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
