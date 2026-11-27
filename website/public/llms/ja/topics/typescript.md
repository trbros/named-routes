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
