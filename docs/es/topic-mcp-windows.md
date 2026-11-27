# Windows y lanzador Node directo

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-windows.md) · [Português](../pt/topic-mcp-windows.md) · [Español](../es/topic-mcp-windows.md) · [日本語](../ja/topic-mcp-windows.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-windows"></a>

Si npx o un shim .cmd falla con MODULE_NOT_FOUND antes de iniciar la CLI, resuelve el paquete instalado y ejecuta su bin directamente con node. Evita depender del shim del gestor.

La configuración usa barras normales en JSON y una ruta absoluta. En pnpm los enlaces de node_modules suelen resolver el paquete. Si hace falta, localiza package.json con node -p "require.resolve('@triooo/named-routes/package.json')" desde el consumidor y usa bin/named-routes-mcp.js relativo a su directorio.

## Ejemplo

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

## Temas relacionados

- [Instalar e iniciar MCP](topic-mcp-installation.md)
- [Conectar un proyecto local](topic-mcp-project.md)
- [Inspector y solución de problemas](topic-mcp-troubleshooting.md)

---

← Anterior: [VS Code / GitHub Copilot](topic-mcp-vscode.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Herramientas y recursos](topic-mcp-tools.md) →
