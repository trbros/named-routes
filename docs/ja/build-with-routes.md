# ルートで構築する · @triooo/named-routes

[← README に戻る](../../README.ja.md) · [English](../en/build-with-routes.md) · [Português](../pt/build-with-routes.md) · [Español](../es/build-with-routes.md) · [日本語](../ja/build-with-routes.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [App Router のレシピ](#app-router)
- [Pages Router のレシピ](#pages-router)
- [パラメーターとエンコード](#parameters)
- [クエリ文字列とフラグメント](#query-hash)
- [basePath、末尾スラッシュ、オリジン](#base-path)
- [言語と i18n](#i18n)
- [TypeScript と Next の typedRoutes](#typescript)

<a id="app-router"></a>

## App Router のレシピ

ヘルパーは普通の URL 文字列を返します。next/link、redirect、next/navigation の App Router 用 useRouter フックと組み合わせて使ってください。リダイレクトは適切なサーバー処理やイベント処理の中で実行します。名前付きルートが Next.js のリダイレクトの意味を変えることはありません。

これらのスニペットの名前は、対応するページ（posts/page.tsx、posts/[post]/page.tsx、posts/[post]/edit/page.tsx）が存在する前提です。

```tsx
// Server Component
import Link from "next/link";
import { route } from "@/routes.generated";
export default function PostLink() {
  return <Link href={route("posts.$post", { post: 42 })}>Post</Link>;
}

// A separate Client Component file:
"use client";
import { useRouter } from "next/navigation";
import { route } from "@/routes.generated";
export function EditPost({ post }: { post: number }) {
  const router = useRouter();
  return <button onClick={() => router.push(
    route("posts.$post.edit", { post })
  )}>Edit</button>;
}

// In a server-side redirect flow:
// import { redirect } from "next/navigation";
// redirect(route("posts"));
```

<a id="pages-router"></a>

## Pages Router のレシピ

同じ生成ヘルパーを使います。Pages Router のアプリでは、ルーターのフックは next/router から取得します。Link に専用のアダプターは不要です。移行中は両方のルーターのディレクトリをスキャンできますが、正規 URL が衝突すると生成は失敗します。

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "@/routes.generated";
export default function Page() {
  const router = useRouter();
  return <>
    <Link href={route("users.$user", { user: 42 })}>User</Link>
    <button onClick={() => router.replace(route("user.profile"))}>
      Profile
    </button>
  </>;
}
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

<a id="base-path"></a>

## basePath、末尾スラッシュ、オリジン

Next の Link とルーターのナビゲーションは basePath を自分で付けます。ヘルパーの相対 URL は、プレフィックスの重複を避けるため、デフォルトでは basePath を含みません。通常のリンク、fetch、その他の利用先では basePath: true を指定してください。absolute: true は常に basePath を含み、defaults.origin が必要です。

withNamedRoutes は Next の設定から basePath と trailingSlash を引き継ぎます。defaults を明示すると、引き継いだ値より優先されます。origin は、認証情報、ルート以外のパス、query、hash を含まない HTTP(S) のオリジンでなければなりません。リクエストや window から推測されることはありません。

defaults はすべて、公開される生成モジュールにシリアライズされます。秘密情報は絶対に入れないでください。trailingSlash は生成されるパスの形を整えるだけで、リダイレクトや最終的な正規化は引き続き Next が担当します。

```ts
// next.config.ts
export default withNamedRoutes({ basePath: "/admin" }, {
  defaults: { origin: "https://triooo.com.br" },
});
route("users.$user", { user: 42 }); // /users/42 (Next Link/router)
route("users.$user", { user: 42 }, { basePath: true });
// /admin/users/42 (plain anchor/fetch)
route("users.$user", { user: 42 }, { absolute: true });
// https://triooo.com.br/admin/users/42
```

<a id="i18n"></a>

## 言語と i18n

i18n は locales と defaultLocale、必要に応じて localePrefix、pathnames、domains で設定します。形は next-intl の defineRouting() と同じなので、その routing オブジェクトをそのまま渡せます。localeCookie のような next-intl 専用のキーは受け付けたうえで無視します。Next.js の Pages Router のプロジェクトでは、withNamedRoutes が next.config の i18n を自動で引き継ぎます（localePrefix は as-needed、domains も含む）。

locale または lang という名前の最初の動的フォルダー（app/[locale]/…、pages/[lang]/…。localeParam で変更可能）は、名前とパターンから取り除かれます。app/[locale]/about/page.tsx は about → /about になります。物理的な言語フォルダー（src/pages/pt/about.astro）は同じルートにまとめられます。言語フォルダーがない場合（Pages Router の i18n、@nuxtjs/i18n、ミドルウェアのリライト）は、すべてのページがローカライズ対象です。エンドポイントと [locale] の外にあるルートは unlocalized として扱われ、プレフィックスは付きません。

locale なしの route(name, params) は内部パスを返します。これは next-intl の Link、Pages Router の Link、@nuxtjs/i18n の localePath が期待する形です。通常のリンク、リダイレクト、サイトマップ、メール、言語切り替えには { locale } を渡してください。route.forLocale(locale) はその言語に固定したヘルパーを返し、route.locales() は設定済みの言語を一覧にします。

localePrefix: always（デフォルト）はすべての言語にプレフィックスを付け、as-needed はデフォルト言語だけ省き、never はすべて省きます。{ mode, prefixes: { "en-US": "/us" } } で個別に変更することもできます。pathnames は内部パターンを、同じパラメーターを持つ翻訳済みのパターンに対応付けます。absolute: true のとき、設定したドメインで配信される言語ではそのドメインがオリジンになります。言語は型付きで、生成モジュールは RouteLocale をエクスポートし、未知の言語は型エラーにも実行時エラーにもなります。

```ts
// next.config.ts — next-intl with app/[locale]/…
import { routing } from "./src/i18n/routing"; // defineRouting({...})
export default withNamedRoutes(withNextIntl({}), { i18n: routing });

// or named-routes.config.mjs (any framework)
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: { "/about": { pt: "/sobre" } },
  },
});

route("about");                     // /about (next-intl Link adds the locale)
route("about", {}, { locale: "pt" }); // /pt/sobre
route("about", {}, { locale: "en" }); // /about
const pt = route.forLocale("pt");
pt("users.$user", { user: 42 });      // /pt/users/42
```

<a id="typescript"></a>

## TypeScript と Next の typedRoutes

リテラルのパターンから名前のユニオン型とパラメーターのオブジェクト型が推論されます。必須パラメーターはコンパイル時にチェックされ、オプションの catch-all ルートはパラメーターなしで呼び出せます。JavaScript からの呼び出しも、ランタイムが引き続き検証します。

route() が返すのは string で、Next が生成する Route 型ではありません。Next の typedRoutes を有効にしている場合、Link 側の検証で Route へのアサーションが必要になることがあります。それでもパッケージはルート名とパラメーターをチェックします。検証を回避するために、信頼できない任意の入力をルート名にアサーションしないでください。

```ts
import type { Route } from "next";
import type { RouteName } from "@/routes.generated";
import { route } from "@/routes.generated";
const name: RouteName = "user.profile";
route("users.$user", { user: 42 });
// route("unknown");          // Type error
// route("users.$user");     // Missing user
// route("users.$user", { id: 42 }); // Wrong parameter
// With Next typedRoutes:
// <Link href={route(name) as Route}>Profile</Link>
```

---

← 前へ: [フレームワーク](frameworks.md) · [README に戻る](../../README.ja.md) · 次へ: [API リファレンス](api-reference.md) →
