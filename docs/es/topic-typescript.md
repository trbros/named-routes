# TypeScript y typedRoutes de Next

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-typescript.md) · [Português](../pt/topic-typescript.md) · [Español](../es/topic-typescript.md) · [日本語](../ja/topic-typescript.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typescript"></a>

Los patrones literales infieren uniones de nombres y objetos de parámetros. Los parámetros obligatorios se comprueban en tiempo de compilación; las rutas catch-all opcionales pueden llamarse sin parámetros. El runtime sigue validando las llamadas desde JavaScript.

Desde la 2.0 route() devuelve hrefs tipados (ver Hrefs tipados): tipos template literal que typedRoutes de Next.js, <Link> y router.push() aceptan sin afirmar Route. hrefs: "string" devuelve string como en la 1.x. Los tipos exportados requieren TypeScript 5.4+. No afirmes entradas arbitrarias y no confiables como nombre de ruta para saltarte la validación.

## Ejemplo

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

← Anterior: [Nombres estables opcionales](topic-stable-names.md) · [Todos los temas](build-with-routes.md)
