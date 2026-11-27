# ドキュメント

`@triooo/named-routes` · **v2.2.0**

[README に戻る](../../README.ja.md) · [English](../en/index.md) · [Português](../pt/index.md) · [Español](../es/index.md) · [日本語](../ja/index.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

## はじめに

- [このパッケージでできること](topic-overview.md)
- [インストール](topic-installation.md)
- [フレームワークを選ぶ](topic-frameworks.md)
- [最初の名前付きルート (Next.js)](topic-quick-start.md)
- [自動命名のルール](topic-naming.md)
- [生成マニフェストを読む](topic-generated-source.md)
- [ほかの選択肢との比較](topic-comparison.md)
- [生成の仕組み](topic-architecture.md)

## Next.js

- [Next.js: セットアップ](topic-nextjs.md)
- [ファイル規則と検出](topic-nextjs-conventions.md)
- [リンクとナビゲーション](topic-nextjs-navigation.md)
- [ベースパスとデプロイ](topic-nextjs-deployment.md)
- [公開アセット](topic-nextjs-assets.md)
- [多言語リンク](topic-nextjs-i18n.md)
- [HTTP エンドポイント](topic-nextjs-endpoints.md)
- [App Router のレシピ](topic-app-router.md)
- [Pages Router のレシピ](topic-pages-router.md)
- [Next.js の typedRoutes 向けの型付き href](topic-typed-hrefs.md)
- [App Router — プログラム遷移](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)

## Nuxt

- [Nuxt: セットアップ](topic-nuxt.md)
- [ファイル規則と検出](topic-nuxt-conventions.md)
- [リンクとナビゲーション](topic-nuxt-navigation.md)
- [ナビゲーション — navigateTo()](topic-nuxt-programmatic.md)
- [ベースパスとデプロイ](topic-nuxt-deployment.md)
- [公開アセット](topic-nuxt-assets.md)
- [多言語リンク](topic-nuxt-i18n.md)
- [HTTP エンドポイント](topic-nuxt-endpoints.md)

## Vue Router

- [Vue Router: セットアップ](topic-vue.md)
- [ファイル規則と検出](topic-vue-conventions.md)
- [リンクとナビゲーション](topic-vue-navigation.md)
- [ナビゲーション — router.push()](topic-vue-programmatic.md)
- [ベースパスとデプロイ](topic-vue-deployment.md)
- [公開アセット](topic-vue-assets.md)
- [多言語リンク](topic-vue-i18n.md)
- [HTTP の境界](topic-vue-endpoints.md)

## SvelteKit

- [SvelteKit: セットアップ](topic-sveltekit.md)
- [ファイル規則と検出](topic-sveltekit-conventions.md)
- [リンクとナビゲーション](topic-sveltekit-navigation.md)
- [ナビゲーション — goto()](topic-sveltekit-programmatic.md)
- [ベースパスとデプロイ](topic-sveltekit-deployment.md)
- [公開アセット](topic-sveltekit-assets.md)
- [多言語リンク](topic-sveltekit-i18n.md)
- [HTTP エンドポイント](topic-sveltekit-endpoints.md)

## Astro

- [Astro: セットアップ](topic-astro.md)
- [ファイル規則と検出](topic-astro-conventions.md)
- [リンクとナビゲーション](topic-astro-navigation.md)
- [ナビゲーション — Astro.redirect()](topic-astro-programmatic.md)
- [ベースパスとデプロイ](topic-astro-deployment.md)
- [公開アセット](topic-astro-assets.md)
- [多言語リンク](topic-astro-i18n.md)
- [HTTP エンドポイント](topic-astro-endpoints.md)

## React Router / Remix

- [React Router / Remix: セットアップ](topic-react-router.md)
- [ファイル規則と検出](topic-react-router-conventions.md)
- [リンクとナビゲーション](topic-react-router-navigation.md)
- [ナビゲーション — useNavigate()](topic-react-router-programmatic.md)
- [ベースパスとデプロイ](topic-react-router-deployment.md)
- [公開アセット](topic-react-router-assets.md)
- [多言語リンク](topic-react-router-i18n.md)
- [HTTP の境界](topic-react-router-endpoints.md)

## TanStack Router

- [TanStack Router: セットアップ](topic-tanstack-router.md)
- [ファイル規則と検出](topic-tanstack-router-conventions.md)
- [リンクとナビゲーション](topic-tanstack-router-navigation.md)
- [ナビゲーション — window.location.assign()](topic-tanstack-router-programmatic.md)
- [ベースパスとデプロイ](topic-tanstack-router-deployment.md)
- [公開アセット](topic-tanstack-router-assets.md)
- [多言語リンク](topic-tanstack-router-i18n.md)
- [HTTP の境界](topic-tanstack-router-endpoints.md)

## 手動ルーティング

- [手動ルート（React、Vue、任意のルーター）](topic-manual-routes.md)

## URL と名前の構築

- [route()](topic-helper-route.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [必須パラメータとエンコード](topic-parameters.md)
- [任意パラメータ](topic-optional-parameters.md)
- [キャッチオールパラメータ](topic-catch-all-parameters.md)
- [混合セグメント](topic-mixed-parameters.md)
- [クエリ文字列](topic-query-hash.md)
- [URL フラグメント](topic-hash-fragments.md)
- [ベースパス — 内部と公開 URL](topic-base-path.md)
- [絶対 URL と origin](topic-absolute-urls.md)
- [末尾スラッシュ](topic-trailing-slash.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [固定名（任意）](topic-stable-names.md)
- [TypeScript と Next の typedRoutes](topic-typescript.md)

## ルートリファレンスと検査

- [逆引きルーティングとアクティブなルート](topic-reverse-routing.md)
- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.has()](topic-helper-has.md)
- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.withDefaults()](topic-helper-with-defaults.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)
- [patternParameters()](topic-helper-pattern-parameters.md)

## 型付きクエリと URL 更新

- [型付きのクエリパラメーター](topic-typed-query.md)
- [クエリスキーマを接続](topic-query-schema-config.md)
- [型付きクエリを使用](topic-query-schema-use.md)
- [defineQuery()](topic-helper-define-query.md)
- [defineQuery.type<T>()](topic-helper-define-query-type.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [route.withQuery()](topic-helper-with-query.md)

## 国際化

- [言語と i18n](topic-i18n.md)
- [言語別 URL の生成](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.locales()](topic-helper-locales.md)
- [route.forLocale()](topic-helper-for-locale.md)

## アセットと CDN

- [asset() / route.asset()](topic-assets.md)
- [route.asset()](topic-helper-route-asset.md)
- [assetBase と CDN](topic-asset-base.md)
- [アセットの絶対 URL](topic-asset-absolute.md)
- [型付きアセット](topic-typed-assets.md)
- [asset.has() / paths() / info()](topic-asset-metadata.md)
- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [アセットのバージョン管理](topic-asset-versioning.md)

## SEO とメタデータ

- [route.canonical()](topic-helper-canonical.md)
- [route.alternates()](topic-helper-alternates.md)

## HTTP エンドポイント

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [動的エンドポイントパラメータ](topic-endpoint-dynamic.md)

## 設定とランタイムリファレンス

- [ランタイム API リファレンス](topic-runtime-api.md)
- [ジェネレーターの設定](topic-configuration.md)
- [検出とディレクトリ](topic-config-discovery.md)
- [生成先と export](topic-config-output.md)
- [命名規則](topic-config-naming.md)
- [URL の既定値](topic-config-defaults.md)
- [明示ルートの追加](topic-config-extra-routes.md)
- [API 検出の有効化](topic-config-api.md)
- [監視と開発オプション](topic-config-watch.md)

## ジェネレーターとツール API

- [ジェネレーターのプログラム API](topic-generator-api.md)
- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)

## CLI、CI、トラブルシューティング

- [CLI と CI](topic-cli.md)
- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [診断: named-routes doctor](topic-doctor.md)
- [ルートとアセットの監査](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)
- [検出のエッジケース](topic-discovery.md)
- [開発中の自動更新](topic-development.md)
- [エラーとトラブルシューティング](topic-errors.md)
- [リライトと境界](topic-boundaries.md)

## AI エージェントと MCP

- [AI エージェントと MCP](topic-ai-agents.md)
- [MCP のインストールと起動](topic-mcp-installation.md)
- [ローカルプロジェクトの接続](topic-mcp-project.md)
- [Claude Desktop と Claude Code](topic-mcp-claude.md)
- [Cursor の設定](topic-mcp-cursor.md)
- [Codex の設定](topic-mcp-codex.md)
- [VS Code / GitHub Copilot](topic-mcp-vscode.md)
- [Windows と Node ランチャー](topic-mcp-windows.md)
- [ツールとリソース](topic-mcp-tools.md)
- [例：実際のルートからリンクを作る](topic-mcp-workflow.md)
- [セキュリティと範囲](topic-mcp-security.md)
- [Inspector とトラブルシューティング](topic-mcp-troubleshooting.md)

## プロジェクトとリリース

- [ドキュメントサイト](topic-website.md)
- [試してみる: フレームワーク別デモ](topic-demos.md)
- [ステップごとのコントリビュート](topic-contributing.md)
- [バージョンとアップグレード](topic-versioning.md)
- [1.x からのアップグレード](topic-migration.md)
- [ヘルパープレイグラウンド](topic-helpers-playground.md)
