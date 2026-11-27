# Navegación — router.push()

Topic: `vue-programmatic` · Named Routes v2.2.0

Usa dentro de un componente/setup o evento, no al inicializar el módulo. Named Routes construye la ruta; la función nativa navega.

## Sin base path

URL en el navegador: `/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

## Con base path

URL en el navegador: `/app/users/42`.

```ts
import { useRouter } from "vue-router";
import { route } from "@/routes.generated";
const router = useRouter();
await router.push(route("users.$id", { id: 42 }));
```

Related topic IDs: vue-navigation, vue-deployment, public-url
