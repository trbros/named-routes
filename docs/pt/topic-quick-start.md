# Sua primeira rota nomeada (Next.js)

[Documentação](index.md) / [Primeiros passos](getting-started.md)

[English](../en/topic-quick-start.md) · [Português](../pt/topic-quick-start.md) · [Español](../es/topic-quick-start.md) · [日本語](../ja/topic-quick-start.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="quick-start"></a>

Configuração mínima do Next.js: adicione o wrapper em next.config.ts, inicie o servidor de desenvolvimento e siga o guia de navegação do Next.js. Para outro framework, use sua página de configuração.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

## Tópicos relacionados

- [Links e navegação](topic-nextjs-navigation.md)
- [Escolha seu framework](topic-frameworks.md)
- [Leia o manifesto gerado](topic-generated-source.md)
- [Instalar e iniciar o MCP](topic-mcp-installation.md)

---

← Anterior: [Escolha seu framework](topic-frameworks.md) · [Todos os tópicos](getting-started.md) · Próximo: [Regras de nomes automáticos](topic-naming.md) →
