# TypeScript e typedRoutes do Next

Topic: `typescript` · Named Routes v2.2.0

Padrões literais inferem a união de nomes e os objetos de parâmetros. Parâmetros obrigatórios são verificados na compilação; catch-all opcionais podem ser chamados sem parâmetros. O runtime também valida chamadas em JavaScript.

Desde a 2.0 route() retorna hrefs tipados (veja Hrefs tipados): tipos template literal que o typedRoutes do Next.js, <Link> e router.push() aceitam sem afirmar Route. hrefs: "string" retorna string como na 1.x. Os tipos exportados exigem TypeScript 5.4+. Não afirme entradas arbitrárias e não confiáveis como nome de rota para contornar a validação.

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
