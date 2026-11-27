# Configuración de Codex

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-codex.md) · [Português](../pt/topic-mcp-codex.md) · [Español](../es/topic-mcp-codex.md) · [日本語](../ja/topic-mcp-codex.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-codex"></a>

Añade una tabla de servidor a ~/.codex/config.toml o usa los comandos de gestión MCP. Sustituye el directorio de ejemplo por el proyecto propietario del módulo generado.

Para un paquete instalado localmente, también puedes usar command = "node" y args con la ruta absoluta a bin/named-routes-mcp.js. Reinicia la sesión si es necesario y verifica codex mcp list.

## Ejemplo

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Windows y lanzador Node directo](topic-mcp-windows.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)

---

← Anterior: [Configuración de Cursor](topic-mcp-cursor.md) · [Todos los temas](ai-mcp.md) · Siguiente: [VS Code / GitHub Copilot](topic-mcp-vscode.md) →
