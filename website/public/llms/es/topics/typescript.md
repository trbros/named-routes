# TypeScript y typedRoutes de Next

Topic: `typescript` · Named Routes v2.2.0

Los patrones literales infieren uniones de nombres y objetos de parámetros. Los parámetros obligatorios se comprueban en tiempo de compilación; las rutas catch-all opcionales pueden llamarse sin parámetros. El runtime sigue validando las llamadas desde JavaScript.

Desde la 2.0 route() devuelve hrefs tipados (ver Hrefs tipados): tipos template literal que typedRoutes de Next.js, <Link> y router.push() aceptan sin afirmar Route. hrefs: "string" devuelve string como en la 1.x. Los tipos exportados requieren TypeScript 5.4+. No afirmes entradas arbitrarias y no confiables como nombre de ruta para saltarte la validación.

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
