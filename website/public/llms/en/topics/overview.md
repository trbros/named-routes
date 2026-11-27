# What it does

Topic: `overview` · Named Routes v2.2.0

Named Routes generates typed URL helpers from routes your framework already knows. Use a stable name instead of reconstructing paths. It does not replace your router, perform navigation or send HTTP requests. Start with installation and choose your framework; explore the reference as needed.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
