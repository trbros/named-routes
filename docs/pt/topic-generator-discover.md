# discoverRoutes()

[Documentação](index.md) / [Gerador e API de ferramentas](generator.md)

[English](../en/topic-generator-discover.md) · [Português](../pt/topic-generator-discover.md) · [Español](../es/topic-generator-discover.md) · [日本語](../ja/topic-generator-discover.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-discover"></a>

Apenas ferramentas Node: descubra rotas sem gravar o arquivo de saída. Inspecione entries, framework e metadados de descoberta.

## Exemplo

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

## Tópicos relacionados

- [API programática do gerador](topic-generator-api.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [API programática do gerador](topic-generator-api.md) · [Todos os tópicos](generator.md) · Próximo: [generateRoutes()](topic-generator-generate.md) →
