# 言語別 URL の生成

Topic: `localized-url` · Named Routes v2.2.0

i18n の設定後、locale で翻訳済みパスとプレフィックスを選びます。動的 slug の値自体は翻訳しません。

```ts
route.url("about", { locale: "pt" }); // /pt/sobre (always prefix, no base)
```

Related topic IDs: i18n, helper-localize, helper-for-locale
