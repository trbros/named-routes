# Segurança e escopo

Topic: `mcp-security` · Named Routes v2.2.0

O servidor é local e somente leitura via stdio. Analisa manifestos estáticos como dados sem executá-los. Não roda comandos shell, não executa configuração da aplicação, não grava arquivos, não chama endpoints HTTP nem expõe serviço remoto.

Selecione apenas workspaces confiáveis. O manifesto não é um sandbox para sistemas de arquivos hostis. Agentes e clientes podem ter permissões independentes; as anotações somente leitura do MCP não são uma garantia global de segurança. Nunca coloque credenciais nos defaults gerados ou prompts.

Related topic IDs: mcp-project, mcp-tools, ai-agents
