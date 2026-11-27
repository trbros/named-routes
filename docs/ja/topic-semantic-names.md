# 意味的なルート名とグループ

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-semantic-names.md) · [Português](../pt/topic-semantic-names.md) · [Español](../es/topic-semantic-names.md) · [日本語](../ja/topic-semantic-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="semantic-names"></a>

naming.style を semantic にすると親ページに index、末尾必須パラメータに show を使用します。既定の命名は維持されます。names で安定した任意の名前を指定できます。衝突はエラーになります。

## 例

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## 関連トピック

- [固定名（任意）](topic-stable-names.md)
- [自動命名のルール](topic-naming.md)
- [命名規則](topic-config-naming.md)
- [生成マニフェストを読む](topic-generated-source.md)

---

← 前へ: [末尾スラッシュ](topic-trailing-slash.md) · [全トピック](build-with-routes.md) · 次へ: [固定名（任意）](topic-stable-names.md) →
