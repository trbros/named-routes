# Try it: framework demos

[Documentation](index.md) / [Project & releases](project.md)

[English](../en/topic-demos.md) · [Português](../pt/topic-demos.md) · [Español](../es/topic-demos.md) · [日本語](../ja/topic-demos.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="demos"></a>

examples/ holds a small runnable app per supported setup: app-router and pages-router (Next.js), nuxt, vue (Vue Router 5), sveltekit, astro, react-router (flat routes), tanstack-router and react (routes declared by hand with createRoutes). Each one links to a static page, a dynamic users or posts page and a catch-all docs page by name; the Next.js demos also use typedRoutes with typed hrefs (App Router) and i18n with query strings (Pages Router). pnpm test:e2e installs the packed tarball into a copy of each demo and checks build, production server, browser navigation and live page discovery.

The demos depend on the package through file:../.., so build the package once at the repository root, then install and run any demo with npm. The generated module appears on the first dev or build run and changes as you add pages. Each demo builds with its real framework.

## Example

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

---

← Previous: [Documentation website](topic-website.md) · [All topics](project.md) · Next: [Contribute step by step](topic-contributing.md) →
