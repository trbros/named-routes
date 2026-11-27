# Claude Desktop e Claude Code

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-claude.md) · [Português](../pt/topic-mcp-claude.md) · [Español](../es/topic-mcp-claude.md) · [日本語](../ja/topic-mcp-claude.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-claude"></a>

No Claude Desktop, adicione o servidor em mcpServers na configuração MCP local (configurações de desenvolvedor). Mescle a entrada ao JSON existente; não substitua outros servidores. Reinicie o cliente e confira as ferramentas.

No Claude Code, use a configuração MCP ou claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Confira com claude mcp list. Fixe a versão se necessário. No Windows, o launcher Node absoluto do guia Windows evita problemas com shims do npx.

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

← Anterior: [Conectar um projeto local](topic-mcp-project.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Configuração do Cursor](topic-mcp-cursor.md) →
