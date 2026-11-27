# 多言語リンク

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-i18n.md) · [Português](../pt/topic-nuxt-i18n.md) · [Español](../es/topic-nuxt-i18n.md) · [日本語](../ja/topic-nuxt-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-i18n"></a>

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

**ナビゲーションと i18n。** URL は NuxtLink の :to、navigateTo、useRouter().push で使います。@nuxtjs/i18n を使う場合は、ここでも同じ言語を設定してください。戦略 prefix_except_default は localePrefix の as-needed、prefix（または prefix_and_default）は always、no_prefix は never に対応します。すると route(name, params, { locale }) がローカライズされた URL を返し、locale を省くと localePath() に渡す内部パスが得られます。defineI18nRoute で翻訳したパスは i18n.pathnames にも書く必要があります。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

## 関連トピック

- [言語と i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.alternates()](topic-helper-alternates.md)

---

← 前へ: [公開アセット](topic-nuxt-assets.md) · [全トピック](framework-nuxt.md) · 次へ: [HTTP エンドポイント](topic-nuxt-endpoints.md) →
