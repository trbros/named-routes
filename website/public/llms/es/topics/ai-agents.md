# Agentes de IA y MCP

Topic: `ai-agents` · Named Routes v2.2.0

Usa llms.txt como índice y llms-full.txt como referencia versionada. Consulta el manifiesto generado y la configuración real del framework antes de escribir código. Hay ejemplos con y sin base path.

El servidor MCP stdio de solo lectura está incluido en @triooo/named-routes. Ejecuta pnpm exec named-routes mcp o pnpm exec named-routes-mcp; añade --root <proyecto> y opcionalmente --manifest <archivo-relativo> para consultar rutas. Sin root solo está disponible la documentación. Las dependencias opcionales se instalan por defecto; habilítalas si se omitieron. No ejecuta código de la aplicación ni modifica archivos.

Usa pnpm run docs, pnpm run test:mcp y pnpm run test:package antes de publicar el paquete principal. Consulta mcp/README.md para clientes de IA e Inspector. La versión del catálogo coincide con la biblioteca, pero un manifiesto puede estar desactualizado.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
