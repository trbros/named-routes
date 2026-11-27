# 生成マニフェストを読む

Topic: `generated-source` · Named Routes v2.2.0

各エントリに相対ファイルパスを表示します。通常のキーは文字列リテラルで、__proto__ は安全のため計算キーのままです。生成ファイルは直接編集しないでください。

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
