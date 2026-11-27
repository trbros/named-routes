# Parâmetros obrigatórios e encoding

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-parameters.md) · [Português](../pt/topic-parameters.md) · [Español](../es/topic-parameters.md) · [日本語](../ja/topic-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="parameters"></a>

Um parâmetro [user] aceita string não vazia ou número finito. O valor é codificado como um único segmento: uma barra no valor não vira separador. Parâmetros ausentes, extras ou inválidos são rejeitados. O helper valida a URL, não a existência do recurso.

## Exemplo

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

## Tópicos relacionados

- [Parâmetros opcionais](topic-optional-parameters.md)
- [Parâmetros catch-all](topic-catch-all-parameters.md)
- [Segmentos mistos](topic-mixed-parameters.md)
- [route()](topic-helper-route.md)

---

← Anterior: [route.url() — URLs públicas](topic-public-url.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Parâmetros opcionais](topic-optional-parameters.md) →
