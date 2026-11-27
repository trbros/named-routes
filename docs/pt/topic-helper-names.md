# route.names()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-names.md) · [Português](../pt/topic-helper-names.md) · [Español](../es/topic-helper-names.md) · [日本語](../ja/topic-helper-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-names"></a>

`route.names()` retorna os nomes conhecidos em um array tipado. Use em depuração e ferramentas de desenvolvimento; não informa regras de autorização nem garante acesso a todas as rotas.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

## Tópicos relacionados

- [route.has()](topic-helper-has.md)
- [route.pattern()](topic-helper-pattern.md)

---

← Anterior: [route.has()](topic-helper-has.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.pattern()](topic-helper-pattern.md) →
