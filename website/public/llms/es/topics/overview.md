# Qué hace

Topic: `overview` · Named Routes v2.2.0

Named Routes genera helpers de URL tipados desde las rutas que tu framework ya conoce. Usa nombres estables en vez de reconstruir rutas. No reemplaza el router, no navega ni realiza peticiones HTTP. Empieza por la instalación y elige tu framework.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
