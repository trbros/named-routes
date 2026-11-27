# ファイル規則と検出

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

`src/routes/users/$id.tsx` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** __root はスキップ。index と route.tsx はそのフォルダーのルート。フラットなファイル（posts.$postId.tsx）とフォルダーを併用できる。$param。{-$locale} はオプション（[[locale]]）。prefix{$id}suffix は混在セグメントになる。単独の $ は _splat という名前の splat（[[..._splat]]）。_layout はパスなし。posts_ はネストを解除。- で始まるファイルと (group) フォルダーは無視され、.lazy ファイルは同じルートに属します。

**検証済み。** 名前は TanStack Router のプラグインまたは CLI が生成する routeTree.gen.ts（遷移可能なパス）から取ります。このファイルができるまではファイルを走査します。規約テストと、TanStack Router プラグインでビルドして実行する examples/tanstack-router で検証しています。

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
