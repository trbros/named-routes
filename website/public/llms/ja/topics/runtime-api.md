# ランタイム API リファレンス

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifest, defaults?) は独立した凍結済みのヘルパーを作り、マニフェストをコピーします。defaults には basePath、assetBase、trailingSlash、origin、i18n を指定します。parsePattern(pattern) は static/dynamic/optionalDynamic/catchAll/optional/mixed のセグメント情報を返して構文を検証し、formatPattern はその逆、patternParameters はパラメーター名を一覧にします。RouteValue、QueryValue、RouteParams、RouteOptions、RouteDefaults、I18nOptions、LocalePrefix、LocaleDomain、NamedRoutes、PatternSegment は型としてエクスポートされています。

単なる Record<string, string> として型付けされたマニフェスト（たとえば JSON から読み込んだもの）でも動作します。名前は string、パラメーターは緩いレコードになりますが、ランタイムはすべての呼び出しを引き続き検証します。

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
