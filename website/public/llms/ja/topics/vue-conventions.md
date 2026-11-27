# ファイル規則と検出

Topic: `vue-conventions` · Named Routes v2.2.0

`src/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** index.vue と (name).vue はインデックスルート。ドットでネスト（users.edit.vue は /users/edit）。[id] と [[id]]。[id]+ は 1 個以上の繰り返しパラメーター（[...id]）、[[id]]+ は 0 個以上（[[...id]]）。[...path] は空の残りにも一致（[[...path]]）。(group) フォルダーは省かれ、parent.vue + parent/ のネストはまとめられ、v[major]-[minor] のような混在セグメントも使えます。

**検証済み。** 名前は Vue Router 5 が書き出す typed-router.d.ts（dts オプション）から取るため、definePage({ path }) で上書きしたルートは実際に配信する URL で名前が付きます。このファイルができるまではファイルを走査します。これらの規約を使う実際の Vite 開発サーバーを CI で動かし、examples/vue を Vue Router 5（vue-router/vite）でビルド・実行してブラウザーで操作しています。users/_parent.vue のレイアウトと definePage({ path }) のページも含みます。

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
