# Conectar um projeto local

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-project.md) · [Português](../pt/topic-mcp-project.md) · [Español](../es/topic-mcp-project.md) · [日本語](../ja/topic-mcp-project.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-project"></a>

Sem --root, o servidor oferece apenas documentação. Para inspecionar rotas, configure explicitamente o diretório confiável do projeto. O servidor não descobre rotas executando o framework. Primeiro gere o módulo no consumidor usando a integração ou CLI existente.

Use --manifest para saídas personalizadas ou quando houver vários módulos gerados. Seu valor é relativo a --root. Saídas comuns incluem src/routes.generated.ts, app/routes.generated.ts e src/lib/routes.generated.ts. Em monorepos, aponte --root para a aplicação real.

O arquivo deve ser um manifesto TS/JS estático reconhecido dentro da raiz confiável, menor que 2 MiB. A consulta não verifica atualização do manifesto, métodos HTTP, autorização, assets, defaults ou páginas publicadas.

## Exemplo

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

## Tópicos relacionados

- [Instalar e iniciar o MCP](topic-mcp-installation.md)
- [Ferramentas e recursos](topic-mcp-tools.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)
- [Inspector e solução de problemas](topic-mcp-troubleshooting.md)

---

← Anterior: [Instalar e iniciar o MCP](topic-mcp-installation.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Claude Desktop e Claude Code](topic-mcp-claude.md) →
