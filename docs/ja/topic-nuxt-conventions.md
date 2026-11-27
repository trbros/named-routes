# ファイル規則と検出

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-conventions.md) · [Português](../pt/topic-nuxt-conventions.md) · [Español](../es/topic-nuxt-conventions.md) · [日本語](../ja/topic-nuxt-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-conventions"></a>

`app/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** app/pages または pages: index.vue、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、v[major]-[minor] のような混在セグメント、ひとつのルートにまとめられる parent.vue + parent/ のネスト。- で始まるファイルは無視されます。includeApi を有効にすると、server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

**制限と検証。** モジュールは .nuxt/named-routes/pages.json も書き出すため、nuxt prepare の後は named-routes check や generate も同じルートを見ます。ルートがローカライズされる前に見えるよう、modules では @nuxtjs/i18n より前に置いてください。Nuxt でも Vite プラグインは動きますが、ファイルしか見えません。名前はこのパッケージのドット区切り（users.$id）で、Nuxt 自身のルート名（users-id）ではありません。規約テストと、Nuxt 4 でビルドして実行する examples/nuxt（definePageMeta({ path }) のページを含む）で検証しています。

## 例

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [Nuxt: セットアップ](topic-nuxt.md) · [全トピック](framework-nuxt.md) · 次へ: [リンクとナビゲーション](topic-nuxt-navigation.md) →
