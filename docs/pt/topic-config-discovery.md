# Descoberta e diretórios

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-discovery.md) · [Português](../pt/topic-config-discovery.md) · [Español](../es/topic-config-discovery.md) · [日本語](../ja/topic-config-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-discovery"></a>

Use framework: auto (padrão) ou um framework explícito. discovery: framework lê a tabela publicada quando disponível; files força o scanner. Next possui router, appDir e pagesDir; outros usam routesDir. pageExtensions e exclude ajustam a busca. root é relativo ao arquivo de configuração quando declarado nele.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

## Tópicos relacionados

- [Casos especiais de descoberta](topic-discovery.md)
- [Como a geração funciona](topic-architecture.md)
- [Regras de nomes automáticos](topic-naming.md)

---

← Anterior: [Configuração do gerador](topic-configuration.md) · [Todos os tópicos](api-reference.md) · Próximo: [Saída gerada e exports](topic-config-output.md) →
