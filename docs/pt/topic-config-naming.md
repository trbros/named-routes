# Convenções de nomes

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-naming.md) · [Português](../pt/topic-config-naming.md) · [Español](../es/topic-config-naming.md) · [日本語](../ja/topic-config-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-naming"></a>

naming.style controla path ou semantic. separator, paramPrefix e home personalizam a convenção; transform pode alterar nomes em config JS/TS. names tem prioridade sobre nomes automáticos. Colisões interrompem a geração.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Tópicos relacionados

- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Nomes estáveis opcionais](topic-stable-names.md)
- [Regras de nomes automáticos](topic-naming.md)

---

← Anterior: [Saída gerada e exports](topic-config-output.md) · [Todos os tópicos](api-reference.md) · Próximo: [Defaults de URL](topic-config-defaults.md) →
