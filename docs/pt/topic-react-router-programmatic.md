# Navegação — useNavigate()

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-programmatic.md) · [Português](../pt/topic-react-router-programmatic.md) · [Español](../es/topic-react-router-programmatic.md) · [日本語](../ja/topic-react-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-programmatic"></a>

Use dentro do componente/setup ou handler de evento suportado pelo framework, não na inicialização do módulo. O Named Routes constrói o caminho; a função nativa realiza a navegação. Configure a base conforme o guia de deploy.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## Tópicos relacionados

- [Links e navegação](topic-react-router-navigation.md)
- [Base path e deploy](topic-react-router-deployment.md)
- [route.url() — URLs públicas](topic-public-url.md)

---

← Anterior: [Links e navegação](topic-react-router-navigation.md) · [Todos os tópicos](framework-react-router.md) · Próximo: [Base path e deploy](topic-react-router-deployment.md) →
