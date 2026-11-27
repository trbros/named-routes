# Next.js の typedRoutes 向けの型付き href

Topic: `typed-hrefs` · Named Routes v2.2.0

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
