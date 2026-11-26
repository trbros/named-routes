# API リファレンス · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/api-reference.md) · [Português](../pt/api-reference.md) · [Español](../es/api-reference.md) · [日本語](../ja/api-reference.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [ランタイム API リファレンス](#runtime-api)
- [ジェネレーターの設定](#configuration)
- [固定名（任意）](#stable-names)
- [ジェネレーターのプログラム API](#generator-api)

<a id="runtime-api"></a>

## ランタイム API リファレンス

route(name, params?, options?) は URL 文字列を返します。params を省略できるのは、パターンに必須パラメーターがないときだけです。options には query、hash、absolute、basePath、locale を指定できます。route.has(name) は存在を確認し、文字列を既知の名前に絞り込みます。route.names() は利用できる名前を返し、route.pattern(name, locale?) は元のパターンまたは翻訳済みのパターンを返し、route.locales() は言語を一覧にし、route.forLocale(locale) はその言語に固定したヘルパーを返します。route.match(url)、route.is(name, url)、route.breadcrumbs(url) は URL を名前に逆変換します（「逆引きルーティング」を参照）。

createRoutes(manifest, defaults?) は独立した凍結済みのヘルパーを作り、マニフェストをコピーします。defaults には basePath、assetBase、trailingSlash、origin、i18n を指定します。parsePattern(pattern) は static/dynamic/optionalDynamic/catchAll/optional/mixed のセグメント情報を返して構文を検証し、formatPattern はその逆、patternParameters はパラメーター名を一覧にします。RouteValue、QueryValue、RouteParams、RouteOptions、RouteDefaults、I18nOptions、LocalePrefix、LocaleDomain、NamedRoutes、PatternSegment は型としてエクスポートされています。

単なる Record<string, string> として型付けされたマニフェスト（たとえば JSON から読み込んだもの）でも動作します。名前は string、パラメーターは緩いレコードになりますが、ランタイムはすべての呼び出しを引き続き検証します。

route.localize(url, locale?, options?: LocalizeOptions): string | null — 設定済みの別名を使い既存 URL を翻訳します。オプションは sourceLocale、basePath（入力にベースを含む）、includeBasePath（出力にベースを含む）、absolute（設定済み origin/domain）です。クエリとハッシュは再検証せず保持します。

`route.asset(path, options?)` と生成エクスポート `asset` は、ロケール、クエリスキーマ、ルート名とは独立して公開ファイルを解決します。`AssetHelper` と `AssetOptions` は公開型です。`route.localize(url, locale, options?)` は既知の URL を翻訳し、`route.match()` は名前とパラメーターを逆引きし、`route.parseQuery()` は実行時スキーマがある場合にクエリを検証します。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({
  "users.show": "/users/[user]",
  search: "/search/[[...terms]]",
});
route("users.show", { user: 1 });
route.names(); // ["users.show", "search"]
route.pattern("users.show"); // /users/[user]
const input: string = "search";
if (route.has(input)) console.log(route.pattern(input));
```

<a id="configuration"></a>

## ジェネレーターの設定

設定ファイルは必須ではありません。任意の設定ファイルは named-routes.config.ts、.mts、.mjs、.js、.cjs、.json の順に探されます。TypeScript の設定には Node.js 22.18 以上（組み込みの型除去）が必要で、それより古いバージョンでは .mjs を使ってください。補完を効かせるには @triooo/named-routes/config の defineConfig({...}) をエクスポートします。CLI の --config で別のファイルを指定でき、設定ファイル内の root はそのファイルからの相対パスです。未知のオプションや綴りの誤りは INVALID_CONFIG で失敗します。

検出: discovery（2.0 からのデフォルトは "framework"。フレームワークが公開しているルート表、なければファイル。"files" で 1.x のスキャナー）、framework（デフォルトは auto、または next、nuxt、vue、sveltekit、astro、react-router、tanstack-router、manual）、router（Next.js: auto、app、pages）、appDir/pagesDir（Next.js の独自フォルダー、または false）、routesDir（ほかのフレームワークのページ/ルートの独自フォルダー）、pageExtensions（各フレームワークのデフォルト。page.tsx のような複数ドットの拡張子も可）、includeApi（false）、exclude（ルートからの相対 glob。*、**、? を使用）。

名前: names（URL パターン → 独自の名前。各パスは実在する必要がある）、extraRoutes（明示的な名前 → パターン。リライト先など）、naming（separator、paramPrefix、home、transform）、i18n（locales、defaultLocale、localePrefix、pathnames、domains、localeParam、unlocalized）。

出力: output（デフォルトは src/routes.generated.ts。.ts、.mts、.js、.mjs のいずれかで、ルーティング対象のファイルの中には置けない）、importSource（生成ファイルが createRoutes をインポートするモジュール。デフォルトはパッケージ名）、exportNames（routes、route、asset、RouteName、RouteLocale の名前を変更）、defaults（公開される basePath、assetBase、trailingSlash、origin。シリアライズされるのはこれらのキーだけ）、hrefs（2.0 からのデフォルトは "typed"、または "string"。型だけに影響）、query（ルートごとのクエリスキーマのモジュール）、validateQuery（そのスキーマをバンドルして実行する。デフォルト false）。プラグインには watch（デフォルト true）があり、withNamedRoutes では watchInterval（750 ms、25〜60000）と watchMode（auto、native、poll）も使えます。プラグインに直接渡したオプションは設定ファイルより優先されます。

`defaults.assetBase` は公開アセットの URL プレフィックスだけを上書きします。省略すると有効な `basePath` を引き継ぎます。ドメインのルートから配信する場合は `"/"` または `""`、CDN の場合は HTTP(S) URL を指定します。ナビゲーション、ローカライズ、逆引きには影響しません。

`exportNames.asset` で生成エクスポートの名前を変更できます（デフォルト `asset`）。既存のカスタム名が衝突する場合は未使用の `$asset` エイリアスを選択します。`route.asset` は常に利用できます。公開設定に秘密情報を含めないでください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

```ts
// named-routes.config.ts (or .mjs)
import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: "auto",                 // next, nuxt, vue, sveltekit, astro, ...
  discovery: "framework",            // or "files" (1.x)
  routesDir: "app/pages",            // non-Next frameworks
  // appDir: "src/app", pagesDir: false, // Next.js
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  output: "app/utils/routes.ts",     // .ts .mts .js .mjs
  importSource: "@triooo/named-routes",
  exportNames: { route: "url", asset: "publicAsset", routeName: "UrlName" },
  pageExtensions: ["vue"],
  includeApi: false,
  exclude: ["**/__tests__/**", "app/pages/drafts/**"],
  names: { "/users/[user]": "users.show" },
  extraRoutes: { "public.login": "/login" },
  naming: { separator: ".", paramPrefix: "$", home: "home" },
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
  defaults: { origin: "https://triooo.com.br", assetBase: "https://cdn.example.com/public", trailingSlash: false },
});
```

<a id="stable-names"></a>

## 固定名（任意）

自動の名前は URL の構造に従います。リファクタリングで公開 URL が変わっても意味のある名前を保ちたい場合は、任意の names マップを更新してください。エイリアスを付けるパスはすべて実在する必要があります。リストにないルートは自動の名前のままです。名前の重複や綴りの誤りは、壊れたリンクを黙って作る代わりに生成を失敗させます。

独自の名前はそのパスの自動の名前を置き換えるもので、2 つ目のエイリアスが自動で追加されるわけではありません。posts.show のような Laravel 風の名前に便利ですが、通常の使い方では不要です。

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

<a id="generator-api"></a>

## ジェネレーターのプログラム API

discoverRoutes(options?) は何も書き込まずに root、framework、directories、routes、entries、ランタイムの defaults を返します。各エントリーには name、path、file、router、framework があり、必要に応じて variant と localized も付きます。明示的に追加したルートは file: null、router: explicit です。

generateRoutes(options?, { check?: boolean }?) はさらに output と changed を返します。check モードは古い出力を変更せずに拒否します。validateOptions(options) は未知のキーに対して INVALID_CONFIG を投げます。/generator と /config は Node のツールの中だけでインポートし、クライアントのコードでは使わないでください。withNamedRoutes は /next から、namedRoutes は /vite からインポートします。

```ts
import { discoverRoutes, generateRoutes } from "@triooo/named-routes/generator";
const discovery = await discoverRoutes({ root: "/path/to/app", framework: "nuxt" });
console.log(discovery.framework, discovery.entries);
const result = await generateRoutes({ root: "/path/to/app" });
console.log(result.output, result.changed);
await generateRoutes({ root: "/path/to/app" }, { check: true });
```

---

← 前へ: [公開アセット](public-assets.md) · [README に戻る](../../README.ja.md) · 次へ: [ガイド](guides.md) →
