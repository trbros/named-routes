# Inspector とトラブルシューティング

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

MCP Inspector でモデルなしにツールと結果を確認します。利用側でインストール済みランチャーを実行します。メンテナーはルートで pnpm run test:mcp と pnpm run test:package を実行できます。

オプション依存関係がなければ npm install --include=optional などで再インストールします。pnpm では no-optional を解除します。マニフェストがない、または曖昧なら生成か --manifest を指定し、ルートがなければ --root を確認します。Windows の MODULE_NOT_FOUND は直接 Node ランチャーを使用します。

通常のログを出さず待機する stdio サーバーは正常です。プロトコルは stdout、診断は stderr を使用します。ドキュメントが異なる場合はインストール済み版とカタログ版を比較し、意図的にルートを再生成して再起動します。

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
