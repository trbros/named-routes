# VS Code / GitHub Copilot

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-vscode.md) · [Português](../pt/topic-mcp-vscode.md) · [Español](../es/topic-mcp-vscode.md) · [日本語](../ja/topic-mcp-vscode.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-vscode"></a>

信頼済みワークスペースの .vscode/mcp.json を作成または統合します。VS Code は mcpServers ではなく servers と type stdio を使用します。エディターの MCP コントロールから起動し、チャットでツールを確認します。

## 例

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
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

← 前へ: [Codex の設定](topic-mcp-codex.md) · [全トピック](ai-mcp.md) · 次へ: [Windows と Node ランチャー](topic-mcp-windows.md) →
