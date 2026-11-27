# 言語別 URL の生成

[ドキュメント](index.md) / [国際化](internationalization.md)

[English](../en/topic-localized-url.md) · [Português](../pt/topic-localized-url.md) · [Español](../es/topic-localized-url.md) · [日本語](../ja/topic-localized-url.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="localized-url"></a>

i18n の設定後、locale で翻訳済みパスとプレフィックスを選びます。動的 slug の値自体は翻訳しません。

## 例

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

## 関連トピック

- [言語と i18n](topic-i18n.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)

---

← 前へ: [言語と i18n](topic-i18n.md) · [全トピック](internationalization.md) · 次へ: [route.localize()](topic-helper-localize.md) →
