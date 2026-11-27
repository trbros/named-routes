# Windows y lanzador Node directo

Topic: `mcp-windows` · Named Routes v2.2.0

Si npx o un shim .cmd falla con MODULE_NOT_FOUND antes de iniciar la CLI, resuelve el paquete instalado y ejecuta su bin directamente con node. Evita depender del shim del gestor.

La configuración usa barras normales en JSON y una ruta absoluta. En pnpm los enlaces de node_modules suelen resolver el paquete. Si hace falta, localiza package.json con node -p "require.resolve('@triooo/named-routes/package.json')" desde el consumidor y usa bin/named-routes-mcp.js relativo a su directorio.

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
