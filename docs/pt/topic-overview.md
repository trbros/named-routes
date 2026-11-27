# O que ele faz

[Documentação](index.md) / [Primeiros passos](getting-started.md)

[English](../en/topic-overview.md) · [Português](../pt/topic-overview.md) · [Español](../es/topic-overview.md) · [日本語](../ja/topic-overview.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="overview"></a>

O Named Routes gera helpers de URL tipados a partir das rotas que seu framework já conhece. Use um nome estável em vez de reconstruir caminhos. Ele não substitui o roteador, não navega e não envia requisições HTTP. Comece pela instalação e escolha seu framework; consulte a referência quando precisar.

## Exemplo

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

## Tópicos relacionados

- [Instalação](topic-installation.md)
- [Escolha seu framework](topic-frameworks.md)
- [Regras de nomes automáticos](topic-naming.md)
- [Nomes estáveis opcionais](topic-stable-names.md)
- [route()](topic-helper-route.md)
- [Instalar e iniciar o MCP](topic-mcp-installation.md)

---

[Todos os tópicos](getting-started.md) · Próximo: [Instalação](topic-installation.md) →
