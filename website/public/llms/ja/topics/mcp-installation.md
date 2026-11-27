# MCP のインストールと起動

Topic: `mcp-installation` · Named Routes v2.2.0

Model Context Protocol サーバーは @triooo/named-routes に含まれます。オプション依存関係を有効にして本体だけをインストールします。別パッケージ、Web サーバー、API キー、アカウントは不要です。

Node.js 22.12 以降を使用します。--help と --version でランチャーを確認します。mcp コマンドはクライアントを待機する stdio サーバーを起動します。HTTP エンドポイントではありません。コマンドは個別に実行してください。

npm と pnpm は代替手段です。プロジェクトのパッケージマネージャーを使用してください。公開後は npx でプロジェクトに追加せず実行できます。再現性が必要なら MCP を含むバージョンを固定します。

```sh
pnpm add @triooo/named-routes
# or: npm install @triooo/named-routes

pnpm exec named-routes mcp --help
pnpm exec named-routes-mcp --version

# Start the server (alternative commands):
pnpm exec named-routes mcp
npm exec --package=@triooo/named-routes -- named-routes mcp
npx -y @triooo/named-routes mcp
```

Related topic IDs: mcp-project, mcp-claude, mcp-troubleshooting
