# Limites de HTTP

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-endpoints.md) · [Português](../pt/topic-react-router-endpoints.md) · [Español](../es/topic-react-router-endpoints.md) · [日本語](../ja/topic-react-router-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-endpoints"></a>

Rotas cliente do React Router / Remix não estabelecem contratos de métodos HTTP. O Named Routes não infere verbos de componentes, loaders, actions ou server functions. Use sua API de servidor ou cliente OpenAPI; para uma URL nomeada conhecida use route.url().

## Exemplo

```ts
route.url("users.$id", { params: { id: 42 } });
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [Rewrites e limites](topic-boundaries.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links internacionalizados](topic-react-router-i18n.md) · [Todos os tópicos](framework-react-router.md)
