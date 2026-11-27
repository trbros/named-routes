# ツールとリソース

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-tools.md) · [Português](../pt/topic-mcp-tools.md) · [Español](../es/topic-mcp-tools.md) · [日本語](../ja/topic-mcp-tools.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-tools"></a>

get_agent_contract でバージョン付き規約を読み、search_docs でトピック ID を検索し、get_topic で全文、get_framework_guide でフレームワーク別一覧を取得します。locale は en、pt、es、ja に対応します。

list_routes は名前またはパターンで絞り込み、offset と limit（1–100）でページ分割します。get_route は完全一致名を検索します。両方とも --root が必要です。named-routes://agent-contract リソースでも同じ規約を提供します。

以下の JSON は個別の tools/call ペイロードを説明用に配列化しています。MCP クライアントからそれぞれ呼び出します。バッチ API ではありません。

## 例

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

## 関連トピック

- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)
- [セキュリティと範囲](topic-mcp-security.md)

---

← 前へ: [Windows と Node ランチャー](topic-mcp-windows.md) · [全トピック](ai-mcp.md) · 次へ: [例：実際のルートからリンクを作る](topic-mcp-workflow.md) →
