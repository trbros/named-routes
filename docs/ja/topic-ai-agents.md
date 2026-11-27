# AI エージェントと MCP

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-ai-agents.md) · [Português](../pt/topic-ai-agents.md) · [Español](../es/topic-ai-agents.md) · [日本語](../ja/topic-ai-agents.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="ai-agents"></a>

llms.txt を索引、llms-full.txt をバージョン付きリファレンスとして使用します。コードを書く前に実際の生成済みマニフェストとフレームワーク設定を確認してください。base path の有無の例を含みます。

読み取り専用の stdio MCP サーバーは @triooo/named-routes に含まれています。pnpm exec named-routes mcp または pnpm exec named-routes-mcp を実行し、ルート一覧には --root <project> と必要に応じて --manifest <relative-file> を指定します。root なしではドキュメントのみ利用できます。オプション依存関係は既定でインストールされます。省略した場合は有効にしてください。アプリのコードを実行せず、ファイルも変更しません。

ルートパッケージの公開前に pnpm run docs、pnpm run test:mcp、pnpm run test:package を実行します。AI クライアントと Inspector は mcp/README.md を参照してください。カタログのバージョンはライブラリと一致しますが、プロジェクトのマニフェストは古い場合があります。

## 関連トピック

- [このパッケージでできること](topic-overview.md)
- [CLI と CI](topic-cli.md)
- [ジェネレーターの設定](topic-configuration.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [MCP のインストールと起動](topic-mcp-installation.md)
- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [ツールとリソース](topic-mcp-tools.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)
- [セキュリティと範囲](topic-mcp-security.md)

---

[全トピック](ai-mcp.md) · 次へ: [MCP のインストールと起動](topic-mcp-installation.md) →
