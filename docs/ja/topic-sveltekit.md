# SvelteKit: セットアップ

[ドキュメント](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit.md) · [Português](../pt/topic-sveltekit.md) · [Español](../es/topic-sveltekit.md) · [日本語](../ja/topic-sveltekit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit"></a>

vite.config で sveltekit() の前に namedRoutes() を追加します。モジュールを src/lib に書き出すと、どのコンポーネント、load 関数、エンドポイントからでも $lib/routes.generated としてインポートできます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
export default defineConfig({
  plugins: [
    namedRoutes({ output: "src/lib/routes.generated.ts" }),
    sveltekit(),
  ],
});
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。 SvelteKit 3 用の設定です。SvelteKit 2 では kit.paths.base と routerBase を揃えます。

```ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { namedRoutes } from "@triooo/named-routes/vite";
const base = "/app";
export default defineConfig({
  plugins: [
    namedRoutes({ routerBase: base, output: "src/lib/routes.generated.ts" }),
    sveltekit({ paths: { base } }),
  ],
});
```

## 関連トピック

- [ファイル規則と検出](topic-sveltekit-conventions.md)
- [リンクとナビゲーション](topic-sveltekit-navigation.md)
- [インストール](topic-installation.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](framework-sveltekit.md) · 次へ: [ファイル規則と検出](topic-sveltekit-conventions.md) →
