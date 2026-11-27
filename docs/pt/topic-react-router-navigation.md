# Links e navegação

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-navigation.md) · [Português](../pt/topic-react-router-navigation.md) · [Español](../es/topic-react-router-navigation.md) · [日本語](../ja/topic-react-router-navigation.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-navigation"></a>

Importe o helper gerado em um componente fora da página de destino. O exemplo pressupõe o arquivo do guia de convenções e usa nomes por caminho. Ajuste o alias de importação ao projeto.

<a id="without-base"></a>
## Sem base path

URL no navegador: `/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

<a id="with-base"></a>
## Com base path

URL no navegador: `/app/users/42`.

```tsx
import { Link } from "react-router";
import { route } from "../routes.generated";

<Link to={route("users.$id", { id: 42 })}>Ana</Link>;
```

## Tópicos relacionados

- [route()](topic-helper-route.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Query strings](topic-query-hash.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Navegação — useNavigate()](topic-react-router-programmatic.md)

---

← Anterior: [Convenções de arquivos e descoberta](topic-react-router-conventions.md) · [Todos os tópicos](framework-react-router.md) · Próximo: [Navegação — useNavigate()](topic-react-router-programmatic.md) →
