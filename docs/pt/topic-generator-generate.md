# generateRoutes()

[Documentação](index.md) / [Gerador e API de ferramentas](generator.md)

[English](../en/topic-generator-generate.md) · [Português](../pt/topic-generator-generate.md) · [Español](../es/topic-generator-generate.md) · [日本語](../ja/topic-generator-generate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-generate"></a>

Apenas Node: descubra e grave o módulo gerado. Com check: true, rejeita saída desatualizada sem alterar. Retorna output e changed além dos dados de descoberta.

## Exemplo

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

## Tópicos relacionados

- [API programática do gerador](topic-generator-api.md)
- [generate](topic-cli-generate.md)
- [check](topic-cli-check.md)

---

← Anterior: [discoverRoutes()](topic-generator-discover.md) · [Todos os tópicos](generator.md) · Próximo: [validateOptions()](topic-generator-validate.md) →
