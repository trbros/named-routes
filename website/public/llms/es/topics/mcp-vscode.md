# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

Crea o combina .vscode/mcp.json en el espacio de confianza. VS Code usa servers y type stdio en lugar de mcpServers. Inicia el servidor desde los controles MCP del editor y comprueba sus herramientas.

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
