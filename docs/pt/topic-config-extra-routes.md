# Adicionar rotas explícitas

[Documentação](index.md) / [Configuração e referência do runtime](api-reference.md)

[English](../en/topic-config-extra-routes.md) · [Português](../pt/topic-config-extra-routes.md) · [Español](../es/topic-config-extra-routes.md) · [日本語](../ja/topic-config-extra-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-extra-routes"></a>

extraRoutes mapeia um nome escolhido a um padrão canônico para rewrite, manifesto manual ou rota conhecida da aplicação. Ao contrário de names, a URL não precisa ser descoberta. O pacote não cria a página nem o endpoint.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

## Tópicos relacionados

- [Nomes estáveis opcionais](topic-stable-names.md)
- [Rotas manuais (React, Vue, qualquer router)](topic-manual-routes.md)
- [Rewrites e limites](topic-boundaries.md)

---

← Anterior: [Defaults de URL](topic-config-defaults.md) · [Todos os tópicos](api-reference.md) · Próximo: [Ativar descoberta de APIs](topic-config-api.md) →
