# Segmentos mistos

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-mixed-parameters.md) · [Português](../pt/topic-mixed-parameters.md) · [Español](../es/topic-mixed-parameters.md) · [日本語](../ja/topic-mixed-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mixed-parameters"></a>

Um segmento misto combina texto literal e parâmetros obrigatórios. Cada parâmetro dinâmico possui sua própria chave tipada.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

## Tópicos relacionados

- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Regras de nomes automáticos](topic-naming.md)

---

← Anterior: [Parâmetros catch-all](topic-catch-all-parameters.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Query strings](topic-query-hash.md) →
