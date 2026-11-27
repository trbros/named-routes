# Agentes de IA e MCP

Topic: `ai-agents` · Named Routes v2.2.0

Use llms.txt como índice e llms-full.txt como referência versionada. Consulte o manifesto gerado e a configuração real do framework antes de escrever código. Há exemplos com e sem base path.

O servidor MCP stdio somente leitura está incluído em @triooo/named-routes. Execute pnpm exec named-routes mcp ou pnpm exec named-routes-mcp; adicione --root <projeto> e opcionalmente --manifest <arquivo-relativo> para consultar rotas. Sem root, apenas a documentação fica disponível. As dependências opcionais são instaladas por padrão; habilite-as se omitidas. Nenhum código da aplicação é executado ou arquivo alterado.

Use pnpm run docs, pnpm run test:mcp e pnpm run test:package antes de publicar o pacote principal. Veja mcp/README.md para clientes de IA e Inspector. A versão do catálogo acompanha a biblioteca, mas o manifesto de um projeto pode estar desatualizado.

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
