# AI エージェントと MCP

Topic: `ai-agents` · Named Routes v2.2.0

llms.txt を索引、llms-full.txt をバージョン付きリファレンスとして使用します。コードを書く前に実際の生成済みマニフェストとフレームワーク設定を確認してください。base path の有無の例を含みます。

読み取り専用の stdio MCP サーバーは @triooo/named-routes に含まれています。pnpm exec named-routes mcp または pnpm exec named-routes-mcp を実行し、ルート一覧には --root <project> と必要に応じて --manifest <relative-file> を指定します。root なしではドキュメントのみ利用できます。オプション依存関係は既定でインストールされます。省略した場合は有効にしてください。アプリのコードを実行せず、ファイルも変更しません。

ルートパッケージの公開前に pnpm run docs、pnpm run test:mcp、pnpm run test:package を実行します。AI クライアントと Inspector は mcp/README.md を参照してください。カタログのバージョンはライブラリと一致しますが、プロジェクトのマニフェストは古い場合があります。

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
