# Windows e launcher Node direto

Topic: `mcp-windows` · Named Routes v2.2.0

Se npx ou um shim .cmd falhar com MODULE_NOT_FOUND antes da CLI iniciar, resolva o pacote instalado e execute seu bin diretamente com node. Isso evita depender do shim executável do gerenciador.

A configuração abaixo usa barras normais em JSON e caminho absoluto. No pnpm, os links de node_modules normalmente resolvem o pacote. Se necessário, localize package.json com node -p "require.resolve('@triooo/named-routes/package.json')" no consumidor e use bin/named-routes-mcp.js relativo ao diretório dele.

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
