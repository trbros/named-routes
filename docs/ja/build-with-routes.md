# ルートで構築する · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [App Router のレシピ](#app-router)
- [Pages Router のレシピ](#pages-router)
- [パラメーターとエンコード](#parameters)
- [クエリ文字列とフラグメント](#query-hash)
- [型付きのクエリパラメーター](#typed-query)
- [逆引きルーティングとアクティブなルート](#reverse-routing)
- [basePath、末尾スラッシュ、オリジン](#base-path)
- [言語と i18n](#i18n)
- [TypeScript と Next の typedRoutes](#typescript)
- [Next.js の typedRoutes 向けの型付き href](#typed-hrefs)

<a id="app-router"></a>

## App Router のレシピ

ヘルパーは普通の URL 文字列を返します。next/link、redirect、next/navigation の App Router 用 useRouter フックと組み合わせて使ってください。リダイレクトは適切なサーバー処理やイベント処理の中で実行します。名前付きルートが Next.js のリダイレクトの意味を変えることはありません。

これらのスニペットの名前は、対応するページ（posts/page.tsx、posts/[post]/page.tsx、posts/[post]/edit/page.tsx）が存在する前提です。

**ベースと翻訳 URL。** ラッパーは basePath を継承します。Next Link とルーターは内部パスを使い、通常のリンクでは basePath: true を指定します。翻訳された受信 URL のリダイレクトには proxy または middleware で選択済みの言語を route.localize() に渡します。i18n を参照してください。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

```tsx
// Server Component (next.config.ts has basePath: "/app")
import Link from "next/link";
import { asset, route } from "@/routes.generated";
export default function PostLink() {
  return <>
    <Link href={route("posts.$post", { post: 42 })}>Post</Link>
    <a href={route("posts.$post", { post: 42 }, { basePath: true })}>Public URL</a>
    <img src={asset("images/logo.svg")} alt="Logo" />
  </>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { asset, route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  // Next's router applies the base itself.
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
// File: public/images/logo.svg
```

<a id="pages-router"></a>

## Pages Router のレシピ

同じ生成ヘルパーを使います。Pages Router のアプリでは、ルーターのフックは next/router から取得します。Link に専用のアダプターは不要です。移行中は両方のルーターのディレクトリをスキャンできますが、正規 URL が衝突すると生成は失敗します。

**ベースと i18n。** Next Link と next/router は設定済みの basePath と locale を使用します。これらには route() の内部パスを渡します。通常の公開 URL では basePath: true と必要に応じて locale を指定します。route.localize() は i18n 設定を必要とし、自動でリダイレクトを追加しません。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

```tsx
// With basePath: "/app" in next.config.ts
import Link from "next/link";
import { useRouter } from "next/router";
import { asset, route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    {/* Next Link adds the base and the configured locale. */}
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
    <img src={asset("images/logo.svg")} alt="Logo" />
    {/* Plain HTML URL needs the base explicitly. */}
    <a href={route("users.$user", { user: 42 }, { basePath: true })}>Public URL</a>
  </>;
}
// File: public/images/logo.svg
```

<a id="parameters"></a>

## パラメーターとエンコード

[id] には空でない文字列か有限の数値が必要です。[[id]]（Nuxt、Vue、SvelteKit、React Router、TanStack）はオプションのスカラーで、省略するとそのセグメントがなくなります。[...slug] には空でない文字列/数値の配列が必要です。[[...slug]] はオプションの配列を受け付け、省略、null、[] のいずれでも catch-all の部分がなくなります。混在セグメントでは、含まれるすべてのパラメーターが必要です。

パラメーターのセグメントはひとつずつエンコードされます。スカラーの中のスラッシュはエンコードされ、catch-all の配列は別々のパスセグメントになります。余分なパラメーター、空の必須値、NaN、Infinity、オブジェクト、単独の . や .. のセグメントはエラーになります。これらのチェックは URL の組み立てを検証するもので、アプリケーションの業務上の ID を検証するものではありません。

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" });       // /users/a%2Fb
// app/docs/[[...slug]]/page.tsx:
route("docs.$slug");                         // /docs
route("docs.$slug", { slug: ["guide", "install"] });
// /docs/guide/install
// pages/[[lang]]/about.vue and pages/v[major]-[minor].vue:
route("$lang.about");                        // /about
route("v$major-$minor", { major: 2, minor: 1 }); // /v2-1
```

<a id="query-hash"></a>

## クエリ文字列とフラグメント

query と hash は第 3 引数で渡します。query の値には文字列、有限の数値、真偽値、またはそれらの読み取り専用配列を使えます。null と undefined は、配列の要素であっても省かれます。配列はキーを繰り返し、角かっこ記法は使いません。

hash は先頭の # を除いた文字列で、ヘルパーがエンコードします。ブラウザーにとどまり、サーバーには送られません。hash の文字列と query のオブジェクトは実行時に検証されます。

```ts
route("users.$user", { user: 42 }, {
  query: { page: 2, tag: ["next", "react"], draft: false, omit: null },
  hash: "activity",
});
// /users/42?page=2&tag=next&tag=react&draft=false#activity
```

<a id="typed-query"></a>

## 型付きのクエリパラメーター

ルートごとのクエリスキーマを、export default が defineQuery({...}) のモジュールに宣言し、query オプションでそのモジュールを指定します。キーはルート名で、値は Standard Schema のバリデーター（Zod 3.24 以上、Valibot 1 以上、ArkType など）か、TypeScript の型だけを使う defineQuery.type<T>() です。スキーマのないルートは 1.0 のクエリのままです。

スキーマがあると、TypeScript は未知のキーや互換性のない値を拒否し、必須のキーがあれば options.query も必須になります。スキーマのライブラリが依存関係になることはありません。TypeScript の出力はモジュールを型としてだけインポートするので、何もバンドルされず、実行時の検証も行われません。

validateQuery: true にすると、スキーマをバンドルし、URL を組み立てるたびにクエリのオブジェクトを検証します。失敗すると問題点を含む INVALID_QUERY が投げられます。検証で URL が変わることはありません。値は渡したとおりにシリアライズされ、スキーマのデフォルト値や変換は適用されません。route() は同期関数なので、非同期のスキーマは拒否されます。JavaScript の出力では、型を推論するためにモジュールを値としてインポートします。Zod 4 と Valibot 1 には TypeScript 5.4 以上が必要です。

route.parseQuery(name, url) は、ルートのスキーマが実行時に使える場合（validateQuery: true、または createRoutes に渡したスキーマ）に、そのスキーマで URL のクエリを読み戻し、スキーマの出力型を持つ { ok: true, value } か { ok: false, issues } を返します。値は文字列で届きます。スキーマが拒否したキーについては、route() が数値や true/false 用に書き出した文字列を元に戻し、単一の値を配列にするので、同じスキーマで URL の生成と読み取りの両方ができます。実行時のスキーマがないルート（スキーマなし、defineQuery.type()、型としてだけ import したスキーマ）は生のクエリを返し、型もそれを示します。

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});

// named-routes.config.ts: defineConfig({ query: "src/route-query.ts" })
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required

// With validateQuery: true
const parsed = route.parseQuery("products", "/products?page=2&sort=newest");
if (parsed.ok) parsed.value.page; // 2 (number | undefined)
```

<a id="reverse-routing"></a>

## 逆引きルーティングとアクティブなルート

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

<a id="base-path"></a>

## basePath、末尾スラッシュ、オリジン

Next の Link とルーターのナビゲーションは basePath を自分で付けます。ヘルパーの相対 URL は、プレフィックスの重複を避けるため、デフォルトでは basePath を含みません。通常のリンク、fetch、その他の利用先では basePath: true を指定してください。absolute: true は常に basePath を含み、defaults.origin が必要です。

withNamedRoutes は Next の設定から basePath と trailingSlash を引き継ぎます。defaults を明示すると、引き継いだ値より優先されます。origin は、認証情報、ルート以外のパス、query、hash を含まない HTTP(S) のオリジンでなければなりません。リクエストや window から推測されることはありません。

defaults はすべて、公開される生成モジュールにシリアライズされます。秘密情報は絶対に入れないでください。trailingSlash は生成されるパスの形を整えるだけで、リダイレクトや最終的な正規化は引き続き Next が担当します。

**フレームワークのベースパス。** Next.js は basePath、Nuxt は app.baseURL を継承します。Astro では @triooo/named-routes/astro のネイティブ統合を integrations に登録すると、Vite のアセット用 URL ではなく Astro の最終的な base を取得します。Vue Router、React Router/Remix、TanStack Router、SvelteKit ではフレームワークと namedRoutes({ routerBase: base }) に同じナビゲーション用プレフィックスを渡してください。inheritViteBase: true は Vite の base がルーターのプレフィックスでもある場合にのみ使用します。明示的な defaults.basePath が優先されます。

**CLI の単独実行。** フレームワークによる生成が成功すると .named-routes/ に有効な公開プレフィックスをフレームワークごとに保存します。defaults.basePath や --base-path がなければ CLI と doctor はこれを再利用します。設定変更後はフレームワークを再実行してください。CLI はフレームワークの設定ファイルを実行しません。初回起動前の CI では共有設定の defaults.basePath または --base-path を使用し、--base-path / で解除します。.named-routes/ は Git の対象外にしてください。route() は従来どおりプレフィックスを省略します。公開 URL や通常の HTML リンクには { basePath: true } を指定します。

`defaults.assetBase` は公開アセットの URL プレフィックスだけを上書きします。省略すると有効な `basePath` を引き継ぎます。ドメインのルートから配信する場合は `"/"` または `""`、CDN の場合は HTTP(S) URL を指定します。ナビゲーション、ローカライズ、逆引きには影響しません。

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true }); // /admin/users/42
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42

// In any framework: named-routes.config.mjs (alternative shared config)
export default defineConfig({ defaults: { basePath: "/admin" } });

// Public assets are separate from navigation; configure a CDN if needed.
route.asset("images/logo.svg"); // /admin/images/logo.svg
// defaults: { basePath: "/admin", assetBase: "https://cdn.example.com/public" }
// route.asset("images/logo.svg") → https://cdn.example.com/public/images/logo.svg
```

<a id="i18n"></a>

## 言語と i18n

i18n は locales と defaultLocale、必要に応じて localePrefix、pathnames、domains で設定します。形は next-intl の defineRouting() と同じなので、その routing オブジェクトをそのまま渡せます。localeCookie のような next-intl 専用のキーは受け付けたうえで無視します。Next.js の Pages Router のプロジェクトでは、withNamedRoutes が next.config の i18n を自動で引き継ぎます（localePrefix は as-needed、domains も含む）。

locale または lang という名前の最初の動的フォルダー（app/[locale]/…、pages/[lang]/…。localeParam で変更可能）は、名前とパターンから取り除かれます。app/[locale]/about/page.tsx は about → /about になります。物理的な言語フォルダー（src/pages/pt/about.astro）は同じルートにまとめられます。言語フォルダーがない場合（Pages Router の i18n、@nuxtjs/i18n、ミドルウェアのリライト）は、すべてのページがローカライズ対象です。エンドポイントと [locale] の外にあるルートは unlocalized として扱われ、プレフィックスは付きません。

locale なしの route(name, params) は内部パスを返します。これは next-intl の Link、Pages Router の Link、@nuxtjs/i18n の localePath が期待する形です。通常のリンク、リダイレクト、サイトマップ、メール、言語切り替えには { locale } を渡してください。route.forLocale(locale) はその言語に固定したヘルパーを返し、route.locales() は設定済みの言語を一覧にします。

localePrefix: always（デフォルト）はすべての言語にプレフィックスを付け、as-needed はデフォルト言語だけ省き、never はすべて省きます。{ mode, prefixes: { "en-US": "/us" } } で個別に変更することもできます。pathnames は内部パターンを、同じパラメーターを持つ翻訳済みのパターンに対応付けます。absolute: true のとき、設定したドメインで配信される言語ではそのドメインがオリジンになります。言語は型付きで、生成モジュールは RouteLocale をエクスポートし、未知の言語は型エラーにも実行時エラーにもなります。

**受信 URL の翻訳。** /sobre が /about のポルトガル語パスで localePrefix が always の場合、route.localize('/sobre', 'en') は /en/about を返します。route.localize('/pt/produtos/42?tab=info#details', 'en') は /en/products/42?tab=info#details を返せます。すべての設定言語を検索し、パラメーター、元のクエリとフラグメントを保持します。不明、曖昧、非ローカライズのルートは null になります。route.match() の動作は変わりません。認識済みの元言語プレフィックス、またはプレフィックスなしの別名に対する sourceLocale で同じ具体性の候補を区別します。対象言語を省略すると forLocale() の言語または既定言語を使います。

**リクエストのリダイレクト。** ランタイムはリクエストを横取りしません。既存の i18n ミドルウェアで優先言語を決め、ベースを含む公開 URL には route.localize(pathAndQuery, locale, { basePath: true }) を呼び出し、結果が異なるときだけ一時リダイレクトします。内部 rewrite はフレームワークに任せます。内部パスから公開パスを生成する場合は includeBasePath: true を使います。言語別ドメインでは absolute: true と設定済みドメインを使い、URL 全体を比較します。API、アセット、GET/HEAD 以外、解決できないパスはリダイレクトしません。Next.js proxy の例は examples/app-router/recipes/localized-redirect.ts.example にあります。

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing";
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});

// Results with the always-prefix configuration above:
route("about"); // /about (internal pathname)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /en/about
route.localize("/sobre", "en"); // /en/about
route.localize("/en/about?tab=info#details", "pt"); // /pt/sobre?tab=info#details
route.forLocale("en").localize("/sobre"); // /en/about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 }); // /pt/users/42
```

<a id="typescript"></a>

## TypeScript と Next の typedRoutes

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

<a id="typed-hrefs"></a>

## Next.js の typedRoutes 向けの型付き href

route() は string ではなくテンプレートリテラル型を返します（2.0 からのデフォルト）。route("users.$user", { user: 42 }) の型は `/users/${string}` です。Next.js の typedRoutes は、両方のルーターの <Link href>、router.push()、replace()、prefetch() でキャストなしにこの値を受け付け、他の型付きルーターも string として受け付けます。変わるのは型だけで、URL は同じです。

query や hash を指定した呼び出しは、パスに `?${string}` または `#${string}` が付いた型を返します。absolute、basePath、locale を指定した呼び出しは string を返します。Next は basePath と言語を自分で付け、型付きリンクでは絶対 URL を受け付けないためです。オプションのセグメントはユニオン型になるので、パラメーターなしの /shop/[[...path]] の型は "/shop" になります。Next.js の typedRoutes 自体が、オプションの catch-all のこの基底パスをリテラルであっても拒否するため、その場合はセグメントを渡してください。

戻り値の型が狭くなるため、ルートを変数に入れて後で別の string を代入するコード（useState(route(...)) の後に setState(window.location.href) など）は壊れることがあります。変数に string 型を付けるか、hrefs: "string" で 1.x の型を保ってください（named-routes migrate --to 2 がこれを行います）。hrefs: "string" と typedRoutes を併用すると withNamedRoutes() が警告を出し、named-routes doctor も報告します。Next 16（App Router と Pages Router、webpack と Turbopack）で実際の next typegen と tsc を使って検証しています。

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```

---

← 前へ: [フレームワーク](frameworks.md) · [README に戻る](../../README.ja.md) · 次へ: [ルートヘルパー](route-helpers.md) →
