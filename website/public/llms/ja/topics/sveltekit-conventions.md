# ファイル規則と検出

Topic: `sveltekit-conventions` · Named Routes v2.2.0

`src/routes/users/[id]/+page.svelte` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** +page.svelte、+page.ts、+page.server.ts を含む src/routes（ひとつのルートにまとめられる）。(group) フォルダーは省かれ、[id=matcher] はパラメーターを残して matcher を捨て、[[lang]] はオプション、[...rest] は 0 個以上のセグメントに一致し（[[...rest]]）、静的セグメントの前にも置けます。+page@ のレイアウトリセットも通常のページとして扱い、[x+2f] や [u+0041] のエスケープはデコードされます。+server エンドポイントは includeApi で有効にできます。

**検証。** 規約テストと examples/sveltekit の統合テストはルート検出とナビゲーションを対象とします。現在の例は SvelteKit 3 と Svelte 5 を使用します。

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
