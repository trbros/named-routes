# Configuração do Codex

Topic: `mcp-codex` · Named Routes v2.2.0

Adicione uma tabela de servidor na configuração do Codex (~/.codex/config.toml) ou use os comandos de gerenciamento MCP. Substitua o diretório de exemplo pelo projeto dono do módulo gerado.

Para pacote instalado localmente, também é possível usar command = "node" e args apontando para seu bin/named-routes-mcp.js absoluto. Reinicie a sessão se necessário e confira codex mcp list.

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
