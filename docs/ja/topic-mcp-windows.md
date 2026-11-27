# Windows と Node ランチャー

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-windows.md) · [Português](../pt/topic-mcp-windows.md) · [Español](../es/topic-mcp-windows.md) · [日本語](../ja/topic-mcp-windows.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-windows"></a>

npx や .cmd shim が CLI 起動前に MODULE_NOT_FOUND で失敗する場合、インストールされたパッケージを解決し Node で bin を直接実行します。パッケージマネージャーの shim を回避できます。

JSON ではスラッシュと絶対パスを使用します。pnpm の node_modules リンクは通常パッケージを解決します。必要なら利用側で node -p "require.resolve('@triooo/named-routes/package.json')" を実行し、そのディレクトリから bin/named-routes-mcp.js を指定します。

## 例

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

## 関連トピック

- [MCP のインストールと起動](topic-mcp-installation.md)
- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [Inspector とトラブルシューティング](topic-mcp-troubleshooting.md)

---

← 前へ: [VS Code / GitHub Copilot](topic-mcp-vscode.md) · [全トピック](ai-mcp.md) · 次へ: [ツールとリソース](topic-mcp-tools.md) →
