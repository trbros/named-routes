# Instalar e iniciar o MCP

Topic: `mcp-installation` · Named Routes v2.2.0

O servidor Model Context Protocol faz parte de @triooo/named-routes. Instale apenas o pacote principal, com dependências opcionais habilitadas. Não é necessário pacote MCP separado, servidor web, chave de API ou conta.

Use Node.js 22.12 ou superior. Execute --help e --version para verificar o launcher. O comando mcp sem outras opções inicia um servidor stdio que aguarda um cliente; não é um endpoint HTTP. Execute os comandos individualmente.

Os comandos de instalação npm e pnpm são alternativas. Use o gerenciador do seu projeto. Após a publicação, npx pode executar o pacote sem adicioná-lo ao projeto; fixe uma versão que inclua MCP quando precisar de reprodutibilidade.

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
