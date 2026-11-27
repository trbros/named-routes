# 多言語リンク

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-i18n.md) · [Português](../pt/topic-astro-i18n.md) · [Español](../es/topic-astro-i18n.md) · [日本語](../ja/topic-astro-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-i18n"></a>

named-routes.config で locales と pathnames を設定します。言語選択はフレームワークが担当します。公開 URL には locale 付き route.url を使い、プレフィックスを二重付与しないでください。

**i18n。** Astro の物理的な言語フォルダー（src/pages/pt/about.astro）は、その言語が i18n.locales にあれば src/pages/about.astro と同じ名前付きルートにまとめられます。prefixDefaultLocale: false は localePrefix の as-needed、true は always に対応します。

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

← 前へ: [公開アセット](topic-astro-assets.md) · [全トピック](framework-astro.md) · 次へ: [HTTP エンドポイント](topic-astro-endpoints.md) →
