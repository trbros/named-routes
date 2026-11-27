# Barras finais

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-trailing-slash.md) · [Português](../pt/topic-trailing-slash.md) · [Español](../es/topic-trailing-slash.md) · [日本語](../ja/topic-trailing-slash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="trailing-slash"></a>

trailingSlash muda a formatação do caminho gerado, não os redirects do servidor. Configure a mesma política no framework. O Next.js herda a opção do next.config.

## Exemplo

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

## Tópicos relacionados

- [Base path — URL interna e pública](topic-base-path.md)
- [Defaults de URL](topic-config-defaults.md)

---

← Anterior: [URLs absolutas e origin](topic-absolute-urls.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Nomes semânticos e grupos](topic-semantic-names.md) →
