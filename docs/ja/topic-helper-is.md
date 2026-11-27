# route.is()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-is.md) · [Português](../pt/topic-helper-is.md) · [Español](../es/topic-helper-is.md) · [日本語](../ja/topic-helper-is.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-is"></a>

`route.is(name, url, options?)` は URL が名前付きルートに一致するか調べます。子孫を含めるには `exact: false`、ベース付き公開 URL には `{ basePath: true }` を指定します。アクティブメニュー用であり、アクセス制御用ではありません。未知の名前は拒否されます。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

## 関連トピック

- [route.match()](topic-helper-match.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

← 前へ: [route.match()](topic-helper-match.md) · [全トピック](route-helpers.md) · 次へ: [route.breadcrumbs()](topic-helper-breadcrumbs.md) →
