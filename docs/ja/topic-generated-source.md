# 生成マニフェストを読む

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-generated-source.md) · [Português](../pt/topic-generated-source.md) · [Español](../es/topic-generated-source.md) · [日本語](../ja/topic-generated-source.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generated-source"></a>

各エントリに相対ファイルパスを表示します。通常のキーは文字列リテラルで、__proto__ は安全のため計算キーのままです。生成ファイルは直接編集しないでください。

## 例

```ts
export const routes = Object.freeze({
  "admin.index": "/admin", // app/admin/page.tsx
  "admin.alunos.show": "/admin/alunos/[aluno]", // app/admin/alunos/[aluno]/page.tsx
} as const);
```

---

← 前へ: [自動命名のルール](topic-naming.md) · [全トピック](getting-started.md) · 次へ: [ほかの選択肢との比較](topic-comparison.md) →
