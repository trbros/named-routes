# Parâmetros catch-all

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-catch-all-parameters.md) · [Português](../pt/topic-catch-all-parameters.md) · [Español](../es/topic-catch-all-parameters.md) · [日本語](../ja/topic-catch-all-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="catch-all-parameters"></a>

Um [...slug] obrigatório recebe um array não vazio; [[...slug]] aceita omissão ou array vazio. Cada item é codificado como segmento distinto. Não passe uma string com barras como catch-all.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

## Tópicos relacionados

- [Parâmetros opcionais](topic-optional-parameters.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)

---

← Anterior: [Parâmetros opcionais](topic-optional-parameters.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Segmentos mistos](topic-mixed-parameters.md) →
