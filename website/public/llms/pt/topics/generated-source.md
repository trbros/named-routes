# Leia o manifesto gerado

Topic: `generated-source` · Named Routes v2.2.0

Cada entrada mostra o arquivo de origem relativo. Chaves comuns são literais de string, sem o aviso de chave computada. __proto__ permanece computada por segurança. Nunca edite o módulo gerado: altere a rota ou a configuração e gere novamente.

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```
