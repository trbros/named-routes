# ランタイム API リファレンス

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-runtime-api.md) · [Português](../pt/topic-runtime-api.md) · [Español](../es/topic-runtime-api.md) · [日本語](../ja/topic-runtime-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="runtime-api"></a>

createRoutes(manifest, defaults?) は独立した凍結済みのヘルパーを作り、マニフェストをコピーします。defaults には basePath、assetBase、trailingSlash、origin、i18n を指定します。parsePattern(pattern) は static/dynamic/optionalDynamic/catchAll/optional/mixed のセグメント情報を返して構文を検証し、formatPattern はその逆、patternParameters はパラメーター名を一覧にします。RouteValue、QueryValue、RouteParams、RouteOptions、RouteDefaults、I18nOptions、LocalePrefix、LocaleDomain、NamedRoutes、PatternSegment は型としてエクスポートされています。

単なる Record<string, string> として型付けされたマニフェスト（たとえば JSON から読み込んだもの）でも動作します。名前は string、パラメーターは緩いレコードになりますが、ランタイムはすべての呼び出しを引き続き検証します。

## 関連トピック

- [route()](topic-helper-route.md)
- [route.url() — 公開 URL](topic-public-url.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [route.match()](topic-helper-match.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [defineQuery()](topic-helper-define-query.md)
- [asset() / route.asset()](topic-assets.md)

---

[全トピック](api-reference.md) · 次へ: [ジェネレーターの設定](topic-configuration.md) →
