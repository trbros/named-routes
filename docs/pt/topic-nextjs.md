# Next.js: configuração

[Documentação](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs.md) · [Português](../pt/topic-nextjs.md) · [Español](../es/topic-nextjs.md) · [日本語](../ja/topic-nextjs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs"></a>

Envolva o next.config com withNamedRoutes de @triooo/named-routes/next. O módulo é gerado antes de next dev e next build, mantido atualizado por um watcher dentro do next dev e nunca é escrito durante o next start, então deploys somente leitura são seguros. O wrapper herda pageExtensions, basePath, trailingSlash e o i18n do Pages Router.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-nextjs-conventions.md)
- [Links e navegação](topic-nextjs-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-nextjs.md) · Próximo: [Convenções de arquivos e descoberta](topic-nextjs-conventions.md) →
