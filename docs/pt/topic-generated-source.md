# Leia o manifesto gerado

[Documentação](index.md) / [Primeiros passos](getting-started.md)

[English](../en/topic-generated-source.md) · [Português](../pt/topic-generated-source.md) · [Español](../es/topic-generated-source.md) · [日本語](../ja/topic-generated-source.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generated-source"></a>

Cada entrada mostra o arquivo de origem relativo. Chaves comuns são literais de string, sem o aviso de chave computada. __proto__ permanece computada por segurança. Nunca edite o módulo gerado: altere a rota ou a configuração e gere novamente.

## Exemplo

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```

---

← Anterior: [Regras de nomes automáticos](topic-naming.md) · [Todos os tópicos](getting-started.md) · Próximo: [Comparação com alternativas](topic-comparison.md) →
