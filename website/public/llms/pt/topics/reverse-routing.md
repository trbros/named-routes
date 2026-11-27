# Roteamento reverso e rota ativa

Topic: `reverse-routing` · Named Routes v2.2.0

route.match(url) retorna a rota nomeada para a qual um caminho aponta, com params decodificados, a query (chaves repetidas viram arrays), o hash e o idioma, ou null. Aceita um caminho relativo à raiz, como /users/42?tab=posts#bio, ou um objeto URL; URLs absolutas só correspondem na origin configurada ou em um domínio de i18n. route.is(nome, url) compara uma URL com uma rota; { exact: false } também aceita descendentes, para seções ativas da navegação. route.breadcrumbs(url) retorna as correspondências de cada caminho ancestral.

Segmentos estáticos vencem, depois os mistos, dinâmicos, opcionais, catch-all e catch-all opcionais, comparados da esquerda para a direita; padrões igualmente específicos são resolvidos pela ordem de declaração. Os segmentos são separados antes de serem decodificados, então %2F continua dentro de um parâmetro; percent-encoding malformado, segmentos vazios e URLs relativas ou sem protocolo retornam null. Passe { basePath: true } quando a URL inclui o basePath (window.location.pathname). Prefixos de idioma, prefixos personalizados e pathnames traduzidos são reconhecidos.

A correspondência descreve apenas a sua tabela de rotas: não é autorização, não prova que um recurso existe nem que uma navegação vai funcionar, e não substitui o router do framework. A query é retornada como strings; faça o parse com o seu próprio schema, por exemplo schema.parse(found.query) com coerção.

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

Related topic IDs: helper-match, helper-is, helper-breadcrumbs
