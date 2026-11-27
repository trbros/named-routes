# Hrefs tipados para o typedRoutes do Next.js

Topic: `typed-hrefs` · Named Routes v2.2.0

route() retorna tipos template literal em vez de string (o padrão desde a 2.0): route("users.$user", { user: 42 }) tem o tipo `/users/${string}`. O typedRoutes do Next.js aceita esses valores em <Link href>, router.push(), replace() e prefetch() nos dois routers sem cast, e outros routers tipados os aceitam como strings. Só os tipos mudam: as URLs são idênticas.

Chamadas com query ou hash retornam o caminho mais `?${string}` ou `#${string}`. Chamadas com absolute, basePath e locale retornam string, porque o Next adiciona basePath e idiomas por conta própria e rejeita URLs absolutas em links tipados. Segmentos opcionais viram uniões, então /shop/[[...path]] sem parâmetros tem o tipo "/shop"; o próprio typedRoutes do Next.js rejeita esse caminho base de um catch-all opcional, mesmo como literal, então passe um segmento nesse caso.

Um tipo de retorno mais estreito pode quebrar código que guarda uma rota numa variável depois reatribuída a outra string, como useState(route(...)) seguido de setState(window.location.href): anote a variável como string, ou use hrefs: "string" para manter o tipo da 1.x (named-routes migrate --to 2 faz isso). Com hrefs: "string" e typedRoutes, withNamedRoutes() imprime um aviso e named-routes doctor também aponta. Verificado com o next typegen e o tsc reais no Next 16 (App Router e Pages Router, webpack e Turbopack).

```tsx
// next.config.ts (typed hrefs are the default since 2.0)
export default withNamedRoutes({ typedRoutes: true });

// app/page.tsx
<Link href={route("users.$user", { user: 42 })}>Profile</Link>; // no cast
router.push(route("posts.$post", { post: 7 }, { query: { tab: "comments" } }));
const href = route("users.$user", { user: 42 }); // `/users/${string}`
```
