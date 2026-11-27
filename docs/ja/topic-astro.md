# Astro: セットアップ

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro.md) · [Português](../pt/topic-astro.md) · [Español](../es/topic-astro.md) · [日本語](../ja/topic-astro.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro"></a>

astro.config の integrations に @triooo/named-routes/astro のネイティブ統合を登録します。Astro の最終的な base を継承します。旧設定から移行する場合は vite.plugins の namedRoutes() を削除してください。生成先は既定で src/routes.generated.ts で、.astro のフロントマター、アイランド、エンドポイントで利用できます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

## 関連トピック

- [ファイル規則と検出](topic-astro-conventions.md)
- [リンクとナビゲーション](topic-astro-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-astro.md) · 次へ: [ファイル規則と検出](topic-astro-conventions.md) →
