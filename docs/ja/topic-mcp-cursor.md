# Cursor の設定

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-cursor.md) · [Português](../pt/topic-mcp-cursor.md) · [Español](../es/topic-mcp-cursor.md) · [日本語](../ja/topic-mcp-cursor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-cursor"></a>

プロジェクトの .cursor/mcp.json（またはグローバル MCP 設定）に追加します。既存の mcpServers を保持します。信頼できるプロジェクトでのみローカルサーバーを承認します。

MCP 対応版が npm で利用できることが前提です。ローカル checkout や Windows の shim 不具合では Node ランチャーを直接利用します。

## 例

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

## 関連トピック

- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [Windows と Node ランチャー](topic-mcp-windows.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)

---

← 前へ: [Claude Desktop と Claude Code](topic-mcp-claude.md) · [全トピック](ai-mcp.md) · 次へ: [Codex の設定](topic-mcp-codex.md) →
