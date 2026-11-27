# Watch e opções de desenvolvimento

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-watch.md) · [Português](../pt/topic-config-watch.md) · [Español](../es/topic-config-watch.md) · [日本語](../ja/topic-config-watch.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-watch"></a>

A integração atualiza rotas durante o desenvolvimento. withNamedRoutes aceita watch, watchMode e watchInterval; use polling quando eventos nativos forem instáveis. A CLI aceita --watch-mode poll. Reinicie o framework após alterar a base.

## Exemplo

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

## Tópicos relacionados

- [Atualização automática em desenvolvimento](topic-development.md)
- [watch](topic-cli-watch.md)

---

← Anterior: [Ativar descoberta de APIs](topic-config-api.md) · [Todos os tópicos](api-reference.md)
