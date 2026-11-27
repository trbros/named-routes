# Astro: configuração

[Documentação](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro.md) · [Português](../pt/topic-astro.md) · [Español](../es/topic-astro.md) · [日本語](../ja/topic-astro.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro"></a>

Registre a integração nativa de @triooo/named-routes/astro em integrations do astro.config. Ela herda o base final do Astro. Se migrar da configuração antiga, remova namedRoutes() de vite.plugins. O módulo é gerado em src/routes.generated.ts por padrão e pode ser usado no frontmatter .astro, em ilhas e endpoints.

<a id="without-base"></a>
## Sem base path

A aplicação é servida na raiz do domínio. Não configure um prefixo de navegação.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ integrations: [namedRoutes()] });
```

<a id="with-base"></a>
## Com base path

A aplicação é servida em /app. Configure a base do framework antes de regenerar as rotas.

```ts
import { defineConfig } from "astro/config";
import namedRoutes from "@triooo/named-routes/astro";

export default defineConfig({ base: "/app", integrations: [namedRoutes()] });
```

## Tópicos relacionados

- [Convenções de arquivos e descoberta](topic-astro-conventions.md)
- [Links e navegação](topic-astro-navigation.md)
- [Instalação](topic-installation.md)
- [Configuração do gerador](topic-configuration.md)

---

[Todos os tópicos](framework-astro.md) · Próximo: [Convenções de arquivos e descoberta](topic-astro-conventions.md) →
