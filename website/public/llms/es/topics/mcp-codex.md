# Configuración de Codex

Topic: `mcp-codex` · Named Routes v2.2.0

Añade una tabla de servidor a ~/.codex/config.toml o usa los comandos de gestión MCP. Sustituye el directorio de ejemplo por el proyecto propietario del módulo generado.

Para un paquete instalado localmente, también puedes usar command = "node" y args con la ruta absoluta a bin/named-routes-mcp.js. Reinicia la sesión si es necesario y verifica codex mcp list.

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
