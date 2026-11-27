# 多言語リンク

Topic: `nuxt-i18n` · Named Routes v2.2.0

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

**ナビゲーションと i18n。** URL は NuxtLink の :to、navigateTo、useRouter().push で使います。@nuxtjs/i18n を使う場合は、ここでも同じ言語を設定してください。戦略 prefix_except_default は localePrefix の as-needed、prefix（または prefix_and_default）は always、no_prefix は never に対応します。すると route(name, params, { locale }) がローカライズされた URL を返し、locale を省くと localePath() に渡す内部パスが得られます。defineI18nRoute で翻訳したパスは i18n.pathnames にも書く必要があります。

## ベースパスなし

ブラウザーの URL: `/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /pt/users/42
```

## ベースパスあり

ブラウザーの URL: `/app/pt/users/42`。

```ts
// With i18n locales en, pt and localePrefix: "always"
route.url("users.$id", { params: { id: 42 }, locale: "pt" }); // /app/pt/users/42
```

Related topic IDs: i18n, helper-localize, helper-for-locale, helper-alternates
