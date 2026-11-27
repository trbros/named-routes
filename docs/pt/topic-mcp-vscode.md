# VS Code / GitHub Copilot

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-vscode.md) · [Português](../pt/topic-mcp-vscode.md) · [Español](../es/topic-mcp-vscode.md) · [日本語](../ja/topic-mcp-vscode.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-vscode"></a>

Crie ou mescle .vscode/mcp.json no workspace confiável. O VS Code usa a chave servers e o tipo stdio, em vez de mcpServers. Inicie pelo controle MCP do editor e confirme que o cliente de chat vê as ferramentas.

## Exemplo

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
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

← Anterior: [Configuração do Codex](topic-mcp-codex.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Windows e launcher Node direto](topic-mcp-windows.md) →
