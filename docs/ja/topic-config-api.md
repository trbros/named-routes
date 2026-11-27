# API 検出の有効化

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-api.md) · [Português](../pt/topic-config-api.md) · [Español](../es/topic-config-api.md) · [日本語](../ja/topic-config-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-api"></a>

includeApi は既定で false です。静的に検出できるメソッドのみディスクリプターを生成します。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)

---

← 前へ: [明示ルートの追加](topic-config-extra-routes.md) · [全トピック](api-reference.md) · 次へ: [監視と開発オプション](topic-config-watch.md) →
