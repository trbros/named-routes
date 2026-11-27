# Ativar descoberta de APIs

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-api.md) · [Português](../pt/topic-config-api.md) · [Español](../es/topic-config-api.md) · [日本語](../ja/topic-config-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-api"></a>

includeApi é false por padrão. Ative para incluir URLs de endpoints reconhecidas pelo adaptador. Descritores são gerados somente para métodos detectáveis estaticamente. Não gera OpenAPI nem autorização.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← Anterior: [Adicionar rotas explícitas](topic-config-extra-routes.md) · [Todos os tópicos](api-reference.md) · Próximo: [Watch e opções de desenvolvimento](topic-config-watch.md) →
