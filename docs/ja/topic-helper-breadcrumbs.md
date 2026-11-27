# route.breadcrumbs()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-breadcrumbs.md) · [Português](../pt/topic-helper-breadcrumbs.md) · [Español](../es/topic-helper-breadcrumbs.md) · [日本語](../ja/topic-helper-breadcrumbs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-breadcrumbs"></a>

`route.breadcrumbs(url, options?)` は既知の祖先パスの一致をルートから末端の順に返します。存在しないルートや表示ラベルは作りません。名前を翻訳済みラベルに対応させてください。ベース付き URL には `{ basePath: true }` を指定します。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

## 関連トピック

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)

---

← 前へ: [route.is()](topic-helper-is.md) · [全トピック](route-helpers.md) · 次へ: [route.has()](topic-helper-has.md) →
