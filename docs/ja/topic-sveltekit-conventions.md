# ファイル規則と検出

[ドキュメント](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-conventions.md) · [Português](../pt/topic-sveltekit-conventions.md) · [Español](../es/topic-sveltekit-conventions.md) · [日本語](../ja/topic-sveltekit-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-conventions"></a>

`src/routes/users/[id]/+page.svelte` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** +page.svelte、+page.ts、+page.server.ts を含む src/routes（ひとつのルートにまとめられる）。(group) フォルダーは省かれ、[id=matcher] はパラメーターを残して matcher を捨て、[[lang]] はオプション、[...rest] は 0 個以上のセグメントに一致し（[[...rest]]）、静的セグメントの前にも置けます。+page@ のレイアウトリセットも通常のページとして扱い、[x+2f] や [u+0041] のエスケープはデコードされます。+server エンドポイントは includeApi で有効にできます。

**検証。** 規約テストと examples/sveltekit の統合テストはルート検出とナビゲーションを対象とします。現在の例は SvelteKit 3 と Svelte 5 を使用します。

## 例

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

## 関連トピック

- [自動命名のルール](topic-naming.md)
- [意味的なルート名とグループ](topic-semantic-names.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [SvelteKit: セットアップ](topic-sveltekit.md) · [全トピック](framework-sveltekit.md) · 次へ: [リンクとナビゲーション](topic-sveltekit-navigation.md) →
