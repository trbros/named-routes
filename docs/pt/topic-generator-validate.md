# validateOptions()

[Documentação](index.md) / [Gerador e API de ferramentas](generator.md)

[English](../en/topic-generator-validate.md) · [Português](../pt/topic-generator-validate.md) · [Español](../es/topic-generator-validate.md) · [日本語](../ja/topic-generator-validate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-validate"></a>

Valide opções do gerador em ferramentas Node. Chaves desconhecidas ou valores inválidos geram INVALID_CONFIG. defineConfig auxilia a tipagem; a geração valida a entrada em runtime.

## Exemplo

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

## Tópicos relacionados

- [Configuração do gerador](topic-configuration.md)
- [API programática do gerador](topic-generator-api.md)

---

← Anterior: [generateRoutes()](topic-generator-generate.md) · [Todos os tópicos](generator.md)
