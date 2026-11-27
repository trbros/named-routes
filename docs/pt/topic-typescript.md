# TypeScript e typedRoutes do Next

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-typescript.md) · [Português](../pt/topic-typescript.md) · [Español](../es/topic-typescript.md) · [日本語](../ja/topic-typescript.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="typescript"></a>

Padrões literais inferem a união de nomes e os objetos de parâmetros. Parâmetros obrigatórios são verificados na compilação; catch-all opcionais podem ser chamados sem parâmetros. O runtime também valida chamadas em JavaScript.

Desde a 2.0 route() retorna hrefs tipados (veja Hrefs tipados): tipos template literal que o typedRoutes do Next.js, <Link> e router.push() aceitam sem afirmar Route. hrefs: "string" retorna string como na 1.x. Os tipos exportados exigem TypeScript 5.4+. Não afirme entradas arbitrárias e não confiáveis como nome de rota para contornar a validação.

## Exemplo

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

← Anterior: [Nomes estáveis opcionais](topic-stable-names.md) · [Todos os tópicos](build-with-routes.md)
