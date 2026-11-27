# ルートリファレンスと検査

# 逆引きルーティングとアクティブなルート

Topic: `reverse-routing` · Named Routes v2.2.0

route.match(url) は、パスが指す名前付きルートを、デコード済みの params、クエリ（繰り返されたキーは配列になる）、hash、言語とともに返し、該当しなければ null を返します。/users/42?tab=posts#bio のようなルート相対パスか URL オブジェクトを受け付けます。絶対 URL は、設定した origin か i18n のドメインのときだけ一致します。route.is(name, url) は URL とルートを比較し、{ exact: false } にすると子孫のパスも一致とみなすので、ナビゲーションのアクティブなセクションに使えます。route.breadcrumbs(url) は祖先のパスそれぞれの一致結果を返します。

静的なセグメントが最優先で、次に混在、動的、オプション、catch-all、オプションの catch-all の順に、左から右へ比較します。同じだけ具体的なパターンは宣言順で決まります。セグメントはデコードする前に分割するので、%2F はパラメーターの中にとどまります。不正なパーセントエンコーディング、空のセグメント、相対 URL やプロトコル相対 URL は null になります。URL に basePath が含まれる場合（window.location.pathname）は { basePath: true } を渡してください。言語のプレフィックス、カスタムのプレフィックス、翻訳されたパス名も認識します。

一致の判定はルートの表を表すだけです。認可ではなく、リソースの存在や遷移の成功を保証するものでもなく、フレームワークのルーターの代わりにもなりません。クエリは文字列で返されるので、自分のスキーマで解析してください（たとえば型変換付きの schema.parse(found.query)）。

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

Related topic IDs: helper-match, helper-is, helper-breadcrumbs
---

# route.match()

Topic: `helper-match` · Named Routes v2.2.0

`route.match(url, options?)` は既知のパスを認識し、name、pattern、params、locale、生の query を含む判別可能な結果、または null を返します。base を含む入力には `{ basePath: true }` を使います。ルート名でパラメーター型を絞り込めます。スキーマによる変換には parseQuery を使います。認可には使えません。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

const found = route.match("/users/42?tab=posts");
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

const found = route.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") console.log(found.params.id); // "42"
```

Related topic IDs: helper-is, helper-breadcrumbs, helper-parse-query
---

# route.is()

Topic: `helper-is` · Named Routes v2.2.0

`route.is(name, url, options?)` は URL が名前付きルートに一致するか調べます。子孫を含めるには `exact: false`、ベース付き公開 URL には `{ basePath: true }` を指定します。アクティブメニュー用であり、アクセス制御用ではありません。未知の名前は拒否されます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.is("users.show", "/users/42"); // true
route.is("users", "/users/42", { exact: false }); // true
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.is("users.show", "/app/users/42", { basePath: true }); // true
route.is("users", "/app/users/42", { basePath: true, exact: false }); // true
```

Related topic IDs: helper-match, helper-breadcrumbs
---

# route.breadcrumbs()

Topic: `helper-breadcrumbs` · Named Routes v2.2.0

`route.breadcrumbs(url, options?)` は既知の祖先パスの一致をルートから末端の順に返します。存在しないルートや表示ラベルは作りません。名前を翻訳済みラベルに対応させてください。ベース付き URL には `{ basePath: true }` を指定します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });

route.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" }, { basePath: "/app" });

route.breadcrumbs("/app/users/42", { basePath: true }).map((item) => item.name);
// ["home", "users", "users.show"]
```

Related topic IDs: helper-match, helper-is
---

# route.has()

Topic: `helper-has` · Named Routes v2.2.0

`route.has(name)` はマニフェストを調べ、任意の文字列を有効なルート名に絞り込みます。サーバーが現在そのルートを配信しているかは確認しません。外部入力から選んだ名前を使う前に利用します。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

Related topic IDs: helper-names, helper-pattern
---

# route.names()

Topic: `helper-names` · Named Routes v2.2.0

`route.names()` は既知の名前を型付き配列で返します。デバッグや開発ツールに使えますが、権限や各ルートへのアクセス可能性は示しません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

Related topic IDs: helper-has, helper-pattern
---

# route.pattern()

Topic: `helper-pattern` · Named Routes v2.2.0

`route.pattern(name, locale?)` は生成済み URL ではなくテンプレートを返します。ロケールを指定すると設定済みの翻訳テンプレートを返します。パラメーター置換やプレフィックス追加は行いません。URL の生成には route() を使います。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.pattern("posts.show"); // /posts/[id]
urls.pattern("posts.show", "pt"); // /artigos/[id]
urls("posts.show", { id: 42 }, { locale: "pt" }); // /pt/artigos/42
```

Related topic IDs: helper-parse-pattern, helper-format-pattern
---

# createRoutes()

Topic: `helper-create-routes` · Named Routes v2.2.0

名前とパターンのマニフェストから独立したヘルパーを作ります。リテラル型を維持すると補完できます。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });
route("users.show", { id: 42 }); // /users/42
```

Related topic IDs: manual-routes, helper-route, helper-with-defaults
---

# route.withDefaults()

Topic: `helper-with-defaults` · Named Routes v2.2.0

origin、basePath、assetBase、trailingSlash を上書きした独立ヘルパーを作成します。ルート、ロケール設定、固定ロケール、マニフェスト、スキーマは維持され、元のヘルパーは変更されません。任意の Host ヘッダーではなく信頼できるテナント設定を使用してください。戻り値の href 型は安全側の string です。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });

const tenant = route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard", assetBase: "https://cdn.tenant.example.com" });
tenant.canonical("about"); // https://tenant.example.com/dashboard/about
tenant.asset("logo.svg"); // https://cdn.tenant.example.com/logo.svg
route.canonical("about"); // https://example.com/about
```

Related topic IDs: base-path, absolute-urls, helper-create-routes
---

# parsePattern()

Topic: `helper-parse-pattern` · Named Routes v2.2.0

パターンを検証しセグメントに変換します。ツール向けの関数です。

```ts
import { parsePattern } from "@triooo/named-routes";
const segments = parsePattern("/users/[id]");
console.log(segments.map((segment) => segment.kind)); // ["static", "dynamic"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# formatPattern()

Topic: `helper-format-pattern` · Named Routes v2.2.0

セグメントを正規のブラケット構文に戻します。具体的な URL ではありません。

```ts
import { formatPattern, parsePattern } from "@triooo/named-routes";
formatPattern(parsePattern("/users/[id]")); // /users/[id]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
---

# patternParameters()

Topic: `helper-pattern-parameters` · Named Routes v2.2.0

解析済みセグメントからパラメータ名を列挙します。

```ts
import { parsePattern, patternParameters } from "@triooo/named-routes";
patternParameters(parsePattern("/users/[id]")); // ["id"]
```

Related topic IDs: helper-create-routes, parameters, helper-pattern
