# エラーとトラブルシューティング

[ドキュメント](index.md) / [CLI、CI、トラブルシューティング](guides.md)

[English](../en/topic-errors.md) · [Português](../pt/topic-errors.md) · [Español](../es/topic-errors.md) · [日本語](../ja/topic-errors.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="errors"></a>

NamedRouteError は Error を継承し、安定した code を公開しています。UNKNOWN_ROUTE は名前が存在しないこと、MISSING_PARAMETER は必須の値が省略されたこと、UNKNOWN_PARAMETER は余分なキーが query に属するか綴りが誤っていること、INVALID_PARAMETER は値の形が誤っているか禁止されたセグメントを含むこと、INVALID_LOCALE は i18n なしで言語を渡したか未設定の言語であることを意味します。

INVALID_PATTERN、INVALID_NAME、INVALID_MANIFEST は不正なルート定義を示します。INVALID_OPTIONS、INVALID_QUERY、INVALID_HASH は不正なオプションを示します。INVALID_BASE_PATH、INVALID_ORIGIN、INVALID_I18N は URL の defaults を拒否します。MISSING_ORIGIN は、絶対 URL を求める前に origin が必要であることを示します。GENERATION_ERROR は検出の衝突、名前を付けられないルート、check での古い結果を、INVALID_CONFIG は不正なオプションすべて（設定の欠落・不正・綴りの誤り、router、pageExtensions、discovery、output）を扱います。

routes.generated が見つからない場合: 統合が実行されているか確認し、generate を実行し、output とインポートのエイリアスを確認してください。basePath や言語が重複する場合: フレームワークのリンクには相対 URL を使い、basePath/locale は通常の URL のときだけ渡してください。名前が古い場合: watcher が有効か確認し、ターミナルのエラーを見てください。ページを移動した後の型エラーは想定どおりです。推論された名前を更新するか、固定名を定義してください。

生成処理は手書きの出力ファイルの上書きを拒否します。無関係なコードに生成の署名を付けるのではなく、別の output を選んでください。生成された出力はルーティング対象のファイルの外に置いてください。動的な補間はリクエストを認可するものではありません。権限とアプリケーションの入力は目的地で検証してください。

1.1 以降、すべての NamedRouteError は details: { file, files, route, pattern, option, hint } も持ち、わかっている情報が入ります。たとえばルートの競合では両方のファイル、名前・オプション・names のキーの綴りが誤っている場合は "Did you mean users.show?" です。INVALID_QUERY はクエリがスキーマを満たさないか、スキーマのマップが不正であることを、INVALID_URL は match() がパスでも URL でもないものを受け取ったことを意味します。2.0 からは、router、pageExtensions、output の不正な値は INVALID_CONFIG になります（1.x では GENERATION_ERROR）。メッセージは変わりません。

静的ファイルの 404 は、実際のデプロイ先パスと公開ディレクトリを確認してください。`asset()` は設定されたベースを使用し、バンドラーの出力や現在のリクエストは参照しません。`INVALID_ASSET_BASE`、`INVALID_ASSET`、`INVALID_OPTIONS` は無効なベース、パス、オプションを示します。

## 例

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

---

← 前へ: [開発中の自動更新](topic-development.md) · [全トピック](guides.md) · 次へ: [リライトと境界](topic-boundaries.md) →
