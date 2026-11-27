# ファイル規則と検出

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-conventions.md) · [Português](../pt/topic-nextjs-conventions.md) · [Español](../es/topic-nextjs-conventions.md) · [日本語](../ja/topic-nextjs-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-conventions"></a>

`app/users/[user]/page.tsx` を作成すると、パス命名モードで `users.$user` が生成されます。ページの描画はフレームワークが行います。

**規約。** app/ と pages/（または src/app と src/pages）を合わせて読み取ります。App Router: page ファイルのみ。ルートグループと並列スロットは省かれ、インターセプトは正規の URL に解決され、_ で始まるプライベートフォルダーは無視され、%5F はアンダースコアになります。Pages Router: index は取り除かれ、_app、_document、_error は対象外です。Route Handlers と pages/api は includeApi で有効にできます。appDir と pagesDir で独自のフォルダーを指定できます（片方を false にすると読み取りません）。

**検証。** CI では実際の Next 16 開発サーバー（App Router と Pages Router、basePath とページのライブ検出を含む）を動かしています。デモ: examples/app-router と examples/pages-router。App Router と Pages Router のレシピもあわせて参照してください。

## 例

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [Next.js: セットアップ](topic-nextjs.md) · [全トピック](framework-nextjs.md) · 次へ: [リンクとナビゲーション](topic-nextjs-navigation.md) →
