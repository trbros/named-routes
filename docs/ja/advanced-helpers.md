# 高度な URL ヘルパー · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/advanced-helpers.md) · [Português](../pt/advanced-helpers.md) · [Español](../es/advanced-helpers.md) · [日本語](../ja/advanced-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [型付きアセット](#typed-assets)
- [asset.has() / paths() / info()](#asset-metadata)
- [アセットのバージョン管理](#asset-versioning)
- [route.withQuery()](#helper-with-query)
- [route.alternates()](#helper-alternates)
- [route.canonical()](#helper-canonical)
- [route.withDefaults()](#helper-with-defaults)
- [ルートとアセットの監査](#audit)
- [ヘルパープレイグラウンド](#helpers-playground)

<a id="typed-assets"></a>

## 型付きアセット

named-routes.config の `assets` を有効にすると public/（SvelteKit は static/）を走査します。隠しファイルとシンボリックリンクを除外し、exclude の *, **, ? グロブをサポートします。エンコードされた相対パスと SHA-256 ハッシュのマニフェストを生成します。strict: true で生成された asset のリテラルパスを型検査し、route.asset() は実行時に検証します。外部 HTTP(S) URL は許可され、ファイルのアップロードはしません。assets.directory で公開ディレクトリを変更できます。build/check で更新し、CLI watch で再帰的に監視できます。

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  assets: { enabled: true, strict: true, exclude: ["**/*.map"] },
  defaults: { basePath: "/app", assetBase: "https://cdn.example.com/public" },
});
```

<a id="asset-metadata"></a>

## asset.has() / paths() / info()

デプロイ先ではなく生成済みマニフェストを参照します。has は先頭スラッシュ、クエリ、ハッシュ付きローカルパスを扱い、paths はエンコード済みの名前を返します。info は path、拡張子、バイト数、version または null を返します。検出を無効にするとマニフェストは空です。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  assetManifest: { files: { "images/logo.svg": { size: 64, version: "a8f32c910123" } } },
});
asset.has("images/logo.svg"); // true
asset.paths(); // ["images/logo.svg"]
asset.info("images/logo.svg"); // { path, extension, size, version }
asset.info("missing.svg"); // null
```

<a id="asset-versioning"></a>

## アセットのバージョン管理

`{ version: true }` はコンテンツの SHA-256 の先頭12桁を v に追加または置換します。既存のクエリとフラグメントを保持します。アセット検出を有効にし、内容変更時に再生成してください。外部 URL や未検出ファイルには使えません。キャッシュ回避であり、暗号学的整合性保証や CDN のパージではありません。

```ts
import { createRoutes } from "@triooo/named-routes";
const { asset } = createRoutes({ home: "/" }, {
  basePath: "/app",
  assetManifest: { files: { "css/custom.css": { size: 64, version: "a8f32c910123" } } },
});
asset("css/custom.css", { version: true });
// /app/css/custom.css?v=a8f32c910123
asset("css/custom.css?theme=dark#top", { version: true });
// /app/css/custom.css?theme=dark&v=a8f32c910123#top
```

<a id="helper-with-query"></a>

## route.withQuery()

ルート相対または HTTP(S) URL のパスとハッシュを保持してクエリを更新します。null または [] で削除、undefined で保持、配列で繰り返し値を置換します。他の繰り返し値は保持され、URLSearchParams によってエンコードは正規化されます。プレフィックス付きの既知ルートを検証する場合は { name, basePath: true } を指定します。名前付きパッチはクエリ型を使います。ランタイムスキーマがある場合は更新後のクエリ全体を検証し、型のみのスキーマでは実行時検証しません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```

<a id="helper-alternates"></a>

## route.alternates()

既存の pathnames、domains、パラメーター、クエリ設定からロケール別 URL マップを生成します。デフォルトはベースを含む絶対 URL です。非ローカライズルートまたは i18n なしの場合は空のマップです。hreflang や多言語サイトマップに使用し、動的パラメーターは実際の値を指定してください。slug は自動翻訳されません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.alternates("about");
// { en: "https://example.com/en/about", pt: "https://example.com/pt/sobre" }
```

<a id="helper-canonical"></a>

## route.canonical()

明示・固定・デフォルトのロケール（設定済みの場合）でメタデータ用の絶対 URL を生成します。ナビゲーションベースを含み、クエリとハッシュは明示された場合のみ追加します。正規コンテンツの判定やトラッキングパラメーターの自動削除は行いません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, {
  basePath: "/app", origin: "https://example.com",
  i18n: { locales: ["en", "pt"], defaultLocale: "en", pathnames: { "/about": { pt: "/sobre" } } },
});
urls.canonical("about", {}, { locale: "pt" });
// https://example.com/app/pt/sobre
```

<a id="helper-with-defaults"></a>

## route.withDefaults()

origin、basePath、assetBase、trailingSlash を上書きした独立ヘルパーを作成します。ルート、ロケール設定、固定ロケール、マニフェスト、スキーマは維持され、元のヘルパーは変更されません。任意の Host ヘッダーではなく信頼できるテナント設定を使用してください。戻り値の href 型は安全側の string です。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about" }, { origin: "https://example.com" });
const tenant = urls.withDefaults({
  origin: "https://tenant.example.com", basePath: "/dashboard",
  assetBase: "https://cdn.tenant.example.com",
});
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
urls.canonical("about"); // https://example.com/about
```

<a id="audit"></a>

## ルートとアセットの監査

利用プロジェクトで audit を実行すると、不明なルート・アセットのリテラル参照、大文字小文字の不一致、重複プレフィックス、ハードコードされたパスを検出します。ソースのみ走査し、生成物を除外してファイルを書き換えません。完全な構文解析ではなく保守的な字句監査のため、別名、複数行、動的 URL を見逃すことがあります。警告は確認してください。エラーは終了コード1、--strict は警告でも失敗、--json は機械可読診断を出力します。

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

<a id="helpers-playground"></a>

## ヘルパープレイグラウンド

/playground の URL ヘルパー実験室を開き、basePath、origin、CDN、ロケール、パス、クエリ、strict、version を変更してください。実際のランタイムと例示用メタデータを使用します。ブラウザーはローカルファイルを走査しません。プロジェクトでは CLI audit を使用してください。

---

← 前へ: [プロジェクト](project.md) · [README に戻る](../../README.ja.md)
