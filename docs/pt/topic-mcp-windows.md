# Windows e launcher Node direto

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-windows.md) · [Português](../pt/topic-mcp-windows.md) · [Español](../es/topic-mcp-windows.md) · [日本語](../ja/topic-mcp-windows.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-windows"></a>

Se npx ou um shim .cmd falhar com MODULE_NOT_FOUND antes da CLI iniciar, resolva o pacote instalado e execute seu bin diretamente com node. Isso evita depender do shim executável do gerenciador.

A configuração abaixo usa barras normais em JSON e caminho absoluto. No pnpm, os links de node_modules normalmente resolvem o pacote. Se necessário, localize package.json com node -p "require.resolve('@triooo/named-routes/package.json')" no consumidor e use bin/named-routes-mcp.js relativo ao diretório dele.

## Exemplo

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

## Tópicos relacionados

- [Instalar e iniciar o MCP](topic-mcp-installation.md)
- [Conectar um projeto local](topic-mcp-project.md)
- [Inspector e solução de problemas](topic-mcp-troubleshooting.md)

---

← Anterior: [VS Code / GitHub Copilot](topic-mcp-vscode.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Ferramentas e recursos](topic-mcp-tools.md) →
