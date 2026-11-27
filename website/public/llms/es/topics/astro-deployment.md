# Base path y despliegue

Topic: `astro-deployment` · Named Routes v2.2.0

Configura `base` en Astro. route() incluye la base.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
route("users.$id", { id: 42 }); // /users/42
route.url("users.$id", { params: { id: 42 } }); // /users/42
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
route("users.$id", { id: 42 }); // /app/users/42
route.url("users.$id", { params: { id: 42 } }); // /app/users/42
```

Related topic IDs: base-path, public-url, asset-base
