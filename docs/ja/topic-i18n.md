# 言語と i18n

[ドキュメント](index.md) / [国際化](internationalization.md)

[English](../en/topic-i18n.md) · [Português](../pt/topic-i18n.md) · [Español](../es/topic-i18n.md) · [日本語](../ja/topic-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="i18n"></a>

i18n は locales と defaultLocale、必要に応じて localePrefix、pathnames、domains で設定します。形は next-intl の defineRouting() と同じなので、その routing オブジェクトをそのまま渡せます。localeCookie のような next-intl 専用のキーは受け付けたうえで無視します。Next.js の Pages Router のプロジェクトでは、withNamedRoutes が next.config の i18n を自動で引き継ぎます（localePrefix は as-needed、domains も含む）。

locale または lang という名前の最初の動的フォルダー（app/[locale]/…、pages/[lang]/…。localeParam で変更可能）は、名前とパターンから取り除かれます。app/[locale]/about/page.tsx は about → /about になります。物理的な言語フォルダー（src/pages/pt/about.astro）は同じルートにまとめられます。言語フォルダーがない場合（Pages Router の i18n、@nuxtjs/i18n、ミドルウェアのリライト）は、すべてのページがローカライズ対象です。エンドポイントと [locale] の外にあるルートは unlocalized として扱われ、プレフィックスは付きません。

locale なしの route(name, params) は内部パスを返します。これは next-intl の Link、Pages Router の Link、@nuxtjs/i18n の localePath が期待する形です。通常のリンク、リダイレクト、サイトマップ、メール、言語切り替えには { locale } を渡してください。route.forLocale(locale) はその言語に固定したヘルパーを返し、route.locales() は設定済みの言語を一覧にします。

localePrefix: always（デフォルト）はすべての言語にプレフィックスを付け、as-needed はデフォルト言語だけ省き、never はすべて省きます。{ mode, prefixes: { "en-US": "/us" } } で個別に変更することもできます。pathnames は内部パターンを、同じパラメーターを持つ翻訳済みのパターンに対応付けます。absolute: true のとき、設定したドメインで配信される言語ではそのドメインがオリジンになります。言語は型付きで、生成モジュールは RouteLocale をエクスポートし、未知の言語は型エラーにも実行時エラーにもなります。

**受信 URL の翻訳。** /sobre が /about のポルトガル語パスで localePrefix が always の場合、route.localize('/sobre', 'en') は /en/about を返します。route.localize('/pt/produtos/42?tab=info#details', 'en') は /en/products/42?tab=info#details を返せます。すべての設定言語を検索し、パラメーター、元のクエリとフラグメントを保持します。不明、曖昧、非ローカライズのルートは null になります。route.match() の動作は変わりません。認識済みの元言語プレフィックス、またはプレフィックスなしの別名に対する sourceLocale で同じ具体性の候補を区別します。対象言語を省略すると forLocale() の言語または既定言語を使います。

**リクエストのリダイレクト。** ランタイムはリクエストを横取りしません。既存の i18n ミドルウェアで優先言語を決め、ベースを含む公開 URL には route.localize(pathAndQuery, locale, { basePath: true }) を呼び出し、結果が異なるときだけ一時リダイレクトします。内部 rewrite はフレームワークに任せます。内部パスから公開パスを生成する場合は includeBasePath: true を使います。言語別ドメインでは absolute: true と設定済みドメインを使い、URL 全体を比較します。API、アセット、GET/HEAD 以外、解決できないパスはリダイレクトしません。Next.js proxy の例は examples/app-router/recipes/localized-redirect.ts.example にあります。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});
```

## 関連トピック

- [言語別 URL の生成](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.locales()](topic-helper-locales.md)
- [route.alternates()](topic-helper-alternates.md)

---

[全トピック](internationalization.md) · 次へ: [言語別 URL の生成](topic-localized-url.md) →
