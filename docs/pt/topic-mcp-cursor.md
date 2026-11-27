# Configuração do Cursor

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-cursor.md) · [Português](../pt/topic-mcp-cursor.md) · [Español](../es/topic-mcp-cursor.md) · [日本語](../ja/topic-mcp-cursor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-cursor"></a>

Adicione a entrada ao .cursor/mcp.json do projeto (ou à configuração MCP global equivalente). Mescle as entradas existentes de mcpServers. Autorize o servidor local apenas para projetos confiáveis.

O exemplo pressupõe que a versão com MCP está disponível no npm. Para checkout local ou shim com problema no Windows, prefira o launcher Node direto.

## Exemplo

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

## Tópicos relacionados

- [Conectar um projeto local](topic-mcp-project.md)
- [Windows e launcher Node direto](topic-mcp-windows.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)

---

← Anterior: [Claude Desktop e Claude Code](topic-mcp-claude.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Configuração do Codex](topic-mcp-codex.md) →
