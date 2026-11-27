# HTTP エンドポイント

[ドキュメント](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-endpoints.md) · [Português](../pt/topic-nextjs-endpoints.md) · [Español](../es/topic-nextjs-endpoints.md) · [日本語](../ja/topic-nextjs-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-endpoints"></a>

includeApi: true を有効にし、`app/api/admin/route.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

## 例

```ts
export function GET() {
  return Response.json({ ok: true });
}
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [API 検出の有効化](topic-config-api.md)

---

← 前へ: [多言語リンク](topic-nextjs-i18n.md) · [全トピック](framework-nextjs.md) · 次へ: [App Router のレシピ](topic-app-router.md) →
