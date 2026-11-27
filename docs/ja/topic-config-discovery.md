# 検出とディレクトリ

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-discovery.md) · [Português](../pt/topic-config-discovery.md) · [Español](../es/topic-config-discovery.md) · [日本語](../ja/topic-config-discovery.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-discovery"></a>

framework: auto または明示指定を使います。discovery: files はファイルスキャンを強制します。Next の appDir/pagesDir、他の routesDir、pageExtensions、exclude で調整できます。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

## 関連トピック

- [検出のエッジケース](topic-discovery.md)
- [生成の仕組み](topic-architecture.md)
- [自動命名のルール](topic-naming.md)

---

← 前へ: [ジェネレーターの設定](topic-configuration.md) · [全トピック](api-reference.md) · 次へ: [生成先と export](topic-config-output.md) →
