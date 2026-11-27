# Endpoints HTTP

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-endpoints.md) · [Português](../pt/topic-nextjs-endpoints.md) · [Español](../es/topic-nextjs-endpoints.md) · [日本語](../ja/topic-nextjs-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-endpoints"></a>

Ative includeApi: true em named-routes.config e crie `app/api/admin/route.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

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

← Anterior: [Links internacionalizados](topic-nextjs-i18n.md) · [Todos os tópicos](framework-nextjs.md) · Próximo: [Exemplos com App Router](topic-app-router.md) →
