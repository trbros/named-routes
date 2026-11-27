# Instalar e iniciar MCP

Topic: `mcp-installation` · Named Routes v2.2.0

El servidor Model Context Protocol forma parte de @triooo/named-routes. Instala solo el paquete principal con las dependencias opcionales habilitadas. No necesitas otro paquete, servidor web, clave API ni cuenta.

Usa Node.js 22.12 o posterior. Ejecuta --help y --version para verificar el lanzador. El comando mcp inicia un servidor stdio que espera un cliente; no es un endpoint HTTP. Ejecuta los comandos por separado.

Los comandos npm y pnpm son alternativas. Usa el gestor de tu proyecto. Tras la publicación, npx puede ejecutar el paquete sin añadirlo al proyecto; fija una versión con MCP para reproducibilidad.

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

Related topic IDs: mcp-project, mcp-claude, mcp-troubleshooting
