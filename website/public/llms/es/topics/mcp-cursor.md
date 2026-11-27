# Configuración de Cursor

Topic: `mcp-cursor` · Named Routes v2.2.0

Añade la entrada a .cursor/mcp.json del proyecto (o configuración MCP global equivalente). Combina las entradas existentes de mcpServers. Autoriza el servidor solo para un proyecto de confianza.

El ejemplo supone que la versión con MCP está disponible en npm. Para un checkout local o un shim roto en Windows, usa el lanzador directo de Node.

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
