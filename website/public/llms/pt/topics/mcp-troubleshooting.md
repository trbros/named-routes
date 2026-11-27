# Inspector e solução de problemas

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

Use MCP Inspector para inspecionar ferramentas e resultados sem um modelo. Execute o launcher do pacote instalado a partir do consumidor. O mantenedor pode rodar pnpm run test:mcp e pnpm run test:package na raiz.

Dependências opcionais ausentes: reinstale com opcionais habilitadas, por exemplo npm install --include=optional. No pnpm, remova a opção no-optional e reinstale. Manifesto ausente ou ambíguo exige geração ou --manifest. Se não houver rotas disponíveis, confira --root. Para MODULE_NOT_FOUND no Windows, use o launcher Node direto.

Um servidor stdio que aguarda sem imprimir logs comuns é normal. Mensagens do protocolo usam stdout; diagnósticos usam stderr. Se a documentação divergir da aplicação, compare a versão instalada com a do catálogo e regenere as rotas intencionalmente antes de reiniciar.

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
