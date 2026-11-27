# Endpoints HTTP

[Documentação](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-endpoints.md) · [Português](../pt/topic-sveltekit-endpoints.md) · [Español](../es/topic-sveltekit-endpoints.md) · [日本語](../ja/topic-sveltekit-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-endpoints"></a>

Ative includeApi: true em named-routes.config e crie `src/routes/api/admin/+server.ts`. Só métodos detectados explicitamente são gerados. O descritor não chama o handler; use fetch ou seu cliente HTTP.

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

← Anterior: [Links internacionalizados](topic-sveltekit-i18n.md) · [Todos os tópicos](framework-sveltekit.md)
