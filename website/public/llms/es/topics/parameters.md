# Parámetros obligatorios y codificación

Topic: `parameters` · Named Routes v2.2.0

Un parámetro [user] acepta una cadena no vacía o número finito. Se codifica como un segmento; se rechazan valores ausentes o inválidos. No valida la existencia del recurso.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
