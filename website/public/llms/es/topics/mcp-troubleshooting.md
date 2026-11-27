# Inspector y solución de problemas

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Usa MCP Inspector para inspeccionar herramientas y resultados sin un modelo. Ejecuta el lanzador instalado desde el consumidor. El mantenedor puede ejecutar pnpm run test:mcp y pnpm run test:package en la raíz.

Dependencias opcionales ausentes: reinstala habilitándolas, por ejemplo npm install --include=optional. En pnpm, elimina no-optional y reinstala. Un manifiesto ausente o ambiguo requiere generación o --manifest. Comprueba --root si no hay rutas. Para MODULE_NOT_FOUND en Windows usa el lanzador Node directo.

Un servidor stdio que espera sin imprimir logs normales es correcto. El protocolo usa stdout y los diagnósticos stderr. Si la documentación difiere de la aplicación, compara la versión instalada con la del catálogo y regenera las rutas antes de reiniciar.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
