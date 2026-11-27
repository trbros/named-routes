# createRoutes()

[Documentação](index.md) / [Referência de rotas e inspeção](route-helpers.md)

[English](../en/topic-helper-create-routes.md) · [Português](../pt/topic-helper-create-routes.md) · [Español](../es/topic-helper-create-routes.md) · [日本語](../ja/topic-helper-create-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-create-routes"></a>

Crie um helper independente e congelado a partir do manifesto nome → padrão. Preserve tipos literais para autocomplete. Defaults pertencem ao helper; não há imports do filesystem ou framework no navegador.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

## Tópicos relacionados

- [Rotas manuais (React, Vue, qualquer router)](topic-manual-routes.md)
- [route()](topic-helper-route.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← Anterior: [route.pattern()](topic-helper-pattern.md) · [Todos os tópicos](route-helpers.md) · Próximo: [route.withDefaults()](topic-helper-with-defaults.md) →
