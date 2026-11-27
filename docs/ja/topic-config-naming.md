# 命名規則

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-naming.md) · [Português](../pt/topic-config-naming.md) · [Español](../es/topic-config-naming.md) · [日本語](../ja/topic-config-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-naming"></a>

naming.style、separator、paramPrefix、home を指定できます。transform は自動名を変更でき、names が優先します。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## 関連トピック

- [意味的なルート名とグループ](topic-semantic-names.md)
- [固定名（任意）](topic-stable-names.md)
- [自動命名のルール](topic-naming.md)

---

← 前へ: [生成先と export](topic-config-output.md) · [全トピック](api-reference.md) · 次へ: [URL の既定値](topic-config-defaults.md) →
