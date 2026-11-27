# 最初の名前付きルート (Next.js)

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-quick-start.md) · [Português](../pt/topic-quick-start.md) · [Español](../es/topic-quick-start.md) · [日本語](../ja/topic-quick-start.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="quick-start"></a>

Next.js の最小設定です。next.config.ts にラッパーを追加し、開発サーバーを起動してナビゲーションガイドへ進みます。別のフレームワークには専用ガイドを使用してください。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({});
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app" });
```

## 関連トピック

- [リンクとナビゲーション](topic-nextjs-navigation.md)
- [フレームワークを選ぶ](topic-frameworks.md)
- [生成マニフェストを読む](topic-generated-source.md)
- [MCP のインストールと起動](topic-mcp-installation.md)

---

← 前へ: [フレームワークを選ぶ](topic-frameworks.md) · [全トピック](getting-started.md) · 次へ: [自動命名のルール](topic-naming.md) →
