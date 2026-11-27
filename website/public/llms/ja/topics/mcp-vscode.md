# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

信頼済みワークスペースの .vscode/mcp.json を作成または統合します。VS Code は mcpServers ではなく servers と type stdio を使用します。エディターの MCP コントロールから起動し、チャットでツールを確認します。

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

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
