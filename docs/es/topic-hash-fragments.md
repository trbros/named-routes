# Fragmentos de URL (hash)

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-hash-fragments.md) · [Português](../pt/topic-hash-fragments.md) · [Español](../es/topic-hash-fragments.md) · [日本語](../ja/topic-hash-fragments.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="hash-fragments"></a>

Usa hash para apuntar a una sección. Se elimina un # inicial y se codifica. El navegador no lo envía al servidor.

## Ejemplo

```ts
route.url("about", { hash: "team" }); // /about#team
```

## Temas relacionados

- [Cadenas de consulta](topic-query-hash.md)
- [route.url() — URL públicas](topic-public-url.md)

---

← Anterior: [Cadenas de consulta](topic-query-hash.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Base path — URL interna y pública](topic-base-path.md) →
