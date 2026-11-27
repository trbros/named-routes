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
