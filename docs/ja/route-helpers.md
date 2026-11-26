# ルートヘルパー · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/route-helpers.md) · [Português](../pt/route-helpers.md) · [Español](../es/route-helpers.md) · [日本語](../ja/route-helpers.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [route()](#helper-route)
- [route.localize()](#helper-localize)
- [route.match()](#helper-match)
- [route.parseQuery()](#helper-parse-query)
- [route.is()](#helper-is)
- [route.breadcrumbs()](#helper-breadcrumbs)
- [route.has()](#helper-has)
- [route.names()](#helper-names)
- [route.pattern()](#helper-pattern)
- [route.locales()](#helper-locales)
- [route.forLocale()](#helper-for-locale)

<a id="helper-route"></a>

## route()

`route(name, params?, options?)` は名前付き URL を生成します。名前と必須パラメーターは型付けされます。デフォルトではナビゲーションのベースとロケールを省略します。通常のリンクや fetch、外部 URL にはオプションを指定します。絶対 URL には origin が必要です。不正な名前やパラメーターは NamedRouteError になります。ナビゲーション自体は行いません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, {
  basePath: "/app", origin: "https://example.com",
});
urls("home"); // /
urls("users.show", { id: 42 }); // /users/42
urls("users.show", { id: 42 }, { basePath: true, query: { tab: "posts" }, hash: "bio" });
// /app/users/42?tab=posts#bio
urls("users.show", { id: 42 }, { absolute: true });
// https://example.com/app/users/42
```

<a id="helper-localize"></a>

## route.localize()

`route.localize(url, locale?, options?)` はルート表を使い既存 URL を翻訳し、クエリとフラグメントを保持します。言語切り替えやリダイレクトに使えます。曖昧でないローカライズ済みルートがなければ null を返します。basePath を含む公開 URL には `{ basePath: true }` を指定し、必要なら `sourceLocale` でプレフィックスのないパスを区別します。動的な slug の値の翻訳や訪問者の言語検出は行いません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.localize("/sobre", "en"); // /en/about
urls.localize("/pt/artigos/42?tab=comments#top", "en");
// /en/posts/42?tab=comments#top
urls.localize("/missing", "en"); // null
```

<a id="helper-match"></a>

## route.match()

`route.match(url, options?)` は既知のパスを認識し、name、pattern、params、locale、生の query を含む判別可能な結果、または null を返します。base を含む入力には `{ basePath: true }` を使います。ルート名でパラメーター型を絞り込めます。スキーマによる変換には parseQuery を使います。認可には使えません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app" });
const found = urls.match("/app/users/42?tab=posts", { basePath: true });
if (found?.name === "users.show") {
  console.log(found.params.id); // "42"
  console.log(found.query.tab); // "posts"
}
urls.match("/unknown"); // null
```

<a id="helper-parse-query"></a>

## route.parseQuery()

`route.parseQuery(name, input)` は URL やクエリ文字列からクエリを読み、`ok` を含む結果を返します。実行時の Standard Schema は値を変換・検証し、型のみのスキーマは生の値を返します。生成モジュールでは `query` と `validateQuery: true` を指定します。Zod は利用側の任意依存です。検証失敗時の値を利用しないでください。

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```

<a id="helper-is"></a>

## route.is()

`route.is(name, url, options?)` は URL が名前付きルートに一致するか調べます。子孫を含めるには `exact: false`、ベース付き公開 URL には `{ basePath: true }` を指定します。アクティブメニュー用であり、アクセス制御用ではありません。未知の名前は拒否されます。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ users: "/users", "users.show": "/users/[id]" });
urls.is("users", "/users/42"); // false
urls.is("users", "/users/42", { exact: false }); // true
urls.is("users.show", "/users/42"); // true
```

<a id="helper-breadcrumbs"></a>

## route.breadcrumbs()

`route.breadcrumbs(url, options?)` は既知の祖先パスの一致をルートから末端の順に返します。存在しないルートや表示ラベルは作りません。名前を翻訳済みラベルに対応させてください。ベース付き URL には `{ basePath: true }` を指定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", users: "/users", "users.show": "/users/[id]" });
urls.breadcrumbs("/users/42").map((item) => item.name);
// ["home", "users", "users.show"]
```

<a id="helper-has"></a>

## route.has()

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

<a id="helper-names"></a>

## route.names()

`route.names()` は既知の名前を型付き配列で返します。デバッグや開発ツールに使えますが、権限や各ルートへのアクセス可能性は示しません。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
urls.names(); // ["home", "about"]
```

<a id="helper-pattern"></a>

## route.pattern()

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

<a id="helper-locales"></a>

## route.locales()

`route.locales()` は設定されたロケールを一覧にし、i18n がなければ空配列を返します。ブラウザーやリクエストの言語検出ではありません。言語セレクターに使えます。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
urls.locales(); // ["en", "pt"]
createRoutes({ home: "/" }).locales(); // []
```

<a id="helper-for-locale"></a>

## route.forLocale()

`route.forLocale(locale)` は設定済みロケールに固定したヘルパーを作ります。後の呼び出しの locale オプションで上書きできます。元のヘルパーは変化せず、アセットにはロケールを付けません。特定言語の複数リンクに使えます。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ about: "/about", "posts.show": "/posts/[id]" }, {
  i18n: {
    locales: ["en", "pt"], defaultLocale: "pt", localePrefix: "always",
    pathnames: { "/about": { pt: "/sobre" }, "/posts/[id]": { pt: "/artigos/[id]" } },
  },
});
const pt = urls.forLocale("pt");
pt("about"); // /pt/sobre
pt("posts.show", { id: 42 }); // /pt/artigos/42
urls("about"); // /about
pt.asset("logo.svg"); // /logo.svg
```

---

← 前へ: [ルートで構築する](build-with-routes.md) · [README に戻る](../../README.ja.md) · 次へ: [公開アセット](public-assets.md) →
