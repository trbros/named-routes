# O que ele faz

Topic: `overview` · Named Routes v2.2.0

O Named Routes gera helpers de URL tipados a partir das rotas que seu framework já conhece. Use um nome estável em vez de reconstruir caminhos. Ele não substitui o roteador, não navega e não envia requisições HTTP. Comece pela instalação e escolha seu framework; consulte a referência quando precisar.

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

Related topic IDs: installation, frameworks, naming, stable-names, helper-route, mcp-installation
