# Next.js

# Next.js: セットアップ

Topic: `nextjs` · Named Routes v2.2.0

next.config を @triooo/named-routes/next の withNamedRoutes でラップします。モジュールは next dev と next build の前に生成され、next dev の中では watcher が最新に保ち、next start では一切書き込まないため、読み取り専用のデプロイでも安全です。ラッパーは pageExtensions、basePath、trailingSlash、Pages Router の i18n 設定を引き継ぎます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

Related topic IDs: nextjs-conventions, nextjs-navigation, installation, configuration
---

# ファイル規則と検出

Topic: `nextjs-conventions` · Named Routes v2.2.0

`app/users/[user]/page.tsx` を作成すると、パス命名モードで `users.$user` が生成されます。ページの描画はフレームワークが行います。

**規約。** app/ と pages/（または src/app と src/pages）を合わせて読み取ります。App Router: page ファイルのみ。ルートグループと並列スロットは省かれ、インターセプトは正規の URL に解決され、_ で始まるプライベートフォルダーは無視され、%5F はアンダースコアになります。Pages Router: index は取り除かれ、_app、_document、_error は対象外です。Route Handlers と pages/api は includeApi で有効にできます。appDir と pagesDir で独自のフォルダーを指定できます（片方を false にすると読み取りません）。

**検証。** CI では実際の Next 16 開発サーバー（App Router と Pages Router、basePath とページのライブ検出を含む）を動かしています。デモ: examples/app-router と examples/pages-router。App Router と Pages Router のレシピもあわせて参照してください。

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `nextjs-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url
---

# ベースパスとデプロイ

Topic: `nextjs-deployment` · Named Routes v2.2.0

Next.js で `basePath` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# 公開アセット

Topic: `nextjs-assets` · Named Routes v2.2.0

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "@/routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# 多言語リンク

Topic: `nextjs-i18n` · Named Routes v2.2.0

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

## ベースパスなし

ブラウザーの URL: `/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /pt/users/42
```

## ベースパスあり

ブラウザーの URL: `/app/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$user", { params: { user: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP エンドポイント

Topic: `nextjs-endpoints` · Named Routes v2.2.0

includeApi: true を有効にし、`app/api/admin/route.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
---

# App Router のレシピ

Topic: `app-router` · Named Routes v2.2.0

ヘルパーは普通の URL 文字列を返します。next/link、redirect、next/navigation の App Router 用 useRouter フックと組み合わせて使ってください。リダイレクトは適切なサーバー処理やイベント処理の中で実行します。名前付きルートが Next.js のリダイレクトの意味を変えることはありません。

これらのスニペットの名前は、対応するページ（posts/page.tsx、posts/[post]/page.tsx、posts/[post]/edit/page.tsx）が存在する前提です。

**ベースと翻訳 URL。** ラッパーは basePath を継承します。Next Link とルーターは内部パスを使い、通常のリンクでは basePath: true を指定します。翻訳された受信 URL のリダイレクトには proxy または middleware で選択済みの言語を route.localize() に渡します。i18n を参照してください。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

## ベースパスなし

ブラウザーの URL: `/posts/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

## ベースパスあり

ブラウザーの URL: `/app/posts/42`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-router-push, nextjs-redirect, nextjs-deployment
---

# Pages Router のレシピ

Topic: `pages-router` · Named Routes v2.2.0

同じ生成ヘルパーを使います。Pages Router のアプリでは、ルーターのフックは next/router から取得します。Link に専用のアダプターは不要です。移行中は両方のルーターのディレクトリをスキャンできますが、正規 URL が衝突すると生成は失敗します。

**ベースと i18n。** Next Link と next/router は設定済みの basePath と locale を使用します。これらには route() の内部パスを渡します。通常の公開 URL では basePath: true と必要に応じて locale を指定します。route.localize() は i18n 設定を必要とし、自動でリダイレクトを追加しません。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

## ベースパスなし

ブラウザーの URL: `/user/profile`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## ベースパスあり

ブラウザーの URL: `/app/user/profile`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
---

# Next.js の typedRoutes 向けの型付き href

Topic: `typed-hrefs` · Named Routes v2.2.0

route() は string ではなくテンプレートリテラル型を返します（2.0 からのデフォルト）。route("users.$user", { user: 42 }) の型は `/users/${string}` です。Next.js の typedRoutes は、両方のルーターの <Link href>、router.push()、replace()、prefetch() でキャストなしにこの値を受け付け、他の型付きルーターも string として受け付けます。変わるのは型だけで、URL は同じです。

query や hash を指定した呼び出しは、パスに `?${string}` または `#${string}` が付いた型を返します。absolute、basePath、locale を指定した呼び出しは string を返します。Next は basePath と言語を自分で付け、型付きリンクでは絶対 URL を受け付けないためです。オプションのセグメントはユニオン型になるので、パラメーターなしの /shop/[[...path]] の型は "/shop" になります。Next.js の typedRoutes 自体が、オプションの catch-all のこの基底パスをリテラルであっても拒否するため、その場合はセグメントを渡してください。

戻り値の型が狭くなるため、ルートを変数に入れて後で別の string を代入するコード（useState(route(...)) の後に setState(window.location.href) など）は壊れることがあります。変数に string 型を付けるか、hrefs: "string" で 1.x の型を保ってください（named-routes migrate --to 2 がこれを行います）。hrefs: "string" と typedRoutes を併用すると withNamedRoutes() が警告を出し、named-routes doctor も報告します。Next 16（App Router と Pages Router、webpack と Turbopack）で実際の next typegen と tsc を使って検証しています。

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
---

# App Router — プログラム遷移

Topic: `nextjs-router-push` · Named Routes v2.2.0

Client Component では next/navigation の useRouter に内部パスを渡します。basePath はルーターが付加します。

## ベースパスなし

ブラウザーの URL: `/posts/42/edit`。

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

## ベースパスあり

ブラウザーの URL: `/app/posts/42/edit`。

```tsx
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function Edit() {
  const router = useRouter();
  return <button onClick={() => router.push(route("posts.$post.edit", { post: 42 }))}>Edit</button>;
}
```

Related topic IDs: app-router, nextjs-navigation, helper-route
---

# App Router — redirect()

Topic: `nextjs-redirect` · Named Routes v2.2.0

サーバーで Next.js の redirect を使います。Named Routes は URL の生成のみ行います。

## ベースパスなし

ブラウザーの URL: `/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

## ベースパスあり

ブラウザーの URL: `/app/user/profile`。

```ts
import { redirect } from "next/navigation";
import { route } from "@/routes.generated";

export function goToProfile() {
  redirect(route("user.profile"));
}
```

Related topic IDs: app-router, nextjs-router-push
