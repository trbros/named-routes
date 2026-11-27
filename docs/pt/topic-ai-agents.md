# Agentes de IA e MCP

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-ai-agents.md) · [Português](../pt/topic-ai-agents.md) · [Español](../es/topic-ai-agents.md) · [日本語](../ja/topic-ai-agents.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="ai-agents"></a>

Use llms.txt como índice e llms-full.txt como referência versionada. Consulte o manifesto gerado e a configuração real do framework antes de escrever código. Há exemplos com e sem base path.

O servidor MCP stdio somente leitura está incluído em @triooo/named-routes. Execute pnpm exec named-routes mcp ou pnpm exec named-routes-mcp; adicione --root <projeto> e opcionalmente --manifest <arquivo-relativo> para consultar rotas. Sem root, apenas a documentação fica disponível. As dependências opcionais são instaladas por padrão; habilite-as se omitidas. Nenhum código da aplicação é executado ou arquivo alterado.

Use pnpm run docs, pnpm run test:mcp e pnpm run test:package antes de publicar o pacote principal. Veja mcp/README.md para clientes de IA e Inspector. A versão do catálogo acompanha a biblioteca, mas o manifesto de um projeto pode estar desatualizado.

## Tópicos relacionados

- [O que ele faz](topic-overview.md)
- [CLI e CI](topic-cli.md)
- [Configuração do gerador](topic-configuration.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Instalar e iniciar o MCP](topic-mcp-installation.md)
- [Conectar um projeto local](topic-mcp-project.md)
- [Ferramentas e recursos](topic-mcp-tools.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)
- [Segurança e escopo](topic-mcp-security.md)

---

[Todos os tópicos](ai-mcp.md) · Próximo: [Instalar e iniciar o MCP](topic-mcp-installation.md) →
