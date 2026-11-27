# Astro

# Astro: セットアップ

Topic: `astro` · Named Routes v2.2.0

astro.config の integrations に @triooo/named-routes/astro のネイティブ統合を登録します。Astro の最終的な base を継承します。旧設定から移行する場合は vite.plugins の namedRoutes() を削除してください。生成先は既定で src/routes.generated.ts で、.astro のフロントマター、アイランド、エンドポイントで利用できます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

Related topic IDs: astro-conventions, astro-navigation, installation, configuration
---

# ファイル規則と検出

Topic: `astro-conventions` · Named Routes v2.2.0

`src/pages/users/[id].astro` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** .astro、.md、.mdx、.markdown、.html のページを含む src/pages。_ で始まるファイルやフォルダーはプライベート。[id]。[...slug] は 0 個以上のセグメントに一致（[[...slug]]）。[lang]-[version] のような混在セグメント。.ts/.js のエンドポイントは includeApi で有効になり、内側の拡張子を保ちます（api/data.json.ts は /api/data.json）。

**制限と検証。** 静的ビルドでは、動的ページに引き続き getStaticPaths が必要です。このパッケージは URL を作るだけで、パラメーターを列挙はしません。規約テストと、Astro 5 でビルド・実行できる examples/astro で検証しています。

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
---

# リンクとナビゲーション

Topic: `astro-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```astro
---
import { route } from "../routes.generated";
---
<a href={route("users.$id", { id: 42 })}>Ana</a>
```

Related topic IDs: helper-route, parameters, query-hash, public-url, astro-programmatic
---

# ナビゲーション — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

SSR ページの frontmatter で公開 URL を Astro.redirect に渡します。静的出力ではリダイレクトの動作が異なります。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
---

# ベースパスとデプロイ

Topic: `astro-deployment` · Named Routes v2.2.0

Astro で `base` を設定します。route() はベースを含みます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
---

# 公開アセット

Topic: `astro-assets` · Named Routes v2.2.0

`public/images/logo.svg` にファイルを置き、生成モジュールから asset を import します。ベース /app の場合 /app/images/logo.svg が返ります。CDN は独立設定です。

## ベースパスなし

公開ファイルの URL: `/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /images/logo.svg
```

## ベースパスあり

公開ファイルの URL: `/app/images/logo.svg`。

```ts
// Generated module (adjust import for your component)
import { asset } from "../routes.generated";
asset("images/logo.svg"); // /app/images/logo.svg
```

Related topic IDs: assets, typed-assets, asset-base, asset-versioning
---

# 多言語リンク

Topic: `astro-i18n` · Named Routes v2.2.0

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

**i18n。** Astro の物理的な言語フォルダー（src/pages/pt/about.astro）は、その言語が i18n.locales にあれば src/pages/about.astro と同じ名前付きルートにまとめられます。prefixDefaultLocale: false は localePrefix の as-needed、true は always に対応します。

## ベースパスなし

ブラウザーの URL: `/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## ベースパスあり

ブラウザーの URL: `/app/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
---

# HTTP エンドポイント

Topic: `astro-endpoints` · Named Routes v2.2.0

includeApi: true を有効にし、`src/pages/api/admin.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
