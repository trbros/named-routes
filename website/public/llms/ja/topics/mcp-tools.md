# ツールとリソース

Topic: `mcp-tools` · Named Routes v2.2.0

get_agent_contract でバージョン付き規約を読み、search_docs でトピック ID を検索し、get_topic で全文、get_framework_guide でフレームワーク別一覧を取得します。locale は en、pt、es、ja に対応します。

list_routes は名前またはパターンで絞り込み、offset と limit（1–100）でページ分割します。get_route は完全一致名を検索します。両方とも --root が必要です。named-routes://agent-contract リソースでも同じ規約を提供します。

以下の JSON は個別の tools/call ペイロードを説明用に配列化しています。MCP クライアントからそれぞれ呼び出します。バッチ API ではありません。

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
