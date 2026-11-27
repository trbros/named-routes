# ファイル規則と検出

Topic: `astro-conventions` · Named Routes v2.2.0

`src/pages/users/[id].astro` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** .astro、.md、.mdx、.markdown、.html のページを含む src/pages。_ で始まるファイルやフォルダーはプライベート。[id]。[...slug] は 0 個以上のセグメントに一致（[[...slug]]）。[lang]-[version] のような混在セグメント。.ts/.js のエンドポイントは includeApi で有効になり、内側の拡張子を保ちます（api/data.json.ts は /api/data.json）。

**制限と検証。** 静的ビルドでは、動的ページに引き続き getStaticPaths が必要です。このパッケージは URL を作るだけで、パラメーターを列挙はしません。規約テストと、Astro 5 でビルド・実行できる examples/astro で検証しています。

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
