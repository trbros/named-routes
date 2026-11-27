# Cursor の設定

Topic: `mcp-cursor` · Named Routes v2.2.0

プロジェクトの .cursor/mcp.json（またはグローバル MCP 設定）に追加します。既存の mcpServers を保持します。信頼できるプロジェクトでのみローカルサーバーを承認します。

MCP 対応版が npm で利用できることが前提です。ローカル checkout や Windows の shim 不具合では Node ランチャーを直接利用します。

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
