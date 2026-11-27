# 検出のエッジケース

[ドキュメント](index.md) / [CLI、CI、トラブルシューティング](guides.md)

[English](../en/topic-discovery.md) · [Português](../pt/topic-discovery.md) · [Español](../es/topic-discovery.md) · [日本語](../ja/topic-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="discovery"></a>

Next.js: スキャナーは app と pages を合わせて扱います。ルート直下の app ディレクトリは src/app より優先され、pages と src/pages にも同じルールが独立して適用されます。ほかのフレームワークは、routesDir を指定しない限り標準のフォルダー（Nuxt は app/pages または pages、Vue は src/pages、SvelteKit は src/routes、Astro は src/pages、React Router は app/routes、TanStack は src/routes）を使います。ディレクトリのシンボリックリンク、隠しフォルダー、node_modules はたどらず、.d.ts ファイルは無視します。

App Router: デフォルトでは page ファイルだけが対象です。グループとスロットは URL に含まれません。インターセプトは正規のパスに解決され、同等のバリエーションはひとつにまとめられます。_ で始まるプライベートフォルダーは無視され、%5F は公開のアンダースコアになります。layout、loading、default、error、メタデータのファイルは対象外です。

Pages Router: ルート直下の _app、_document、_error は対象外で、それ以外のアンダースコア付きページは有効です。index は取り除かれます。API Routes、Route Handlers、ほかのフレームワークのエンドポイントは includeApi または --api で有効にします。URL は HTTP メソッド、権限、エンドポイントの検証を表現しません。

URL の形の衝突（たとえば同じ場所の [id] と [slug]）や、推論された名前の衝突は生成を失敗させます。Next.js では、正規 URL の重複やオプションの catch-all との優先度の衝突も、Next と同じように失敗します。レイアウトをネストするルーター（Nuxt、Vue、React Router、TanStack）では、同じ URL を共有するレイアウトとその index はひとつのルートにまとめられます。

フレームワークによる検出では、ページの走査をフレームワークの表で置き換えます。エンドポイント（includeApi）は引き続きフォルダーから読み、exclude は報告されたファイルにも適用され、エイリアス（Nuxt の alias）には別の名前が付きます。named-routes doctor は 2 つのビューの片方にしかないルートをすべて一覧表示するので、definePageMeta、definePage、routes.ts で何が変わったかを確認できます。

---

← 前へ: [migrate --to 2](topic-cli-migrate.md) · [全トピック](guides.md) · 次へ: [開発中の自動更新](topic-development.md) →
