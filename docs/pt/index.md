# Documentação

`@triooo/named-routes` · **v2.2.0**

[Voltar ao README](../../README.pt-BR.md) · [English](../en/index.md) · [Português](../pt/index.md) · [Español](../es/index.md) · [日本語](../ja/index.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

## Primeiros passos

- [O que ele faz](topic-overview.md)
- [Instalação](topic-installation.md)
- [Escolha seu framework](topic-frameworks.md)
- [Sua primeira rota nomeada (Next.js)](topic-quick-start.md)
- [Regras de nomes automáticos](topic-naming.md)
- [Leia o manifesto gerado](topic-generated-source.md)
- [Comparação com alternativas](topic-comparison.md)
- [Como a geração funciona](topic-architecture.md)

## Next.js

- [Next.js: configuração](topic-nextjs.md)
- [Convenções de arquivos e descoberta](topic-nextjs-conventions.md)
- [Links e navegação](topic-nextjs-navigation.md)
- [Base path e deploy](topic-nextjs-deployment.md)
- [Arquivos públicos](topic-nextjs-assets.md)
- [Links internacionalizados](topic-nextjs-i18n.md)
- [Endpoints HTTP](topic-nextjs-endpoints.md)
- [Exemplos com App Router](topic-app-router.md)
- [Exemplos com Pages Router](topic-pages-router.md)
- [Hrefs tipados para o typedRoutes do Next.js](topic-typed-hrefs.md)
- [App Router — navegação programática](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)

## Nuxt

- [Nuxt: configuração](topic-nuxt.md)
- [Convenções de arquivos e descoberta](topic-nuxt-conventions.md)
- [Links e navegação](topic-nuxt-navigation.md)
- [Navegação — navigateTo()](topic-nuxt-programmatic.md)
- [Base path e deploy](topic-nuxt-deployment.md)
- [Arquivos públicos](topic-nuxt-assets.md)
- [Links internacionalizados](topic-nuxt-i18n.md)
- [Endpoints HTTP](topic-nuxt-endpoints.md)

## Vue Router

- [Vue Router: configuração](topic-vue.md)
- [Convenções de arquivos e descoberta](topic-vue-conventions.md)
- [Links e navegação](topic-vue-navigation.md)
- [Navegação — router.push()](topic-vue-programmatic.md)
- [Base path e deploy](topic-vue-deployment.md)
- [Arquivos públicos](topic-vue-assets.md)
- [Links internacionalizados](topic-vue-i18n.md)
- [Limites de HTTP](topic-vue-endpoints.md)

## SvelteKit

- [SvelteKit: configuração](topic-sveltekit.md)
- [Convenções de arquivos e descoberta](topic-sveltekit-conventions.md)
- [Links e navegação](topic-sveltekit-navigation.md)
- [Navegação — goto()](topic-sveltekit-programmatic.md)
- [Base path e deploy](topic-sveltekit-deployment.md)
- [Arquivos públicos](topic-sveltekit-assets.md)
- [Links internacionalizados](topic-sveltekit-i18n.md)
- [Endpoints HTTP](topic-sveltekit-endpoints.md)

## Astro

- [Astro: configuração](topic-astro.md)
- [Convenções de arquivos e descoberta](topic-astro-conventions.md)
- [Links e navegação](topic-astro-navigation.md)
- [Navegação — Astro.redirect()](topic-astro-programmatic.md)
- [Base path e deploy](topic-astro-deployment.md)
- [Arquivos públicos](topic-astro-assets.md)
- [Links internacionalizados](topic-astro-i18n.md)
- [Endpoints HTTP](topic-astro-endpoints.md)

## React Router / Remix

- [React Router / Remix: configuração](topic-react-router.md)
- [Convenções de arquivos e descoberta](topic-react-router-conventions.md)
- [Links e navegação](topic-react-router-navigation.md)
- [Navegação — useNavigate()](topic-react-router-programmatic.md)
- [Base path e deploy](topic-react-router-deployment.md)
- [Arquivos públicos](topic-react-router-assets.md)
- [Links internacionalizados](topic-react-router-i18n.md)
- [Limites de HTTP](topic-react-router-endpoints.md)

## TanStack Router

- [TanStack Router: configuração](topic-tanstack-router.md)
- [Convenções de arquivos e descoberta](topic-tanstack-router-conventions.md)
- [Links e navegação](topic-tanstack-router-navigation.md)
- [Navegação — window.location.assign()](topic-tanstack-router-programmatic.md)
- [Base path e deploy](topic-tanstack-router-deployment.md)
- [Arquivos públicos](topic-tanstack-router-assets.md)
- [Links internacionalizados](topic-tanstack-router-i18n.md)
- [Limites de HTTP](topic-tanstack-router-endpoints.md)

## Rotas manuais

- [Rotas manuais (React, Vue, qualquer router)](topic-manual-routes.md)

## Construção de URLs e nomes

- [route()](topic-helper-route.md)
- [route.url() — URLs públicas](topic-public-url.md)
- [Parâmetros obrigatórios e encoding](topic-parameters.md)
- [Parâmetros opcionais](topic-optional-parameters.md)
- [Parâmetros catch-all](topic-catch-all-parameters.md)
- [Segmentos mistos](topic-mixed-parameters.md)
- [Query strings](topic-query-hash.md)
- [Fragmentos da URL (hash)](topic-hash-fragments.md)
- [Base path — URL interna e pública](topic-base-path.md)
- [URLs absolutas e origin](topic-absolute-urls.md)
- [Barras finais](topic-trailing-slash.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Nomes estáveis opcionais](topic-stable-names.md)
- [TypeScript e typedRoutes do Next](topic-typescript.md)

## Referência de rotas e inspeção

- [Roteamento reverso e rota ativa](topic-reverse-routing.md)
- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)
- [route.has()](topic-helper-has.md)
- [route.names()](topic-helper-names.md)
- [route.pattern()](topic-helper-pattern.md)
- [createRoutes()](topic-helper-create-routes.md)
- [route.withDefaults()](topic-helper-with-defaults.md)
- [parsePattern()](topic-helper-parse-pattern.md)
- [formatPattern()](topic-helper-format-pattern.md)
- [patternParameters()](topic-helper-pattern-parameters.md)

## Queries tipadas e atualização de URLs

- [Query parameters tipados](topic-typed-query.md)
- [Conectar um schema de query](topic-query-schema-config.md)
- [Usar queries tipadas](topic-query-schema-use.md)
- [defineQuery()](topic-helper-define-query.md)
- [defineQuery.type<T>()](topic-helper-define-query-type.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [route.withQuery()](topic-helper-with-query.md)

## Internacionalização

- [Idiomas e i18n](topic-i18n.md)
- [Gerar uma URL localizada](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.locales()](topic-helper-locales.md)
- [route.forLocale()](topic-helper-for-locale.md)

## Assets e CDN

- [asset() / route.asset()](topic-assets.md)
- [route.asset()](topic-helper-route-asset.md)
- [assetBase e CDN](topic-asset-base.md)
- [URLs absolutas de assets](topic-asset-absolute.md)
- [Assets tipados](topic-typed-assets.md)
- [asset.has() / paths() / info()](topic-asset-metadata.md)
- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Versionamento de assets](topic-asset-versioning.md)

## SEO e metadados

- [route.canonical()](topic-helper-canonical.md)
- [route.alternates()](topic-helper-alternates.md)

## Endpoints HTTP

- [api gerada — descritores HTTP](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Parâmetros dinâmicos de endpoints](topic-endpoint-dynamic.md)

## Configuração e referência do runtime

- [Referência da API de runtime](topic-runtime-api.md)
- [Configuração do gerador](topic-configuration.md)
- [Descoberta e diretórios](topic-config-discovery.md)
- [Saída gerada e exports](topic-config-output.md)
- [Convenções de nomes](topic-config-naming.md)
- [Defaults de URL](topic-config-defaults.md)
- [Adicionar rotas explícitas](topic-config-extra-routes.md)
- [Ativar descoberta de APIs](topic-config-api.md)
- [Watch e opções de desenvolvimento](topic-config-watch.md)

## Gerador e API de ferramentas

- [API programática do gerador](topic-generator-api.md)
- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)

## CLI, CI e solução de problemas

- [CLI e CI](topic-cli.md)
- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [Diagnóstico: named-routes doctor](topic-doctor.md)
- [Auditoria de rotas e assets](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)
- [Casos especiais de descoberta](topic-discovery.md)
- [Atualização automática em desenvolvimento](topic-development.md)
- [Erros e solução de problemas](topic-errors.md)
- [Rewrites e limites](topic-boundaries.md)

## Agentes de IA e MCP

- [Agentes de IA e MCP](topic-ai-agents.md)
- [Instalar e iniciar o MCP](topic-mcp-installation.md)
- [Conectar um projeto local](topic-mcp-project.md)
- [Claude Desktop e Claude Code](topic-mcp-claude.md)
- [Configuração do Cursor](topic-mcp-cursor.md)
- [Configuração do Codex](topic-mcp-codex.md)
- [VS Code / GitHub Copilot](topic-mcp-vscode.md)
- [Windows e launcher Node direto](topic-mcp-windows.md)
- [Ferramentas e recursos](topic-mcp-tools.md)
- [Exemplo: criar um link com rotas reais](topic-mcp-workflow.md)
- [Segurança e escopo](topic-mcp-security.md)
- [Inspector e solução de problemas](topic-mcp-troubleshooting.md)

## Projeto e versões

- [Site de documentação](topic-website.md)
- [Teste: demos por framework](topic-demos.md)
- [Contribua passo a passo](topic-contributing.md)
- [Versões e atualizações](topic-versioning.md)
- [Atualizando da 1.x](topic-migration.md)
- [Playground dos helpers](topic-helpers-playground.md)
