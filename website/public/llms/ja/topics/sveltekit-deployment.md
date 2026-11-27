# ベースパスとデプロイ

Topic: `sveltekit-deployment` · Named Routes v2.2.0

SvelteKit で `paths.base` を設定します。route() はベースを含みます。

namedRoutes({ routerBase: "/app" }) に同じプレフィックスを設定します。Vite base がルーターのベースと同じ場合のみ inheritViteBase: true を使用できます。

SvelteKit 2 では svelte.config.js の kit.paths.base を共有します。セットアップ例は SvelteKit 3 用です。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
