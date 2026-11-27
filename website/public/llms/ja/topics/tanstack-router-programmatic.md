# ナビゲーション — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

ページ全体の遷移用です。SPA では TanStack の型付き navigate/Link に固有 ID と params を渡します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
