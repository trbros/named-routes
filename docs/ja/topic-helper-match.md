# route.match()

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-helper-match.md) · [Português](../pt/topic-helper-match.md) · [Español](../es/topic-helper-match.md) · [日本語](../ja/topic-helper-match.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="helper-match"></a>

`route.match(url, options?)` は既知のパスを認識し、name、pattern、params、locale、生の query を含む判別可能な結果、または null を返します。base を含む入力には `{ basePath: true }` を使います。ルート名でパラメーター型を絞り込めます。スキーマによる変換には parseQuery を使います。認可には使えません。

<a id="without-base"></a>
## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

<a id="with-base"></a>
## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## 関連トピック

- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.parseQuery()](topic-helper-parse-query.md)

---

← 前へ: [逆引きルーティングとアクティブなルート](topic-reverse-routing.md) · [全トピック](route-helpers.md) · 次へ: [route.is()](topic-helper-is.md) →
