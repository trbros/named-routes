# Segurança e escopo

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-security.md) · [Português](../pt/topic-mcp-security.md) · [Español](../es/topic-mcp-security.md) · [日本語](../ja/topic-mcp-security.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-security"></a>

O servidor é local e somente leitura via stdio. Analisa manifestos estáticos como dados sem executá-los. Não roda comandos shell, não executa configuração da aplicação, não grava arquivos, não chama endpoints HTTP nem expõe serviço remoto.

Selecione apenas workspaces confiáveis. O manifesto não é um sandbox para sistemas de arquivos hostis. Agentes e clientes podem ter permissões independentes; as anotações somente leitura do MCP não são uma garantia global de segurança. Nunca coloque credenciais nos defaults gerados ou prompts.

## Tópicos relacionados

- [Conectar um projeto local](topic-mcp-project.md)
- [Ferramentas e recursos](topic-mcp-tools.md)
- [Agentes de IA e MCP](topic-ai-agents.md)

---

← Anterior: [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Inspector e solução de problemas](topic-mcp-troubleshooting.md) →
