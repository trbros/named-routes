# ガイド · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [検出のエッジケース](#discovery)
- [開発中の自動更新](#development)
- [CLI と CI](#cli)
- [エラーとトラブルシューティング](#errors)
- [リライトと境界](#boundaries)

<a id="discovery"></a>

## 検出のエッジケース

Next.js: スキャナーは app と pages を合わせて扱います。ルート直下の app ディレクトリは src/app より優先され、pages と src/pages にも同じルールが独立して適用されます。ほかのフレームワークは、routesDir を指定しない限り標準のフォルダー（Nuxt は app/pages または pages、Vue は src/pages、SvelteKit は src/routes、Astro は src/pages、React Router は app/routes、TanStack は src/routes）を使います。ディレクトリのシンボリックリンク、隠しフォルダー、node_modules はたどらず、.d.ts ファイルは無視します。

App Router: デフォルトでは page ファイルだけが対象です。グループとスロットは URL に含まれません。インターセプトは正規のパスに解決され、同等のバリエーションはひとつにまとめられます。_ で始まるプライベートフォルダーは無視され、%5F は公開のアンダースコアになります。layout、loading、default、error、メタデータのファイルは対象外です。

Pages Router: ルート直下の _app、_document、_error は対象外で、それ以外のアンダースコア付きページは有効です。index は取り除かれます。API Routes、Route Handlers、ほかのフレームワークのエンドポイントは includeApi または --api で有効にします。URL は HTTP メソッド、権限、エンドポイントの検証を表現しません。

URL の形の衝突（たとえば同じ場所の [id] と [slug]）や、推論された名前の衝突は生成を失敗させます。Next.js では、正規 URL の重複やオプションの catch-all との優先度の衝突も、Next と同じように失敗します。レイアウトをネストするルーター（Nuxt、Vue、React Router、TanStack）では、同じ URL を共有するレイアウトとその index はひとつのルートにまとめられます。

<a id="development"></a>

## 開発中の自動更新

Next.js: ラッパーは Next の起動前に生成し、その後は開発プロセスの中で直列化されたポーリングの watcher を動かします。ページの追加、削除、名前変更を検知し、モジュールは内容が変わったときだけ更新されます。webpack や Turbopack のフックには手を加えません。next start（本番サーバー）では一切書き込まないため、読み取り専用のデプロイでも安全です。

Vite 系フレームワーク: プラグインは buildStart で生成し、Vite の watcher の add/unlink イベントと named-routes の設定ファイルの変更に反応します。Vite のルートから package.json までさかのぼってプロジェクトのルートを見つけるので、Nuxt の srcDir でも動作します。

watcher は本番ビルド中には動かず、それ自体がプロセスを生かし続けることもありません。編集中に生成エラーが起きても最後の有効なモジュールは保たれ、エラーがログに出ます。設定ファイルがインポートしているモジュールを変更したときは再起動が必要です。watch: false で止まるのは継続的な更新だけで、最初の生成は行われます。

<a id="cli"></a>

## CLI と CI

バイナリ名は named-routes です（named-routes はエイリアス）。generate（デフォルト）はマニフェストを書き出します。list は検出したエントリーを JSON で出力します。check は書き込まずに比較し、古くなっていれば終了コード 1 で終わります。watch は最初に生成し、SIGINT/SIGTERM までポーリングを続けます。init は検出したフレームワーク用の named-routes.config.mjs を書き出し、既存の設定は決して上書きしません。

フラグ: --root <directory>、--config <file>、--framework <name>、--output <file>、--routes-dir <dir>、--router <auto|app|pages>、--api、--watch-interval <ms>、--version (-v)、--help (-h)。コマンドは、パッケージをローカルにインストールした利用側のプロジェクトで実行してください。

生成ファイルをコミットする場合は、ビルドの前に check を実行してください。統合はビルド時に再生成するため、ビルド後の check では、すでに古くなっていたコミット済みファイルを検出できません。生成は決定的かつアトミックで、タイムスタンプも含みません。ジェネレーターの署名がない既存のファイルは決して上書きしません。

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
```

<a id="errors"></a>

## エラーとトラブルシューティング

NamedRouteError は Error を継承し、安定した code を公開しています。UNKNOWN_ROUTE は名前が存在しないこと、MISSING_PARAMETER は必須の値が省略されたこと、UNKNOWN_PARAMETER は余分なキーが query に属するか綴りが誤っていること、INVALID_PARAMETER は値の形が誤っているか禁止されたセグメントを含むこと、INVALID_LOCALE は i18n なしで言語を渡したか未設定の言語であることを意味します。

INVALID_PATTERN、INVALID_NAME、INVALID_MANIFEST は不正なルート定義を示します。INVALID_OPTIONS、INVALID_QUERY、INVALID_HASH は不正なオプションを示します。INVALID_BASE_PATH、INVALID_ORIGIN、INVALID_I18N は URL の defaults を拒否します。MISSING_ORIGIN は、絶対 URL を求める前に origin が必要であることを示します。GENERATION_ERROR は検出の衝突、安全でない出力、check での古い結果を、INVALID_CONFIG は設定の欠落、不正、綴りの誤りを扱います。

routes.generated が見つからない場合: 統合が実行されているか確認し、generate を実行し、output とインポートのエイリアスを確認してください。basePath や言語が重複する場合: フレームワークのリンクには相対 URL を使い、basePath/locale は通常の URL のときだけ渡してください。名前が古い場合: watcher が有効か確認し、ターミナルのエラーを見てください。ページを移動した後の型エラーは想定どおりです。推論された名前を更新するか、固定名を定義してください。

生成処理は手書きの出力ファイルの上書きを拒否します。無関係なコードに生成の署名を付けるのではなく、別の output を選んでください。生成された出力はルーティング対象のファイルの外に置いてください。動的な補間はリクエストを認可するものではありません。権限とアプリケーションの入力は目的地で検証してください。

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

<a id="boundaries"></a>

## リライトと境界

これは URL ビルダーであり、ルーター、ミドルウェア、認可システム、HTTP クライアントの代わりではありません。実行時にルートを作ったり、リソースの存在を確認したり、訪問者の言語を検出したり、バックエンドにリクエストしたりはしません。

リダイレクト、リライト、ミドルウェアによる言語検出、コンポーネントのコードで宣言したパスは、引き続きアプリケーションの責任です。必要な外部パターンやリライト後のパターンは extraRoutes で明示的に対応付け、言語や basePath を二重に付けないようにしてください。スキャナーはフレームワークの設定ファイルを読まないので、設定は withNamedRoutes かオプションで渡してください。

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← 前へ: [API リファレンス](api-reference.md) · [README に戻る](../../README.ja.md) · 次へ: [プロジェクト](project.md) →
