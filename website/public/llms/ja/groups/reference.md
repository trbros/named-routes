# 設定とランタイムリファレンス

# ランタイム API リファレンス

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifest, defaults?) は独立した凍結済みのヘルパーを作り、マニフェストをコピーします。defaults には basePath、assetBase、trailingSlash、origin、i18n を指定します。parsePattern(pattern) は static/dynamic/optionalDynamic/catchAll/optional/mixed のセグメント情報を返して構文を検証し、formatPattern はその逆、patternParameters はパラメーター名を一覧にします。RouteValue、QueryValue、RouteParams、RouteOptions、RouteDefaults、I18nOptions、LocalePrefix、LocaleDomain、NamedRoutes、PatternSegment は型としてエクスポートされています。

単なる Record<string, string> として型付けされたマニフェスト（たとえば JSON から読み込んだもの）でも動作します。名前は string、パラメーターは緩いレコードになりますが、ランタイムはすべての呼び出しを引き続き検証します。

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
---

# ジェネレーターの設定

Topic: `configuration` · Named Routes v2.2.0

設定ファイルは任意です。必要な設定のみ追加します。.ts、.mts、.mjs、.js、.cjs、.json の順に検出します。TypeScript 非対応時は .mjs を使い、--config で別ファイルを指定できます。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
---

# 検出とディレクトリ

Topic: `config-discovery` · Named Routes v2.2.0

framework: auto または明示指定を使います。discovery: files はファイルスキャンを強制します。Next の appDir/pagesDir、他の routesDir、pageExtensions、exclude で調整できます。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
---

# 生成先と export

Topic: `config-output` · Named Routes v2.2.0

output はルートディレクトリ外の生成先です。exportNames と importSource で変更できます。hrefs: typed が既定です。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
---

# 命名規則

Topic: `config-naming` · Named Routes v2.2.0

naming.style、separator、paramPrefix、home を指定できます。transform は自動名を変更でき、names が優先します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
---

# URL の既定値

Topic: `config-defaults` · Named Routes v2.2.0

defaults に basePath、includeBasePath、origin、trailingSlash、assetBase を設定できます。公開される値なので秘密情報は含めないでください。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
---

# 明示ルートの追加

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes は検出不要の明示的な名前とパターンを指定します。ページやサーバールートは作成しません。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
---

# API 検出の有効化

Topic: `config-api` · Named Routes v2.2.0

includeApi は既定で false です。静的に検出できるメソッドのみディスクリプターを生成します。

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
---

# 監視と開発オプション

Topic: `config-watch` · Named Routes v2.2.0

開発中は統合が更新します。withNamedRoutes の watch、watchMode、watchInterval で調整できます。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
