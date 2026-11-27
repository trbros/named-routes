# Agentes de IA y MCP

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-ai-agents.md) · [Português](../pt/topic-ai-agents.md) · [Español](../es/topic-ai-agents.md) · [日本語](../ja/topic-ai-agents.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="ai-agents"></a>

Usa llms.txt como índice y llms-full.txt como referencia versionada. Consulta el manifiesto generado y la configuración real del framework antes de escribir código. Hay ejemplos con y sin base path.

El servidor MCP stdio de solo lectura está incluido en @triooo/named-routes. Ejecuta pnpm exec named-routes mcp o pnpm exec named-routes-mcp; añade --root <proyecto> y opcionalmente --manifest <archivo-relativo> para consultar rutas. Sin root solo está disponible la documentación. Las dependencias opcionales se instalan por defecto; habilítalas si se omitieron. No ejecuta código de la aplicación ni modifica archivos.

Usa pnpm run docs, pnpm run test:mcp y pnpm run test:package antes de publicar el paquete principal. Consulta mcp/README.md para clientes de IA e Inspector. La versión del catálogo coincide con la biblioteca, pero un manifiesto puede estar desactualizado.

## Temas relacionados

- [Qué hace](topic-overview.md)
- [CLI e integración continua](topic-cli.md)
- [Configuración del generador](topic-configuration.md)
- [route.url() — URL públicas](topic-public-url.md)
- [Instalar e iniciar MCP](topic-mcp-installation.md)
- [Conectar un proyecto local](topic-mcp-project.md)
- [Herramientas y recursos](topic-mcp-tools.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)
- [Seguridad y alcance](topic-mcp-security.md)

---

[Todos los temas](ai-mcp.md) · Siguiente: [Instalar e iniciar MCP](topic-mcp-installation.md) →
