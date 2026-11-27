# 多言語リンク

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-i18n.md) · [Português](../pt/topic-tanstack-router-i18n.md) · [Español](../es/topic-tanstack-router-i18n.md) · [日本語](../ja/topic-tanstack-router-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-i18n"></a>

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

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

← 前へ: [公開アセット](topic-tanstack-router-assets.md) · [全トピック](framework-tanstack-router.md) · 次へ: [HTTP の境界](topic-tanstack-router-endpoints.md) →
