# セキュリティと範囲

[ドキュメント](index.md) / [AI エージェントと MCP](ai-mcp.md)

[English](../en/topic-mcp-security.md) · [Português](../pt/topic-mcp-security.md) · [Español](../es/topic-mcp-security.md) · [日本語](../ja/topic-mcp-security.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="mcp-security"></a>

サーバーはローカル stdio の読み取り専用です。静的マニフェストをデータとして解析し実行しません。シェル、アプリ設定、ファイル書き込み、HTTP 呼び出し、リモートサービス公開は行いません。

信頼できるワークスペースのみ選択します。敵対的ファイルシステムのサンドボックスではありません。エージェントやクライアントは独立した権限を持つことがあり、読み取り専用注釈は全体の安全を保証しません。生成既定値やプロンプトに認証情報を入れないでください。

## 関連トピック

- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [ツールとリソース](topic-mcp-tools.md)
- [AI エージェントと MCP](topic-ai-agents.md)

---

← 前へ: [例：実際のルートからリンクを作る](topic-mcp-workflow.md) · [全トピック](ai-mcp.md) · 次へ: [Inspector とトラブルシューティング](topic-mcp-troubleshooting.md) →
