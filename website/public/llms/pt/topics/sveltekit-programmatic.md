# Navegação — goto()

Topic: `sveltekit-programmatic` · Named Routes v2.2.0

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

## Sem base path

URL no navegador: `/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

## Com base path

URL no navegador: `/app/users/42`.

```ts
import { goto } from "$app/navigation";
import { route } from "$lib/routes.generated";
await goto(route("users.$id", { id: 42 }));
```

Related topic IDs: sveltekit-navigation, sveltekit-deployment, public-url
