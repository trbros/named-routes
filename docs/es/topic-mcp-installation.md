# Instalar e iniciar MCP

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-installation.md) · [Português](../pt/topic-mcp-installation.md) · [Español](../es/topic-mcp-installation.md) · [日本語](../ja/topic-mcp-installation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-installation"></a>

El servidor Model Context Protocol forma parte de @triooo/named-routes. Instala solo el paquete principal con las dependencias opcionales habilitadas. No necesitas otro paquete, servidor web, clave API ni cuenta.

Usa Node.js 22.12 o posterior. Ejecuta --help y --version para verificar el lanzador. El comando mcp inicia un servidor stdio que espera un cliente; no es un endpoint HTTP. Ejecuta los comandos por separado.

Los comandos npm y pnpm son alternativas. Usa el gestor de tu proyecto. Tras la publicación, npx puede ejecutar el paquete sin añadirlo al proyecto; fija una versión con MCP para reproducibilidad.

## Ejemplo

```sh
pnpm add @triooo/named-routes
# or: npm install @triooo/named-routes

pnpm exec named-routes mcp --help
pnpm exec named-routes-mcp --version

# Start the server (alternative commands):
pnpm exec named-routes mcp
npm exec --package=@triooo/named-routes -- named-routes mcp
npx -y @triooo/named-routes mcp
```

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Claude Desktop y Claude Code](topic-mcp-claude.md)
- [Inspector y solución de problemas](topic-mcp-troubleshooting.md)

---

← Anterior: [Agentes de IA y MCP](topic-ai-agents.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Conectar un proyecto local](topic-mcp-project.md) →
