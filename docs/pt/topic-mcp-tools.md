# Ferramentas e recursos

[Documentação](index.md) / [Agentes de IA e MCP](ai-mcp.md)

[English](../en/topic-mcp-tools.md) · [Português](../pt/topic-mcp-tools.md) · [Español](../es/topic-mcp-tools.md) · [日本語](../ja/topic-mcp-tools.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-tools"></a>

Use get_agent_contract para ler as convenções versionadas; search_docs para descobrir IDs de tópicos; get_topic para ler um tópico completo; get_framework_guide para listar tópicos de um framework. Consultas aceitam locale en, pt, es ou ja.

list_routes filtra por nome ou padrão e pagina por offset e limit (1–100). get_route procura um nome exato. Ambos exigem --root. O recurso named-routes://agent-contract oferece o mesmo contrato para agentes.

O JSON abaixo mostra payloads individuais de tools/call, agrupados em um array apenas para ilustração. Chame cada ferramenta separadamente pelo cliente MCP; não é uma API de lote.

## Exemplo

```json
[
  {
    "name": "get_agent_contract",
    "arguments": {}
  },
  {
    "name": "search_docs",
    "arguments": {
      "query": "Astro base path",
      "locale": "en",
      "limit": 5
    }
  },
  {
    "name": "get_topic",
    "arguments": {
      "id": "astro",
      "locale": "pt"
    }
  },
  {
    "name": "get_framework_guide",
    "arguments": {
      "framework": "astro",
      "locale": "en"
    }
  },
  {
    "name": "list_routes",
    "arguments": {
      "filter": "admin.alunos",
      "offset": 0,
      "limit": 20
    }
  },
  {
    "name": "get_route",
    "arguments": {
      "name": "admin.alunos.edit"
    }
  }
]
```

## Tópicos relacionados

- [Conectar um projeto local](topic-mcp-project.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)
- [Segurança e escopo](topic-mcp-security.md)

---

← Anterior: [Windows e launcher Node direto](topic-mcp-windows.md) · [Todos os tópicos](ai-mcp.md) · Próximo: [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md) →
