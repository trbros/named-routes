# TypeScript and Next typedRoutes

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-typescript.md) · [Português](../pt/topic-typescript.md) · [Español](../es/topic-typescript.md) · [日本語](../ja/topic-typescript.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typescript"></a>

Literal patterns infer name unions and parameter objects. Required parameters are checked at compile time; optional catch-all routes can be called without parameters. The runtime still validates JavaScript callers.

Since 2.0 route() returns typed hrefs (see Typed hrefs): template literal types that Next.js typedRoutes, <Link> and router.push() accept without asserting Route. hrefs: "string" returns string as in 1.x. The exported types need TypeScript 5.4+. Do not assert untrusted arbitrary input to a route name to bypass validation.

## Example

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

← Previous: [Optional stable names](topic-stable-names.md) · [All topics](build-with-routes.md)
