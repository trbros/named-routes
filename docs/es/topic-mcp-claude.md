# Claude Desktop y Claude Code

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-claude.md) · [Português](../pt/topic-mcp-claude.md) · [Español](../es/topic-mcp-claude.md) · [日本語](../ja/topic-mcp-claude.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-claude"></a>

En Claude Desktop, añade el servidor bajo mcpServers en la configuración MCP local (ajustes de desarrollador). Combina la entrada con el JSON existente sin sustituir otros servidores. Reinicia el cliente y revisa las herramientas.

En Claude Code, usa la configuración MCP o claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app. Verifica con claude mcp list. Fija la versión si es necesario. En Windows, el lanzador Node absoluto de la guía evita problemas de shims.

## Ejemplo

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

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Windows y lanzador Node directo](topic-mcp-windows.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)

---

← Anterior: [Conectar un proyecto local](topic-mcp-project.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Configuración de Cursor](topic-mcp-cursor.md) →
