# Configuração do Codex

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-codex.md) · [Português](../pt/topic-mcp-codex.md) · [Español](../es/topic-mcp-codex.md) · [日本語](../ja/topic-mcp-codex.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-codex"></a>

Adicione uma tabela de servidor na configuração do Codex (~/.codex/config.toml) ou use os comandos de gerenciamento MCP. Substitua o diretório de exemplo pelo projeto dono do módulo gerado.

Para pacote instalado localmente, também é possível usar command = "node" e args apontando para seu bin/named-routes-mcp.js absoluto. Reinicie a sessão se necessário e confira codex mcp list.

## Exemplo

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

## Tópicos relacionados

- [Conectar um projeto local](topic-mcp-project.md)
- [Windows e launcher Node direto](topic-mcp-windows.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)

---

← Anterior: [Configuração do Cursor](topic-mcp-cursor.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [VS Code / GitHub Copilot](topic-mcp-vscode.md) →
