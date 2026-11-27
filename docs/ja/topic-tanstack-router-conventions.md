# ファイル規則と検出

[ドキュメント](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-conventions.md) · [Português](../pt/topic-tanstack-router-conventions.md) · [Español](../es/topic-tanstack-router-conventions.md) · [日本語](../ja/topic-tanstack-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-conventions"></a>

`src/routes/users/$id.tsx` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** __root はスキップ。index と route.tsx はそのフォルダーのルート。フラットなファイル（posts.$postId.tsx）とフォルダーを併用できる。$param。{-$locale} はオプション（[[locale]]）。prefix{$id}suffix は混在セグメントになる。単独の $ は _splat という名前の splat（[[..._splat]]）。_layout はパスなし。posts_ はネストを解除。- で始まるファイルと (group) フォルダーは無視され、.lazy ファイルは同じルートに属します。

**検証済み。** 名前は TanStack Router のプラグインまたは CLI が生成する routeTree.gen.ts（遷移可能なパス）から取ります。このファイルができるまではファイルを走査します。規約テストと、TanStack Router プラグインでビルドして実行する examples/tanstack-router で検証しています。

## 例

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [TanStack Router: セットアップ](topic-tanstack-router.md) · [全トピック](framework-tanstack-router.md) · 次へ: [リンクとナビゲーション](topic-tanstack-router-navigation.md) →
