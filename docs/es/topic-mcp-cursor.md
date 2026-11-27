# Configuración de Cursor

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-cursor.md) · [Português](../pt/topic-mcp-cursor.md) · [Español](../es/topic-mcp-cursor.md) · [日本語](../ja/topic-mcp-cursor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-cursor"></a>

Añade la entrada a .cursor/mcp.json del proyecto (o configuración MCP global equivalente). Combina las entradas existentes de mcpServers. Autoriza el servidor solo para un proyecto de confianza.

El ejemplo supone que la versión con MCP está disponible en npm. Para un checkout local o un shim roto en Windows, usa el lanzador directo de Node.

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

← Anterior: [Claude Desktop y Claude Code](topic-mcp-claude.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Configuración de Codex](topic-mcp-codex.md) →
