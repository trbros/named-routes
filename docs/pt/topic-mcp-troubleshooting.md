# Inspector e solução de problemas

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-troubleshooting.md) · [Português](../pt/topic-mcp-troubleshooting.md) · [Español](../es/topic-mcp-troubleshooting.md) · [日本語](../ja/topic-mcp-troubleshooting.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-troubleshooting"></a>

Use MCP Inspector para inspecionar ferramentas e resultados sem um modelo. Execute o launcher do pacote instalado a partir do consumidor. O mantenedor pode rodar pnpm run test:mcp e pnpm run test:package na raiz.

Dependências opcionais ausentes: reinstale com opcionais habilitadas, por exemplo npm install --include=optional. No pnpm, remova a opção no-optional e reinstale. Manifesto ausente ou ambíguo exige geração ou --manifest. Se não houver rotas disponíveis, confira --root. Para MODULE_NOT_FOUND no Windows, use o launcher Node direto.

Um servidor stdio que aguarda sem imprimir logs comuns é normal. Mensagens do protocolo usam stdout; diagnósticos usam stderr. Se a documentação divergir da aplicação, compare a versão instalada com a do catálogo e regenere as rotas intencionalmente antes de reiniciar.

## Exemplo

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

## Tópicos relacionados

- [Windows e launcher Node direto](topic-mcp-windows.md)
- [Instalar e iniciar o MCP](topic-mcp-installation.md)
- [Conectar um projeto local](topic-mcp-project.md)
- [Ferramentas e recursos](topic-mcp-tools.md)

---

← Anterior: [Segurança e escopo](topic-mcp-security.md) · [Todos os tópicos](ai-mcp.md)
