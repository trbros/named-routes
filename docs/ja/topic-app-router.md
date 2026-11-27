# App Router のレシピ

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-app-router.md) · [Português](../pt/topic-app-router.md) · [Español](../es/topic-app-router.md) · [日本語](../ja/topic-app-router.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="app-router"></a>

ヘルパーは普通の URL 文字列を返します。next/link、redirect、next/navigation の App Router 用 useRouter フックと組み合わせて使ってください。リダイレクトは適切なサーバー処理やイベント処理の中で実行します。名前付きルートが Next.js のリダイレクトの意味を変えることはありません。

これらのスニペットの名前は、対応するページ（posts/page.tsx、posts/[post]/page.tsx、posts/[post]/edit/page.tsx）が存在する前提です。

**ベースと翻訳 URL。** ラッパーは basePath を継承します。Next Link とルーターは内部パスを使い、通常のリンクでは basePath: true を指定します。翻訳された受信 URL のリダイレクトには proxy または middleware で選択済みの言語を route.localize() に渡します。i18n を参照してください。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/posts/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/posts/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## 関連トピック

- [リンクとナビゲーション](topic-nextjs-navigation.md)
- [App Router — プログラム遷移](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)
- [ベースパスとデプロイ](topic-nextjs-deployment.md)

---

← 前へ: [HTTP エンドポイント](topic-nextjs-endpoints.md) · [全トピック](framework-nextjs.md) · 次へ: [Pages Router のレシピ](topic-pages-router.md) →
