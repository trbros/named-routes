# 明示ルートの追加

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-extra-routes.md) · [Português](../pt/topic-config-extra-routes.md) · [Español](../es/topic-config-extra-routes.md) · [日本語](../ja/topic-config-extra-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-extra-routes"></a>

extraRoutes は検出不要の明示的な名前とパターンを指定します。ページやサーバールートは作成しません。

## 例

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

## 関連トピック

- [固定名（任意）](topic-stable-names.md)
- [手動ルート（React、Vue、任意のルーター）](topic-manual-routes.md)
- [リライトと境界](topic-boundaries.md)

---

← 前へ: [URL の既定値](topic-config-defaults.md) · [全トピック](api-reference.md) · 次へ: [API 検出の有効化](topic-config-api.md) →
