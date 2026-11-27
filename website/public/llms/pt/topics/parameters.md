# Parâmetros obrigatórios e encoding

Topic: `parameters` · Named Routes v2.2.0

Um parâmetro [user] aceita string não vazia ou número finito. O valor é codificado como um único segmento: uma barra no valor não vira separador. Parâmetros ausentes, extras ou inválidos são rejeitados. O helper valida a URL, não a existência do recurso.

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

Related topic IDs: optional-parameters, catch-all-parameters, mixed-parameters, helper-route
