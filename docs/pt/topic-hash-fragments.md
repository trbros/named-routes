# Fragmentos da URL (hash)

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-hash-fragments.md) · [Português](../pt/topic-hash-fragments.md) · [Español](../es/topic-hash-fragments.md) · [日本語](../ja/topic-hash-fragments.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="hash-fragments"></a>

Use hash para apontar a uma seção da página. O helper remove um # inicial opcional e codifica o fragmento. O navegador não o envia ao servidor.

## Exemplo

```ts
route.url("about", { hash: "team" }); // /about#team
```

## Tópicos relacionados

- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Query strings](topic-query-hash.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Base path — URL interna e pública](topic-base-path.md) →
