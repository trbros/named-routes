# ナビゲーション — Astro.redirect()

Topic: `astro-programmatic` · Named Routes v2.2.0

SSR ページの frontmatter で公開 URL を Astro.redirect に渡します。静的出力ではリダイレクトの動作が異なります。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

Related topic IDs: astro-navigation, astro-deployment, public-url
