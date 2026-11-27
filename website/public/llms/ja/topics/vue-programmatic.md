# ナビゲーション — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
