# VS Code / GitHub Copilot

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-vscode.md) · [Português](../pt/topic-mcp-vscode.md) · [Español](../es/topic-mcp-vscode.md) · [日本語](../ja/topic-mcp-vscode.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-vscode"></a>

Crea o combina .vscode/mcp.json en el espacio de confianza. VS Code usa servers y type stdio en lugar de mcpServers. Inicia el servidor desde los controles MCP del editor y comprueba sus herramientas.

## Ejemplo

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

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Windows y lanzador Node directo](topic-mcp-windows.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)

---

← Anterior: [Configuración de Codex](topic-mcp-codex.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Windows y lanzador Node directo](topic-mcp-windows.md) →
