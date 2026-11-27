# Configuração do gerador

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-configuration.md) · [Português](../pt/topic-configuration.md) · [Español](../es/topic-configuration.md) · [日本語](../ja/topic-configuration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="configuration"></a>

O arquivo de configuração é opcional. As integrações geram rotas com defaults; adicione apenas o necessário. A busca segue .ts, .mts, .mjs, .js, .cjs, .json; use .mjs se Node não carregar TypeScript. defineConfig fornece autocomplete e a geração rejeita opções desconhecidas. --config seleciona outro arquivo.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

## Tópicos relacionados

- [Descoberta e diretórios](topic-config-discovery.md)
- [Saída gerada e exports](topic-config-output.md)
- [Convenções de nomes](topic-config-naming.md)
- [Defaults de URL](topic-config-defaults.md)
- [Ativar descoberta de APIs](topic-config-api.md)
- [Adicionar rotas explícitas](topic-config-extra-routes.md)

---

← Anterior: [Referência da API de runtime](topic-runtime-api.md) · [Todos os tópicos](api-reference.md) · Próximo: [Descoberta e diretórios](topic-config-discovery.md) →
