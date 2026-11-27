# Como a geração funciona

[Documentação](index.md) / [Primeiros passos](getting-started.md)

[English](../en/topic-architecture.md) · [Português](../pt/topic-architecture.md) · [Español](../es/topic-architecture.md) · [日本語](../ja/topic-architecture.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="architecture"></a>

O gerador Node lê arquivos e tabelas de rotas do framework. Analisa declarações de endpoints estaticamente quando includeApi está ativo, sem executar handlers. A descoberta pode usar o comando de listagem do framework. O módulo gerado contém padrões públicos e helpers; o runtime do navegador não importa Node.js. O framework continua responsável por servir páginas e aplicar as regras de navegação.

## Exemplo

```sh
npx @triooo/named-routes list
```

## Tópicos relacionados

- [Casos especiais de descoberta](topic-discovery.md)
- [API programática do gerador](topic-generator-api.md)
- [Leia o manifesto gerado](topic-generated-source.md)

---

← Anterior: [Comparação com alternativas](topic-comparison.md) · [Todos os tópicos](getting-started.md)
