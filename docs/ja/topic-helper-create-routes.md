# createRoutes()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-create-routes.md) · [Português](../pt/topic-helper-create-routes.md) · [Español](../es/topic-helper-create-routes.md) · [日本語](../ja/topic-helper-create-routes.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-create-routes"></a>

名前とパターンのマニフェストから独立したヘルパーを作ります。リテラル型を維持すると補完できます。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

## 関連トピック

- [手動ルート（React、Vue、任意のルーター）](topic-manual-routes.md)
- [route()](topic-helper-route.md)
- [route.withDefaults()](topic-helper-with-defaults.md)

---

← 前へ: [route.pattern()](topic-helper-pattern.md) · [全トピック](route-helpers.md) · 次へ: [route.withDefaults()](topic-helper-with-defaults.md) →
