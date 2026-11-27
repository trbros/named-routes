# Navegação — window.location.assign()

Topic: `tanstack-router-programmatic` · Named Routes v2.2.0

Use apenas para navegação de documento inteiro no navegador. Para SPA, use navigate/Link tipado do TanStack com ID e params nativos; uma URL pública gerada não é um ID do TanStack.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { route } from "@/routes.generated";
window.location.assign(route.url("users.$id", { params: { id: 42 } }));
```

Related topic IDs: tanstack-router-navigation, tanstack-router-deployment, public-url
