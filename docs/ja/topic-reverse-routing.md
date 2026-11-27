# 逆引きルーティングとアクティブなルート

[ドキュメント](index.md) / [ルートリファレンスと検査](route-helpers.md)

[English](../en/topic-reverse-routing.md) · [Português](../pt/topic-reverse-routing.md) · [Español](../es/topic-reverse-routing.md) · [日本語](../ja/topic-reverse-routing.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="reverse-routing"></a>

route.match(url) は、パスが指す名前付きルートを、デコード済みの params、クエリ（繰り返されたキーは配列になる）、hash、言語とともに返し、該当しなければ null を返します。/users/42?tab=posts#bio のようなルート相対パスか URL オブジェクトを受け付けます。絶対 URL は、設定した origin か i18n のドメインのときだけ一致します。route.is(name, url) は URL とルートを比較し、{ exact: false } にすると子孫のパスも一致とみなすので、ナビゲーションのアクティブなセクションに使えます。route.breadcrumbs(url) は祖先のパスそれぞれの一致結果を返します。

静的なセグメントが最優先で、次に混在、動的、オプション、catch-all、オプションの catch-all の順に、左から右へ比較します。同じだけ具体的なパターンは宣言順で決まります。セグメントはデコードする前に分割するので、%2F はパラメーターの中にとどまります。不正なパーセントエンコーディング、空のセグメント、相対 URL やプロトコル相対 URL は null になります。URL に basePath が含まれる場合（window.location.pathname）は { basePath: true } を渡してください。言語のプレフィックス、カスタムのプレフィックス、翻訳されたパス名も認識します。

一致の判定はルートの表を表すだけです。認可ではなく、リソースの存在や遷移の成功を保証するものでもなく、フレームワークのルーターの代わりにもなりません。クエリは文字列で返されるので、自分のスキーマで解析してください（たとえば型変換付きの schema.parse(found.query)）。

## 例

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

## 関連トピック

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

[全トピック](route-helpers.md) · 次へ: [route.match()](topic-helper-match.md) →
