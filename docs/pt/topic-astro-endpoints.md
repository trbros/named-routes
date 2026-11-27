# Endpoints HTTP

[Documentação](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-endpoints.md) · [Português](../pt/topic-astro-endpoints.md) · [Español](../es/topic-astro-endpoints.md) · [日本語](../ja/topic-astro-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-endpoints"></a>

Ative includeApi: true em named-routes.config e crie `src/pages/api/admin.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

## Exemplo

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

## Tópicos relacionados

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Ativar descoberta de APIs](topic-config-api.md)

---

← Anterior: [Links internacionalizados](topic-astro-i18n.md) · [Todos os tópicos](framework-astro.md)
