# Claude Desktop y Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

En Claude Desktop, añade el servidor bajo mcpServers en la configuración MCP local (ajustes de desarrollador). Combina la entrada con el JSON existente sin sustituir otros servidores. Reinicia el cliente y revisa las herramientas.

En Claude Code, usa la configuración MCP o claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Verifica con claude mcp list. Fija la versión si es necesario. En Windows, el lanzador Node absoluto de la guía evita problemas de shims.

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
