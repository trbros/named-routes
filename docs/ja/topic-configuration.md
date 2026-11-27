# ジェネレーターの設定

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-configuration.md) · [Português](../pt/topic-configuration.md) · [Español](../es/topic-configuration.md) · [日本語](../ja/topic-configuration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="configuration"></a>

設定ファイルは任意です。必要な設定のみ追加します。.ts、.mts、.mjs、.js、.cjs、.json の順に検出します。TypeScript 非対応時は .mjs を使い、--config で別ファイルを指定できます。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

## 関連トピック

- [検出とディレクトリ](topic-config-discovery.md)
- [生成先と export](topic-config-output.md)
- [命名規則](topic-config-naming.md)
- [URL の既定値](topic-config-defaults.md)
- [API 検出の有効化](topic-config-api.md)
- [明示ルートの追加](topic-config-extra-routes.md)

---

← 前へ: [ランタイム API リファレンス](topic-runtime-api.md) · [全トピック](api-reference.md) · 次へ: [検出とディレクトリ](topic-config-discovery.md) →
