# ファイル規則と検出

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-conventions.md) · [Português](../pt/topic-astro-conventions.md) · [Español](../es/topic-astro-conventions.md) · [日本語](../ja/topic-astro-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-conventions"></a>

`src/pages/users/[id].astro` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** .astro、.md、.mdx、.markdown、.html のページを含む src/pages。_ で始まるファイルやフォルダーはプライベート。[id]。[...slug] は 0 個以上のセグメントに一致（[[...slug]]）。[lang]-[version] のような混在セグメント。.ts/.js のエンドポイントは includeApi で有効になり、内側の拡張子を保ちます（api/data.json.ts は /api/data.json）。

**制限と検証。** 静的ビルドでは、動的ページに引き続き getStaticPaths が必要です。このパッケージは URL を作るだけで、パラメーターを列挙はしません。規約テストと、Astro 5 でビルド・実行できる examples/astro で検証しています。

## 例

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [Astro: セットアップ](topic-astro.md) · [全トピック](framework-astro.md) · 次へ: [リンクとナビゲーション](topic-astro-navigation.md) →
