# URL と名前の構築

# route()

Topic: `helper-route` · Named Routes v2.2.0

route(name, params?, options?) は URL を返し、遷移しません。必須パラメータは型と実行時に検証されます。公開 URL には route.url() を使用します。

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" });

route("home"); // /
route("users.show", { id: 42 }); // /users/42
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ home: "/", "users.show": "/users/[id]" }, { basePath: "/app", includeBasePath: true });

route("home"); // /app
route("users.show", { id: 42 }); // /app/users/42
route("users.show", { id: 42 }, { basePath: false }); // /users/42
```

Related topic IDs: public-url, parameters, query-hash, base-path
---

# route.url() — 公開 URL

Topic: `public-url` · Named Routes v2.2.0

route.url(name, { params?, query?, hash?, locale?, absolute?, basePath? }) は公開 URL を文字列で返します。必須パラメータやクエリがある場合は options が必要です。basePath: false で内部パスを返します。

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" });

route.url("entrar"); // /entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /users/42?tab=posts
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ entrar: "/entrar", "users.show": "/users/[id]" }, { basePath: "/app" });

route.url("entrar"); // /app/entrar
route.url("users.show", { params: { id: 42 }, query: { tab: "posts" } });
// /app/users/42?tab=posts
```

Related topic IDs: helper-route, base-path, helper-endpoint
---

# 必須パラメータとエンコード

Topic: `parameters` · Named Routes v2.2.0

[user] は空でない文字列または有限の数値です。値は単一セグメントとしてエンコードされます。リソースの存在確認は行いません。

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
---

# 任意パラメータ

Topic: `optional-parameters` · Named Routes v2.2.0

[[id]] は任意の単一パラメータです。値を省略するとセグメントも省略されます。フレームワークごとの規則を確認してください。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

Related topic IDs: parameters, catch-all-parameters, naming
---

# キャッチオールパラメータ

Topic: `catch-all-parameters` · Named Routes v2.2.0

[...slug] は空でない配列、[[...slug]] は省略または空配列を受け付けます。各要素は別々のセグメントになります。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ docs: "/docs/[[...slug]]" });
route("docs"); // /docs
route("docs", { slug: ["guide", "install"] }); // /docs/guide/install
```

Related topic IDs: optional-parameters, parameters
---

# 混合セグメント

Topic: `mixed-parameters` · Named Routes v2.2.0

混合セグメントは固定文字列と必須パラメータを組み合わせます。各パラメータには固有のキーがあります。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ release: "/v[major]-[minor]" });
route("release", { major: 2, minor: 1 }); // /v2-1
```

Related topic IDs: parameters, naming
---

# クエリ文字列

Topic: `query-hash` · Named Routes v2.2.0

options.query に値を渡します。数値・真偽値は文字列化し、配列はキーを繰り返し、null と undefined は省略します。

```ts
route.url("products", { query: { page: 2, sort: "newest" } });
// /products?page=2&sort=newest
```

Related topic IDs: typed-query, helper-with-query, helper-parse-query, hash-fragments
---

# URL フラグメント

Topic: `hash-fragments` · Named Routes v2.2.0

hash でページ内の位置を指定します。先頭の # は除去され、フラグメントはエンコードされます。サーバーには送信されません。

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
---

# ベースパス — 内部と公開 URL

Topic: `base-path` · Named Routes v2.2.0

Next.js、Nuxt、Vue Router、React Router、TanStack Router のナビゲーションには route() を使います。Astro、SvelteKit、手動生成ではベースを既定で付加します。公開 URL には route.url() を使います。defaults.includeBasePath と呼び出し時の basePath で変更でき、絶対 URL にはベースが含まれます。

フレームワーク別のデプロイガイドを参照してください。CLI は .named-routes/ のベースまたは --base-path /app を使い、/ で解除します。CDN とナビゲーションベースは別です。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" });

route("about"); // /about
route.url("about"); // /about
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { basePath: "/app" });

route("about"); // /about
route.url("about"); // /app/about
route.withDefaults({ includeBasePath: true })("about"); // /app/about
```

Related topic IDs: public-url, absolute-urls, trailing-slash, asset-base, cli-generate
---

# 絶対 URL と origin

Topic: `absolute-urls` · Named Routes v2.2.0

defaults.origin に信頼できる HTTP(S) オリジンを設定します。認証情報、パス、クエリ、フラグメントは不可です。absolute: true でベースを含む絶対 URL を生成します。

## ベースパスなし

アプリはドメインのルートで配信されます。ナビゲーションプレフィックスは不要です。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com" });
route.url("about", { absolute: true }); // https://example.com/about
```

## ベースパスあり

アプリは /app 配下で配信されます。ルート生成前にフレームワークのベースを設定します。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { origin: "https://example.com", basePath: "/app" });
route.url("about", { absolute: true }); // https://example.com/app/about
```

Related topic IDs: base-path, helper-canonical, helper-with-defaults
---

# 末尾スラッシュ

Topic: `trailing-slash` · Named Routes v2.2.0

trailingSlash は URL の形式のみ変更し、サーバーのリダイレクトは変更しません。フレームワークの設定と揃えてください。

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

Related topic IDs: base-path, config-defaults
---

# 意味的なルート名とグループ

Topic: `semantic-names` · Named Routes v2.2.0

naming.style を semantic にすると親ページに index、末尾必須パラメータに show を使用します。既定の命名は維持されます。names で安定した任意の名前を指定できます。衝突はエラーになります。

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
---

# 固定名（任意）

Topic: `stable-names` · Named Routes v2.2.0

自動の名前は URL の構造に従います。リファクタリングで公開 URL が変わっても意味のある名前を保ちたい場合は、任意の names マップを更新してください。エイリアスを付けるパスはすべて実在する必要があります。リストにないルートは自動の名前のままです。名前の重複や綴りの誤りは、壊れたリンクを黙って作る代わりに生成を失敗させます。

独自の名前はそのパスの自動の名前を置き換えるもので、2 つ目のエイリアスが自動で追加されるわけではありません。posts.show のような Laravel 風の名前に便利ですが、通常の使い方では不要です。

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

Related topic IDs: semantic-names, config-naming, naming
---

# TypeScript と Next の typedRoutes

Topic: `typescript` · Named Routes v2.2.0

リテラルのパターンから名前のユニオン型とパラメーターのオブジェクト型が推論されます。必須パラメーターはコンパイル時にチェックされ、オプションの catch-all ルートはパラメーターなしで呼び出せます。JavaScript からの呼び出しも、ランタイムが引き続き検証します。

2.0 から route() は型付き href（「型付き href」を参照）を返します。Next.js の typedRoutes、<Link>、router.push() が Route へのアサーションなしで受け付けるテンプレートリテラル型です。hrefs: "string" にすると 1.x と同じく string を返します。エクスポートされる型には TypeScript 5.4 以上が必要です。検証を回避するために、信頼できない任意の入力をルート名としてアサートしないでください。

```ts
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes (typed hrefs are the default):
// <Link href={route(name)}>Profile</Link>   // no cast
```
