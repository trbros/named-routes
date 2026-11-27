# Next.js: セットアップ

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs.md) · [Português](../pt/topic-nextjs.md) · [Español](../es/topic-nextjs.md) · [日本語](../ja/topic-nextjs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs"></a>

next.config を @triooo/named-routes/next の withNamedRoutes でラップします。モジュールは next dev と next build の前に生成され、next dev の中では watcher が最新に保ち、next start では一切書き込まないため、読み取り専用のデプロイでも安全です。ラッパーは pageExtensions、basePath、trailingSlash、Pages Router の i18n 設定を引き継ぎます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

## 関連トピック

- [ファイル規則と検出](topic-nextjs-conventions.md)
- [リンクとナビゲーション](topic-nextjs-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-nextjs.md) · 次へ: [ファイル規則と検出](topic-nextjs-conventions.md) →
