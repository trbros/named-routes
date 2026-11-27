# Upgrading from 1.x

[Documentation](index.md) / [Project & releases](project.md)

[English](../en/topic-migration.md) · [Português](../pt/topic-migration.md) · [Español](../es/topic-migration.md) · [日本語](../ja/topic-migration.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="migration"></a>

2.0 changes defaults only where the change pays off; every change can be undone in the config. Run npx @triooo/named-routes doctor --v2 to see what applies to your project, then npx @triooo/named-routes migrate --to 2 (dry run) and --write to pin the 1.x behavior where the generated module would change. Remove the pinned lines when you are ready to adopt the new defaults.

Node.js 22.12+ is required (20 is end-of-life since April 2026); it brings require() of ES modules and native recursive file watching everywhere. TypeScript 5.4+ is required for the exported types, the minimum of Zod 4 and Valibot 1 as well.

route() returns typed hrefs by default. Before: string. After: `/users/${string}`, accepted by Next.js typedRoutes without casts. Code that stores a route in a variable and later assigns another string to it fails to compile: annotate it as string, or set hrefs: "string".

Routes come from the framework where it publishes its table (Nuxt module, Vue Router 5, React Router, TanStack Router). Before: definePageMeta/definePage paths and app/routes.ts routes needed extraRoutes. After: they are named like any page, and extraRoutes duplicates of them can be removed. Set discovery: "files" to keep the file scan. In Nuxt, replace the Vite plugin with modules: ["@triooo/named-routes/nuxt"].

Invalid router, pageExtensions and output values raise INVALID_CONFIG instead of GENERATION_ERROR, so each error class has one code; check error.code comparisons. typesVersions was removed: TypeScript must resolve the package through exports, with moduleResolution bundler, node16 or nodenext (node10 cannot). Generated modules that import query schemas as types now use TypeOnlyQueries, so route.parseQuery() is typed as returning the raw query there.

## Example

```sh
npx @triooo/named-routes doctor --v2
npx @triooo/named-routes migrate --to 2           # dry run
npx @triooo/named-routes migrate --to 2 --write   # pins hrefs/discovery in named-routes.config

# Keep a reassigned route as a string
const [href, setHref] = useState<string>(route("home"));
```

---

← Previous: [Versions and upgrades](topic-versioning.md) · [All topics](project.md) · Next: [Helpers playground](topic-helpers-playground.md) →
