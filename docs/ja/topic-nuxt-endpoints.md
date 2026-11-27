# HTTP エンドポイント

[ドキュメント](index.md) / [Nuxt](framework-nuxt.md)

[English](../en/topic-nuxt-endpoints.md) · [Português](../pt/topic-nuxt-endpoints.md) · [Español](../es/topic-nuxt-endpoints.md) · [日本語](../ja/topic-nuxt-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nuxt-endpoints"></a>

includeApi: true を有効にし、`server/api/admin.get.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

## 例

```ts
export default defineEventHandler(() => ({ ok: true }));
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [API 検出の有効化](topic-config-api.md)

---

← 前へ: [多言語リンク](topic-nuxt-i18n.md) · [全トピック](framework-nuxt.md)
