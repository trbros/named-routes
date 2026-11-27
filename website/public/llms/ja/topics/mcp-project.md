# ローカルプロジェクトの接続

Topic: `mcp-project` · Named Routes v2.2.0

--root がなければドキュメントのみ提供します。ルートを調べるには信頼できるプロジェクトディレクトリを明示します。フレームワークを実行してルートを検出することはありません。既存の連携または CLI で事前に生成してください。

カスタム出力や複数の生成モジュールがある場合は --manifest を指定します。--root からの相対パスです。一般的な出力は src/routes.generated.ts、app/routes.generated.ts、src/lib/routes.generated.ts です。モノレポでは実際のアプリを指定します。

信頼済みルート内の認識可能な静的 TS/JS マニフェスト（2 MiB 未満）が必要です。ルート一覧は鮮度、HTTP メソッド、認可、アセット、既定値、公開ページを検証しません。

```sh
pnpm exec named-routes generate
# In the MCP client, choose one invocation:
pnpm exec named-routes mcp --root "C:/dev/my-app"
pnpm exec named-routes-mcp --root "C:/dev/my-app" --manifest "src/routes.generated.ts"
```

Related topic IDs: mcp-installation, mcp-tools, mcp-workflow, mcp-troubleshooting
