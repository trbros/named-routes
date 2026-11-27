# ファイル規則と検出

Topic: `nuxt-conventions` · Named Routes v2.2.0

`app/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** app/pages または pages: index.vue、[id]、オプションの [[id]]、[...slug]（空の残りにも一致するため [[...slug]] になる）、(group) フォルダー、v[major]-[minor] のような混在セグメント、ひとつのルートにまとめられる parent.vue + parent/ のネスト。- で始まるファイルは無視されます。includeApi を有効にすると、server/api（/api 付き）と server/routes を読み取り、.get/.post の接尾辞を取り除きます。

**制限と検証。** モジュールは .nuxt/named-routes/pages.json も書き出すため、nuxt prepare の後は named-routes check や generate も同じルートを見ます。ルートがローカライズされる前に見えるよう、modules では @nuxtjs/i18n より前に置いてください。Nuxt でも Vite プラグインは動きますが、ファイルしか見えません。名前はこのパッケージのドット区切り（users.$id）で、Nuxt 自身のルート名（users-id）ではありません。規約テストと、Nuxt 4 でビルドして実行する examples/nuxt（definePageMeta({ path }) のページを含む）で検証しています。

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
