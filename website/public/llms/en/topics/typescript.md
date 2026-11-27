# TypeScript and Next typedRoutes

Topic: `typescript` · Named Routes v2.2.0

Literal patterns infer name unions and parameter objects. Required parameters are checked at compile time; optional catch-all routes can be called without parameters. The runtime still validates JavaScript callers.

Since 2.0 route() returns typed hrefs (see Typed hrefs): template literal types that Next.js typedRoutes, <Link> and router.push() accept without asserting Route. hrefs: "string" returns string as in 1.x. The exported types need TypeScript 5.4+. Do not assert untrusted arbitrary input to a route name to bypass validation.

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
