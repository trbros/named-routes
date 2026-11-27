# ファイル規則と検出

[ドキュメント](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-conventions.md) · [Português](../pt/topic-vue-conventions.md) · [Español](../es/topic-vue-conventions.md) · [日本語](../ja/topic-vue-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-conventions"></a>

`src/pages/users/[id].vue` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** index.vue と (name).vue はインデックスルート。ドットでネスト（users.edit.vue は /users/edit）。[id] と [[id]]。[id]+ は 1 個以上の繰り返しパラメーター（[...id]）、[[id]]+ は 0 個以上（[[...id]]）。[...path] は空の残りにも一致（[[...path]]）。(group) フォルダーは省かれ、parent.vue + parent/ のネストはまとめられ、v[major]-[minor] のような混在セグメントも使えます。

**検証済み。** 名前は Vue Router 5 が書き出す typed-router.d.ts（dts オプション）から取るため、definePage({ path }) で上書きしたルートは実際に配信する URL で名前が付きます。このファイルができるまではファイルを走査します。これらの規約を使う実際の Vite 開発サーバーを CI で動かし、examples/vue を Vue Router 5（vue-router/vite）でビルド・実行してブラウザーで操作しています。users/_parent.vue のレイアウトと definePage({ path }) のページも含みます。

## 例

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [Vue Router: セットアップ](topic-vue.md) · [全トピック](framework-vue.md) · 次へ: [リンクとナビゲーション](topic-vue-navigation.md) →
