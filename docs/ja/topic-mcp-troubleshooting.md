# Inspector とトラブルシューティング

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-troubleshooting.md) · [Português](../pt/topic-mcp-troubleshooting.md) · [Español](../es/topic-mcp-troubleshooting.md) · [日本語](../ja/topic-mcp-troubleshooting.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-troubleshooting"></a>

MCP Inspector でモデルなしにツールと結果を確認します。利用側でインストール済みランチャーを実行します。メンテナーはルートで pnpm run test:mcp と pnpm run test:package を実行できます。

オプション依存関係がなければ npm install --include=optional などで再インストールします。pnpm では no-optional を解除します。マニフェストがない、または曖昧なら生成か --manifest を指定し、ルートがなければ --root を確認します。Windows の MODULE_NOT_FOUND は直接 Node ランチャーを使用します。

通常のログを出さず待機する stdio サーバーは正常です。プロトコルは stdout、診断は stderr を使用します。ドキュメントが異なる場合はインストール済み版とカタログ版を比較し、意図的にルートを再生成して再起動します。

## 例

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

## 関連トピック

- [Windows と Node ランチャー](topic-mcp-windows.md)
- [MCP のインストールと起動](topic-mcp-installation.md)
- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [ツールとリソース](topic-mcp-tools.md)

---

← 前へ: [セキュリティと範囲](topic-mcp-security.md) · [全トピック](ai-mcp.md)
