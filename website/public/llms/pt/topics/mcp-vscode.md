# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

Crie ou mescle .vscode/mcp.json no workspace confiável. O VS Code usa a chave servers e o tipo stdio, em vez de mcpServers. Inicie pelo controle MCP do editor e confirme que o cliente de chat vê as ferramentas.

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
