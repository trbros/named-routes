# ローカルプロジェクトの接続

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-project.md) · [Português](../pt/topic-mcp-project.md) · [Español](../es/topic-mcp-project.md) · [日本語](../ja/topic-mcp-project.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-project"></a>

--root がなければドキュメントのみ提供します。ルートを調べるには信頼できるプロジェクトディレクトリを明示します。フレームワークを実行してルートを検出することはありません。既存の連携または CLI で事前に生成してください。

カスタム出力や複数の生成モジュールがある場合は --manifest を指定します。--root からの相対パスです。一般的な出力は src/routes.generated.ts、app/routes.generated.ts、src/lib/routes.generated.ts です。モノレポでは実際のアプリを指定します。

信頼済みルート内の認識可能な静的 TS/JS マニフェスト（2 MiB 未満）が必要です。ルート一覧は鮮度、HTTP メソッド、認可、アセット、既定値、公開ページを検証しません。

## 例

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

## 関連トピック

- [MCP のインストールと起動](topic-mcp-installation.md)
- [ツールとリソース](topic-mcp-tools.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)
- [Inspector とトラブルシューティング](topic-mcp-troubleshooting.md)

---

← 前へ: [MCP のインストールと起動](topic-mcp-installation.md) · [全トピック](ai-mcp.md) · 次へ: [Claude Desktop と Claude Code](topic-mcp-claude.md) →
