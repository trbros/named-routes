# Claude Desktop e Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

No Claude Desktop, adicione o servidor em mcpServers na configuração MCP local (configurações de desenvolvedor). Mescle a entrada ao JSON existente; não substitua outros servidores. Reinicie o cliente e confira as ferramentas.

No Claude Code, use a configuração MCP ou claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Confira com claude mcp list. Fixe a versão se necessário. No Windows, o launcher Node absoluto do guia Windows evita problemas com shims do npx.

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
