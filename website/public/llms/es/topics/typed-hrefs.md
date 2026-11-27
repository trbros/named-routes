# Hrefs tipados para typedRoutes de Next.js

Topic: `typed-hrefs` · Named Routes v2.2.0

route() devuelve tipos template literal en lugar de string (el valor por defecto desde la 2.0): route("users.$user", { user: 42 }) tiene el tipo `/users/${string}`. typedRoutes de Next.js acepta estos valores en <Link href>, router.push(), replace() y prefetch() en ambos routers sin cast, y otros routers tipados los aceptan como strings. Solo cambian los tipos: las URLs son idénticas.

Las llamadas con query o hash devuelven la ruta más `?${string}` o `#${string}`. Las llamadas con absolute, basePath y locale devuelven string, porque Next añade basePath e idiomas por su cuenta y rechaza URLs absolutas en enlaces tipados. Los segmentos opcionales se convierten en uniones, así que /shop/[[...path]] sin parámetros tiene el tipo "/shop"; el propio typedRoutes de Next.js rechaza esa ruta base de un catch-all opcional, incluso como literal, así que pasa un segmento en ese caso.

Un tipo de retorno más estrecho puede romper código que guarda una ruta en una variable reasignada después a otro string, como useState(route(...)) seguido de setState(window.location.href): anota la variable como string, o usa hrefs: "string" para mantener el tipo de la 1.x (named-routes migrate --to 2 lo hace). Con hrefs: "string" y typedRoutes, withNamedRoutes() imprime un aviso y named-routes doctor también lo señala. Verificado con next typegen y tsc reales en Next 16 (App Router y Pages Router, webpack y Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
