# Claude Desktop と Claude Code

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-claude.md) · [Português](../pt/topic-mcp-claude.md) · [Español](../es/topic-mcp-claude.md) · [日本語](../ja/topic-mcp-claude.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-claude"></a>

Claude Desktop のローカル MCP 設定（開発者設定）の mcpServers に追加します。他のサーバーを上書きせず既存 JSON に統合し、クライアントを再起動してツールを確認します。

Claude Code では MCP 設定または claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app を使用し、claude mcp list で確認します。必要ならバージョンを固定します。Windows では絶対パスの Node ランチャーで npx shim の問題を回避できます。

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

← 前へ: [ローカルプロジェクトの接続](topic-mcp-project.md) · [全トピック](ai-mcp.md) · 次へ: [Cursor の設定](topic-mcp-cursor.md) →
