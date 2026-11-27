# Codex の設定

Topic: `mcp-codex` · Named Routes v2.2.0

Codex の ~/.codex/config.toml にサーバーテーブルを追加するか MCP 管理コマンドを使用します。例のディレクトリを生成モジュールを持つプロジェクトに変更します。

ローカルインストール済みパッケージでは command = "node" と bin/named-routes-mcp.js の絶対パスも利用できます。必要ならセッションを再起動し codex mcp list で確認します。

```toml
[mcp_servers.named_routes]
command = "npx"
args = ["-y", "@triooo/named-routes", "mcp", "--root", "C:/dev/my-app"]
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
