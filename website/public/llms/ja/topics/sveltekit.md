# SvelteKit: セットアップ

Topic: `sveltekit` · Named Routes v2.2.0

vite.config で sveltekit() の前に namedRoutes() を追加します。モジュールを src/lib に書き出すと、どのコンポーネント、load 関数、エンドポイントからでも $lib/routes.generated としてインポートできます。

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

Related topic IDs: sveltekit-conventions, sveltekit-navigation, installation, configuration
