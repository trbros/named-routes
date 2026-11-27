# HTTP エンドポイント

Topic: `nuxt-endpoints` · Named Routes v2.2.0

includeApi: true を有効にし、`server/api/admin.get.ts` を作成します。明示的に検出できるメソッドのみ生成されます。通信には fetch または既存の HTTP クライアントを使います。

```ts
export default defineEventHandler(() => ({ ok: true }));
```

Related topic IDs: endpoint-methods, helper-endpoint, config-api
