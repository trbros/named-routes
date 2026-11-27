# Saída gerada e exports

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-output.md) · [Português](../pt/topic-config-output.md) · [Español](../es/topic-config-output.md) · [日本語](../ja/topic-config-output.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-output"></a>

output é src/routes.generated.ts por padrão; use .ts, .mts, .js ou .mjs fora de diretório roteável. exportNames renomeia exports e importSource altera o import do runtime. hrefs: typed é padrão; string restaura o tipo de retorno simples.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

## Tópicos relacionados

- [Leia o manifesto gerado](topic-generated-source.md)
- [Hrefs tipados para o typedRoutes do Next.js](topic-typed-hrefs.md)

---

← Anterior: [Descoberta e diretórios](topic-config-discovery.md) · [Todos os tópicos](api-reference.md) · Próximo: [Convenções de nomes](topic-config-naming.md) →
