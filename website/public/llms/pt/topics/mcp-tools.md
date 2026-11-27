# Ferramentas e recursos

Topic: `mcp-tools` · Named Routes v2.2.0

Use get_agent_contract para ler as convenções versionadas; search_docs para descobrir IDs de tópicos; get_topic para ler um tópico completo; get_framework_guide para listar tópicos de um framework. Consultas aceitam locale en, pt, es ou ja.

list_routes filtra por nome ou padrão e pagina por offset e limit (1–100). get_route procura um nome exato. Ambos exigem --root. O recurso named-routes://agent-contract oferece o mesmo contrato para agentes.

O JSON abaixo mostra payloads individuais de tools/call, agrupados em um array apenas para ilustração. Chame cada ferramenta separadamente pelo cliente MCP; não é uma API de lote.

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

Related topic IDs: mcp-project, mcp-workflow, mcp-security
