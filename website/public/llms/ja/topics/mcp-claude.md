# Claude Desktop と Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

Claude Desktop のローカル MCP 設定（開発者設定）の mcpServers に追加します。他のサーバーを上書きせず既存 JSON に統合し、クライアントを再起動してツールを確認します。

Claude Code では MCP 設定または claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app を使用し、claude mcp list で確認します。必要ならバージョンを固定します。Windows では絶対パスの Node ランチャーで npx shim の問題を回避できます。

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
