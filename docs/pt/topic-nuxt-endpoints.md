# Endpoints HTTP

[Documentação](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-endpoints.md) · [Português](../pt/topic-nuxt-endpoints.md) · [Español](../es/topic-nuxt-endpoints.md) · [日本語](../ja/topic-nuxt-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-endpoints"></a>

Ative includeApi: true em named-routes.config e crie `server/api/admin.get.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

## Exemplo

```ts
export default defineEventHandler(() => ({ ok: true }));
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Ativar descoberta de APIs](topic-config-api.md)

---

← Anterior: [Links internacionalizados](topic-nuxt-i18n.md) · [Todos os tópicos](framework-nuxt.md)
