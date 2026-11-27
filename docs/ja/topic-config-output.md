# 生成先と export

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-output.md) · [Português](../pt/topic-config-output.md) · [Español](../es/topic-config-output.md) · [日本語](../ja/topic-config-output.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-output"></a>

output はルートディレクトリ外の生成先です。exportNames と importSource で変更できます。hrefs: typed が既定です。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

## 関連トピック

- [生成マニフェストを読む](topic-generated-source.md)
- [Next.js の typedRoutes 向けの型付き href](topic-typed-hrefs.md)

---

← 前へ: [検出とディレクトリ](topic-config-discovery.md) · [全トピック](api-reference.md) · 次へ: [命名規則](topic-config-naming.md) →
