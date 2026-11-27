# ベースパス — 内部と公開 URL

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-base-path.md) · [Português](../pt/topic-base-path.md) · [Español](../es/topic-base-path.md) · [日本語](../ja/topic-base-path.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="base-path"></a>

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

フレームワーク別のデプロイガイドを参照してください。CLI は .named-routes/ のベースまたは --base-path /app を使い、/ で解除します。CDN とナビゲーションベースは別です。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

## 関連トピック

- [route.url() — 公開 URL](topic-public-url.md)
- [絶対 URL と origin](topic-absolute-urls.md)
- [末尾スラッシュ](topic-trailing-slash.md)
- [assetBase と CDN](topic-asset-base.md)
- [generate](topic-cli-generate.md)

---

← 前へ: [URL フラグメント](topic-hash-fragments.md) · [全トピック](build-with-routes.md) · 次へ: [絶対 URL と origin](topic-absolute-urls.md) →
