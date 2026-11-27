# Configuração do Cursor

Topic: `mcp-cursor` · Named Routes v2.2.0

Adicione a entrada ao .cursor/mcp.json do projeto (ou à configuração MCP global equivalente). Mescle as entradas existentes de mcpServers. Autorize o servidor local apenas para projetos confiáveis.

O exemplo pressupõe que a versão com MCP está disponível no npm. Para checkout local ou shim com problema no Windows, prefira o launcher Node direto.

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
