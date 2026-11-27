# Tools and resources

Topic: `mcp-tools` · Named Routes v2.2.0

Use get_agent_contract to read the versioned conventions; search_docs to discover topic IDs; get_topic to read a complete topic; get_framework_guide to list topics for one framework. Documentation queries accept locale en, pt, es or ja.

list_routes filters by name or pattern and paginates using offset and limit (1–100). get_route looks up an exact name. Both require --root. The resource named-routes://agent-contract provides the same agent contract.

The JSON below shows individual tools/call payloads, grouped as an array only for illustration. Call each tool independently through the MCP client; this is not a new batch API.

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
