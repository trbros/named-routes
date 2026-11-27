# Auditoria de rotas e assets

[Documentação](index.md) / [CLI, CI e solução de problemas](guides.md)

[English](../en/topic-audit.md) · [Português](../pt/topic-audit.md) · [Español](../es/topic-audit.md) · [日本語](../ja/topic-audit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="audit"></a>

Execute audit no projeto consumidor para encontrar referências literais a rotas/assets desconhecidos, diferenças de caixa, prefixos duplicados e caminhos hardcoded. Escaneia fontes, ignora outputs e nunca reescreve arquivos. É auditoria lexical conservadora, não parser completo: aliases, expressões multilinha e URLs dinâmicas podem escapar; revise avisos de caminhos hardcoded e src. Erros retornam 1, --strict faz avisos falharem, --json gera diagnóstico legível por máquina.

## Exemplo

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

---

← Anterior: [Diagnóstico: named-routes doctor](topic-doctor.md) · [Todos os tópicos](guides.md) · Próximo: [migrate --to 2](topic-cli-migrate.md) →
