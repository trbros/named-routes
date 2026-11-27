# AI エージェントと MCP

# AI エージェントと MCP

Topic: `ai-agents` · Named Routes v2.2.0

llms.txt を索引、llms-full.txt をバージョン付きリファレンスとして使用します。コードを書く前に実際の生成済みマニフェストとフレームワーク設定を確認してください。base path の有無の例を含みます。

読み取り専用の stdio MCP サーバーは @triooo/named-routes に含まれています。pnpm exec named-routes mcp または pnpm exec named-routes-mcp を実行し、ルート一覧には --root <project> と必要に応じて --manifest <relative-file> を指定します。root なしではドキュメントのみ利用できます。オプション依存関係は既定でインストールされます。省略した場合は有効にしてください。アプリのコードを実行せず、ファイルも変更しません。

ルートパッケージの公開前に pnpm run docs、pnpm run test:mcp、pnpm run test:package を実行します。AI クライアントと Inspector は mcp/README.md を参照してください。カタログのバージョンはライブラリと一致しますが、プロジェクトのマニフェストは古い場合があります。

Related topic IDs: overview, cli, configuration, public-url, mcp-installation, mcp-project, mcp-tools, mcp-workflow, mcp-security
---

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
---

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
---

# Claude Desktop と Claude Code

Topic: `mcp-claude` · Named Routes v2.2.0

Claude Desktop のローカル MCP 設定（開発者設定）の mcpServers に追加します。他のサーバーを上書きせず既存 JSON に統合し、クライアントを再起動してツールを確認します。

Claude Code では MCP 設定または claude mcp add --transport stdio named-routes -- npx -y @triooo/named-routes mcp --root C:/dev/my-app を使用し、claude mcp list で確認します。必要ならバージョンを固定します。Windows では絶対パスの Node ランチャーで npx shim の問題を回避できます。

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Cursor の設定

Topic: `mcp-cursor` · Named Routes v2.2.0

プロジェクトの .cursor/mcp.json（またはグローバル MCP 設定）に追加します。既存の mcpServers を保持します。信頼できるプロジェクトでのみローカルサーバーを承認します。

MCP 対応版が npm で利用できることが前提です。ローカル checkout や Windows の shim 不具合では Node ランチャーを直接利用します。

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

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
---

# VS Code / GitHub Copilot

Topic: `mcp-vscode` · Named Routes v2.2.0

信頼済みワークスペースの .vscode/mcp.json を作成または統合します。VS Code は mcpServers ではなく servers と type stdio を使用します。エディターの MCP コントロールから起動し、チャットでツールを確認します。

```json
{
  "servers": {
    "named-routes": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@triooo/named-routes",
        "mcp",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-project, mcp-windows, mcp-workflow
---

# Windows と Node ランチャー

Topic: `mcp-windows` · Named Routes v2.2.0

npx や .cmd shim が CLI 起動前に MODULE_NOT_FOUND で失敗する場合、インストールされたパッケージを解決し Node で bin を直接実行します。パッケージマネージャーの shim を回避できます。

JSON ではスラッシュと絶対パスを使用します。pnpm の node_modules リンクは通常パッケージを解決します。必要なら利用側で node -p "require.resolve('@triooo/named-routes/package.json')" を実行し、そのディレクトリから bin/named-routes-mcp.js を指定します。

```json
{
  "mcpServers": {
    "named-routes": {
      "command": "node",
      "args": [
        "C:/dev/my-app/node_modules/@triooo/named-routes/bin/named-routes-mcp.js",
        "--root",
        "C:/dev/my-app"
      ]
    }
  }
}
```

Related topic IDs: mcp-installation, mcp-project, mcp-troubleshooting
---

# ツールとリソース

Topic: `mcp-tools` · Named Routes v2.2.0

get_agent_contract でバージョン付き規約を読み、search_docs でトピック ID を検索し、get_topic で全文、get_framework_guide でフレームワーク別一覧を取得します。locale は en、pt、es、ja に対応します。

list_routes は名前またはパターンで絞り込み、offset と limit（1–100）でページ分割します。get_route は完全一致名を検索します。両方とも --root が必要です。named-routes://agent-contract リソースでも同じ規約を提供します。

以下の JSON は個別の tools/call ペイロードを説明用に配列化しています。MCP クライアントからそれぞれ呼び出します。バッチ API ではありません。

```json
[
  {
    "name": "get_agent_contract",
    "arguments": {}
  },
  {
    "name": "search_docs",
    "arguments": {
      "query": "Astro base path",
      "locale": "en",
      "limit": 5
    }
  },
  {
    "name": "get_topic",
    "arguments": {
      "id": "astro",
      "locale": "pt"
    }
  },
  {
    "name": "get_framework_guide",
    "arguments": {
      "framework": "astro",
      "locale": "en"
    }
  },
  {
    "name": "list_routes",
    "arguments": {
      "filter": "admin.alunos",
      "offset": 0,
      "limit": 20
    }
  },
  {
    "name": "get_route",
    "arguments": {
      "name": "admin.alunos.edit"
    }
  }
]
```

Related topic IDs: mcp-project, mcp-workflow, mcp-security
---

# 例：実際のルートからリンクを作る

Topic: `mcp-workflow` · Named Routes v2.2.0

プロンプト例：「Named Routes の規約を読み、admin.alunos のルートを列挙して、学生編集用の Next.js リンクを作ってください。名前を推測せず生成マニフェストを変更しないでください。」get_agent_contract、list_routes、必要に応じて get_route を使用します。

取得したルートが admin.alunos.edit、パターンが /admin/alunos/[aluno]/edit と仮定します。組み込みルートではなく説明用の例です。名前やパラメータが異なれば実際のマニフェストを使います。

Next.js Link では route が内部 URL を返し、Next が base を付与します。公開 URL は route.url を使用します。base なしは /admin/alunos/42/edit、/app ありは /app/admin/alunos/42/edit です。利用側で型チェックしてください。

## base path なし

ドメイン直下では内部 Link と公開 URL は同じパスです。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

## base path あり

Next の basePath: "/app" を想定し、Link は内部 URL のままにします。route.url は共有リンクやアンカー用にプレフィックスを含めます。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
---

# セキュリティと範囲

Topic: `mcp-security` · Named Routes v2.2.0

サーバーはローカル stdio の読み取り専用です。静的マニフェストをデータとして解析し実行しません。シェル、アプリ設定、ファイル書き込み、HTTP 呼び出し、リモートサービス公開は行いません。

信頼できるワークスペースのみ選択します。敵対的ファイルシステムのサンドボックスではありません。エージェントやクライアントは独立した権限を持つことがあり、読み取り専用注釈は全体の安全を保証しません。生成既定値やプロンプトに認証情報を入れないでください。

Related topic IDs: mcp-project, mcp-tools, ai-agents
---

# Inspector とトラブルシューティング

Topic: `mcp-troubleshooting` · Named Routes v2.2.0

MCP Inspector でモデルなしにツールと結果を確認します。利用側でインストール済みランチャーを実行します。メンテナーはルートで pnpm run test:mcp と pnpm run test:package を実行できます。

オプション依存関係がなければ npm install --include=optional などで再インストールします。pnpm では no-optional を解除します。マニフェストがない、または曖昧なら生成か --manifest を指定し、ルートがなければ --root を確認します。Windows の MODULE_NOT_FOUND は直接 Node ランチャーを使用します。

通常のログを出さず待機する stdio サーバーは正常です。プロトコルは stdout、診断は stderr を使用します。ドキュメントが異なる場合はインストール済み版とカタログ版を比較し、意図的にルートを再生成して再起動します。

```sh
npx @modelcontextprotocol/inspector node node_modules/@triooo/named-routes/bin/named-routes-mcp.js --root .
```

Related topic IDs: mcp-windows, mcp-installation, mcp-project, mcp-tools
