# Inspector y solución de problemas

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-troubleshooting.md) · [Português](../pt/topic-mcp-troubleshooting.md) · [Español](../es/topic-mcp-troubleshooting.md) · [日本語](../ja/topic-mcp-troubleshooting.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-troubleshooting"></a>

Usa MCP Inspector para inspeccionar herramientas y resultados sin un modelo. Ejecuta el lanzador instalado desde el consumidor. El mantenedor puede ejecutar pnpm run test:mcp y pnpm run test:package en la raíz.

Dependencias opcionales ausentes: reinstala habilitándolas, por ejemplo npm install --include=optional. En pnpm, elimina no-optional y reinstala. Un manifiesto ausente o ambiguo requiere generación o --manifest. Comprueba --root si no hay rutas. Para MODULE_NOT_FOUND en Windows usa el lanzador Node directo.

Un servidor stdio que espera sin imprimir logs normales es correcto. El protocolo usa stdout y los diagnósticos stderr. Si la documentación difiere de la aplicación, compara la versión instalada con la del catálogo y regenera las rutas antes de reiniciar.

## Ejemplo

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

## Temas relacionados

- [Windows y lanzador Node directo](topic-mcp-windows.md)
- [Instalar e iniciar MCP](topic-mcp-installation.md)
- [Conectar un proyecto local](topic-mcp-project.md)
- [Herramientas y recursos](topic-mcp-tools.md)

---

← Anterior: [Seguridad y alcance](topic-mcp-security.md) · [Todos los temas](ai-mcp.md)
