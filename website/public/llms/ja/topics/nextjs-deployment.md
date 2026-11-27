# ベースパスとデプロイ

Topic: `nextjs-deployment` · Named Routes v2.2.0

Next.js で `basePath` を設定します。route() は内部パスを返し、route.url() は公開パスを返します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$user", { user: 42 }); // /users/42
route.url("users.$user", { params: { user: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
