# Documentation

`@triooo/named-routes` · **v2.2.0**

[Back to README](../../README.md) · [English](../en/index.md) · [Português](../pt/index.md) · [Español](../es/index.md) · [日本語](../ja/index.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

## Start here

- [What it does](topic-overview.md)
- [Installation](topic-installation.md)
- [Choose your framework](topic-frameworks.md)
- [Your first named route (Next.js)](topic-quick-start.md)
- [Automatic naming rules](topic-naming.md)
- [Read the generated manifest](topic-generated-source.md)
- [Compared with alternatives](topic-comparison.md)
- [How generation works](topic-architecture.md)

## Next.js

- [Next.js: setup](topic-nextjs.md)
- [File conventions & discovery](topic-nextjs-conventions.md)
- [Links & navigation](topic-nextjs-navigation.md)
- [Base path & deployment](topic-nextjs-deployment.md)
- [Public assets](topic-nextjs-assets.md)
- [Localized links](topic-nextjs-i18n.md)
- [HTTP endpoints](topic-nextjs-endpoints.md)
- [App Router recipes](topic-app-router.md)
- [Pages Router recipes](topic-pages-router.md)
- [Typed hrefs for Next.js typedRoutes](topic-typed-hrefs.md)
- [App Router — programmatic navigation](topic-nextjs-router-push.md)
- [App Router — redirect()](topic-nextjs-redirect.md)

## Nuxt

- [Nuxt: setup](topic-nuxt.md)
- [File conventions & discovery](topic-nuxt-conventions.md)
- [Links & navigation](topic-nuxt-navigation.md)
- [Navigation — navigateTo()](topic-nuxt-programmatic.md)
- [Base path & deployment](topic-nuxt-deployment.md)
- [Public assets](topic-nuxt-assets.md)
- [Localized links](topic-nuxt-i18n.md)
- [HTTP endpoints](topic-nuxt-endpoints.md)

## Vue Router

- [Vue Router: setup](topic-vue.md)
- [File conventions & discovery](topic-vue-conventions.md)
- [Links & navigation](topic-vue-navigation.md)
- [Navigation — router.push()](topic-vue-programmatic.md)
- [Base path & deployment](topic-vue-deployment.md)
- [Public assets](topic-vue-assets.md)
- [Localized links](topic-vue-i18n.md)
- [HTTP boundaries](topic-vue-endpoints.md)

## SvelteKit

- [SvelteKit: setup](topic-sveltekit.md)
- [File conventions & discovery](topic-sveltekit-conventions.md)
- [Links & navigation](topic-sveltekit-navigation.md)
- [Navigation — goto()](topic-sveltekit-programmatic.md)
- [Base path & deployment](topic-sveltekit-deployment.md)
- [Public assets](topic-sveltekit-assets.md)
- [Localized links](topic-sveltekit-i18n.md)
- [HTTP endpoints](topic-sveltekit-endpoints.md)

## Astro

- [Astro: setup](topic-astro.md)
- [File conventions & discovery](topic-astro-conventions.md)
- [Links & navigation](topic-astro-navigation.md)
- [Navigation — Astro.redirect()](topic-astro-programmatic.md)
- [Base path & deployment](topic-astro-deployment.md)
- [Public assets](topic-astro-assets.md)
- [Localized links](topic-astro-i18n.md)
- [HTTP endpoints](topic-astro-endpoints.md)

## React Router / Remix

- [React Router / Remix: setup](topic-react-router.md)
- [File conventions & discovery](topic-react-router-conventions.md)
- [Links & navigation](topic-react-router-navigation.md)
- [Navigation — useNavigate()](topic-react-router-programmatic.md)
- [Base path & deployment](topic-react-router-deployment.md)
- [Public assets](topic-react-router-assets.md)
- [Localized links](topic-react-router-i18n.md)
- [HTTP boundaries](topic-react-router-endpoints.md)

## TanStack Router

- [TanStack Router: setup](topic-tanstack-router.md)
- [File conventions & discovery](topic-tanstack-router-conventions.md)
- [Links & navigation](topic-tanstack-router-navigation.md)
- [Navigation — window.location.assign()](topic-tanstack-router-programmatic.md)
- [Base path & deployment](topic-tanstack-router-deployment.md)
- [Public assets](topic-tanstack-router-assets.md)
- [Localized links](topic-tanstack-router-i18n.md)
- [HTTP boundaries](topic-tanstack-router-endpoints.md)

## Manual routing

- [Manual routes (React, Vue, any router)](topic-manual-routes.md)

## Build URLs & name routes

- [route()](topic-helper-route.md)
- [route.url() — public URLs](topic-public-url.md)
- [Required parameters & encoding](topic-parameters.md)
- [Optional route parameters](topic-optional-parameters.md)
- [Catch-all parameters](topic-catch-all-parameters.md)
- [Mixed route segments](topic-mixed-parameters.md)
- [Query strings](topic-query-hash.md)
- [URL fragments (hash)](topic-hash-fragments.md)
- [Base path — internal vs public URL](topic-base-path.md)
- [Absolute URLs & origin](topic-absolute-urls.md)
- [Trailing slashes](topic-trailing-slash.md)
- [Semantic route names and groups](topic-semantic-names.md)
- [Optional stable names](topic-stable-names.md)
- [TypeScript and Next typedRoutes](topic-typescript.md)

## Route reference & inspection

- [Reverse routing and active routes](topic-reverse-routing.md)
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

## Typed queries & URL updates

- [Typed query parameters](topic-typed-query.md)
- [Connect a query schema](topic-query-schema-config.md)
- [Use typed queries](topic-query-schema-use.md)
- [defineQuery()](topic-helper-define-query.md)
- [defineQuery.type<T>()](topic-helper-define-query-type.md)
- [route.parseQuery()](topic-helper-parse-query.md)
- [route.withQuery()](topic-helper-with-query.md)

## Internationalization

- [Locales and i18n](topic-i18n.md)
- [Generate a localized URL](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.locales()](topic-helper-locales.md)
- [route.forLocale()](topic-helper-for-locale.md)

## Assets & CDN

- [asset() / route.asset()](topic-assets.md)
- [route.asset()](topic-helper-route-asset.md)
- [assetBase & CDN](topic-asset-base.md)
- [Absolute asset URLs](topic-asset-absolute.md)
- [Typed assets](topic-typed-assets.md)
- [asset.has() / paths() / info()](topic-asset-metadata.md)
- [asset.has()](topic-asset-has.md)
- [asset.paths()](topic-asset-paths.md)
- [asset.info()](topic-asset-info.md)
- [Asset versioning](topic-asset-versioning.md)

## SEO & metadata

- [route.canonical()](topic-helper-canonical.md)
- [route.alternates()](topic-helper-alternates.md)

## HTTP endpoints

- [Generated api — HTTP descriptors](topic-endpoint-methods.md)
- [route.endpoint()](topic-helper-endpoint.md)
- [Dynamic endpoint parameters](topic-endpoint-dynamic.md)

## Configuration & runtime reference

- [Runtime API reference](topic-runtime-api.md)
- [Generator configuration](topic-configuration.md)
- [Discovery & directories](topic-config-discovery.md)
- [Generated output & exports](topic-config-output.md)
- [Naming conventions](topic-config-naming.md)
- [URL defaults](topic-config-defaults.md)
- [Add explicit routes](topic-config-extra-routes.md)
- [Enable API discovery](topic-config-api.md)
- [Watch & development options](topic-config-watch.md)

## Generator & tooling API

- [Programmatic generator API](topic-generator-api.md)
- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)

## CLI, CI & troubleshooting

- [CLI and CI](topic-cli.md)
- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [Diagnostics: named-routes doctor](topic-doctor.md)
- [Audit routes and assets](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)
- [Discovery edge cases](topic-discovery.md)
- [Automatic development updates](topic-development.md)
- [Errors and troubleshooting](topic-errors.md)
- [Rewrites and boundaries](topic-boundaries.md)

## AI agents & MCP

- [AI agents & MCP](topic-ai-agents.md)
- [Install and start MCP](topic-mcp-installation.md)
- [Connect a local project](topic-mcp-project.md)
- [Claude Desktop and Claude Code](topic-mcp-claude.md)
- [Cursor configuration](topic-mcp-cursor.md)
- [Codex configuration](topic-mcp-codex.md)
- [VS Code / GitHub Copilot](topic-mcp-vscode.md)
- [Windows and direct Node launcher](topic-mcp-windows.md)
- [Tools and resources](topic-mcp-tools.md)
- [Example: build a link from real routes](topic-mcp-workflow.md)
- [Security and scope](topic-mcp-security.md)
- [Inspector and troubleshooting](topic-mcp-troubleshooting.md)

## Project & releases

- [Documentation website](topic-website.md)
- [Try it: framework demos](topic-demos.md)
- [Contribute step by step](topic-contributing.md)
- [Versions and upgrades](topic-versioning.md)
- [Upgrading from 1.x](topic-migration.md)
- [Helpers playground](topic-helpers-playground.md)
