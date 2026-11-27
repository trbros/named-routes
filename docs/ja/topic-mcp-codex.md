# Codex の設定

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-codex.md) · [Português](../pt/topic-mcp-codex.md) · [Español](../es/topic-mcp-codex.md) · [日本語](../ja/topic-mcp-codex.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-codex"></a>

Codex の ~/.codex/config.toml にサーバーテーブルを追加するか MCP 管理コマンドを使用します。例のディレクトリを生成モジュールを持つプロジェクトに変更します。

ローカルインストール済みパッケージでは command = "node" と bin/named-routes-mcp.js の絶対パスも利用できます。必要ならセッションを再起動し codex mcp list で確認します。

## 例

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

## 関連トピック

- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [Windows と Node ランチャー](topic-mcp-windows.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)

---

← 前へ: [Cursor の設定](topic-mcp-cursor.md) · [全トピック](ai-mcp.md) · 次へ: [VS Code / GitHub Copilot](topic-mcp-vscode.md) →
