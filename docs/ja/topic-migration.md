# 1.x からのアップグレード

[ドキュメント](index.md) / [プロジェクトとリリース](project.md)

[English](../en/topic-migration.md) · [Português](../pt/topic-migration.md) · [Español](../es/topic-migration.md) · [日本語](../ja/topic-migration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="migration"></a>

2.0 は、変更する価値がある箇所でだけデフォルトを変えており、どの変更も設定で元に戻せます。npx @triooo/named-routes doctor --v2 でプロジェクトに当てはまる項目を確認し、npx @triooo/named-routes migrate --to 2（ドライラン）と --write で、生成されるモジュールが変わる箇所に 1.x の動作を固定します。新しいデフォルトを採用する準備ができたら、固定した行を削除してください。

Node.js 22.12 以上が必要です（20 は 2026 年 4 月にサポート終了）。ES モジュールの require() と、すべての環境でのネイティブな再帰的ファイル監視が使えます。エクスポートされる型には TypeScript 5.4 以上が必要で、これは Zod 4 と Valibot 1 の最低バージョンでもあります。

route() はデフォルトで型付き href を返します。以前は string、現在は Next.js の typedRoutes がキャストなしで受け付ける `/users/${string}` です。ルートを変数に入れて後で別の string を代入するコードはコンパイルできなくなります。変数に string 型を付けるか、hrefs: "string" にしてください。

フレームワークがルート表を公開している場合（Nuxt モジュール、Vue Router 5、React Router、TanStack Router）は、ルートをその表から取ります。以前は definePageMeta/definePage のパスや app/routes.ts のルートに extraRoutes が必要でしたが、今はほかのページと同じように名前が付くので、それを重複させていた extraRoutes は削除できます。ファイル走査を続けるには discovery: "files" にします。Nuxt では Vite プラグインを modules: ["@triooo/named-routes/nuxt"] に置き換えてください。

router、pageExtensions、output の不正な値は GENERATION_ERROR ではなく INVALID_CONFIG になり、エラーの種類ごとにコードが 1 つになりました。error.code の比較を確認してください。typesVersions は削除しました。TypeScript は exports からパッケージを解決する必要があり、moduleResolution は bundler、node16、nodenext のいずれかにします（node10 では解決できません）。クエリのスキーマを型としてだけ import する生成モジュールは TypeOnlyQueries を使うようになったため、その場合の route.parseQuery() は生のクエリを返す型になります。

## 例

```sh
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2           # dry run
npx @triooo/named-routes migrate --to 2 --write   # pins hrefs/discovery in named-routes.config

# Keep a reassigned route as a string
const [href, setHref] = useState<string>(route("home"));
```

---

← 前へ: [バージョンとアップグレード](topic-versioning.md) · [全トピック](project.md) · 次へ: [ヘルパープレイグラウンド](topic-helpers-playground.md) →
