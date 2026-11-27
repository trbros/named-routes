# TypeScript と Next の typedRoutes

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-typescript.md) · [Português](../pt/topic-typescript.md) · [Español](../es/topic-typescript.md) · [日本語](../ja/topic-typescript.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typescript"></a>

リテラルのパターンから名前のユニオン型とパラメーターのオブジェクト型が推論されます。必須パラメーターはコンパイル時にチェックされ、オプションの catch-all ルートはパラメーターなしで呼び出せます。JavaScript からの呼び出しも、ランタイムが引き続き検証します。

2.0 から route() は型付き href（「型付き href」を参照）を返します。Next.js の typedRoutes、<Link>、router.push() が Route へのアサーションなしで受け付けるテンプレートリテラル型です。hrefs: "string" にすると 1.x と同じく string を返します。エクスポートされる型には TypeScript 5.4 以上が必要です。検証を回避するために、信頼できない任意の入力をルート名としてアサートしないでください。

## 例

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

---

← 前へ: [固定名（任意）](topic-stable-names.md) · [全トピック](build-with-routes.md)
