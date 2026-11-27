# Windows と Node ランチャー

Topic: `mcp-windows` · Named Routes v2.2.0

npx や .cmd shim が CLI 起動前に MODULE_NOT_FOUND で失敗する場合、インストールされたパッケージを解決し Node で bin を直接実行します。パッケージマネージャーの shim を回避できます。

JSON ではスラッシュと絶対パスを使用します。pnpm の node_modules リンクは通常パッケージを解決します。必要なら利用側で node -p "require.resolve('@triooo/named-routes/package.json')" を実行し、そのディレクトリから bin/named-routes-mcp.js を指定します。

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
