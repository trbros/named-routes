# Parâmetros opcionais

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-optional-parameters.md) · [Português](../pt/topic-optional-parameters.md) · [Español](../es/topic-optional-parameters.md) · [日本語](../ja/topic-optional-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="optional-parameters"></a>

Use [[id]] para um parâmetro escalar opcional. Omita o valor para omitir o segmento. Em apps gerados use a convenção equivalente do framework; o suporte varia.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

## Tópicos relacionados

- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Parâmetros catch-all](topic-catch-all-parameters.md)
- [Regras de nomes automáticos](topic-naming.md)

---

← Anterior: [Parâmetros obrigatórios e encoding](topic-parameters.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Parâmetros catch-all](topic-catch-all-parameters.md) →
