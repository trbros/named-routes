# Seguridad y alcance

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-security.md) · [Português](../pt/topic-mcp-security.md) · [Español](../es/topic-mcp-security.md) · [日本語](../ja/topic-mcp-security.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-security"></a>

El servidor es local y de solo lectura mediante stdio. Analiza manifiestos estáticos como datos sin ejecutarlos. No ejecuta shell ni configuración, no escribe archivos, no llama a endpoints HTTP ni expone un servicio remoto.

Selecciona solo espacios de confianza. El manifiesto no es un sandbox para sistemas hostiles. Los agentes y clientes pueden tener permisos independientes; las anotaciones de solo lectura de MCP no son una garantía global. No pongas credenciales en defaults generados ni prompts.

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Herramientas y recursos](topic-mcp-tools.md)
- [Agentes de IA y MCP](topic-ai-agents.md)

---

← Anterior: [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Inspector y solución de problemas](topic-mcp-troubleshooting.md) →
