# Herramientas y recursos

[Documentación](index.md) / [Agentes de IA y MCP](ai-mcp.md)

[English](../en/topic-mcp-tools.md) · [Português](../pt/topic-mcp-tools.md) · [Español](../es/topic-mcp-tools.md) · [日本語](../ja/topic-mcp-tools.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-tools"></a>

Usa get_agent_contract para las convenciones versionadas; search_docs para descubrir IDs; get_topic para leer un tema completo; get_framework_guide para listar temas de un framework. Las consultas aceptan locale en, pt, es o ja.

list_routes filtra por nombre o patrón y pagina con offset y limit (1–100). get_route busca un nombre exacto. Ambos requieren --root. El recurso named-routes://agent-contract proporciona el mismo contrato.

El JSON muestra payloads individuales de tools/call, agrupados en un array solo como ilustración. Invoca cada herramienta por separado desde el cliente MCP; no es una API por lotes.

## Ejemplo

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

## Temas relacionados

- [Conectar un proyecto local](topic-mcp-project.md)
- [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md)
- [Seguridad y alcance](topic-mcp-security.md)

---

← Anterior: [Windows y lanzador Node directo](topic-mcp-windows.md) · [Todos los temas](ai-mcp.md) · Siguiente: [Ejemplo: crear un enlace con rutas reales](topic-mcp-workflow.md) →
