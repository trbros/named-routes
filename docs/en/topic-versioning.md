# Versions and upgrades

[Documentation](index.md) / [Project & releases](project.md)

[English](../en/topic-versioning.md) · [Português](../pt/topic-versioning.md) · [Español](../es/topic-versioning.md) · [日本語](../ja/topic-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="versioning"></a>

Version 2.x defines the public contract for inferred names, typed URL generation, framework adapters and framework discovery, i18n, the Next.js wrapper, the Nuxt module, the Vite plugin and the CLI. 1.x receives no new features.

Patch releases preserve the documented API while fixing bugs. Minor releases add compatible functionality, such as new framework adapters. Breaking changes require a new major version. Review the changelog before upgrading.

After an upgrade, restart the dev server to regenerate the manifest and run your application’s type check and navigation tests. If you move a page and need to preserve its public route name, use an explicit alias.

## Example

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```

---

← Previous: [Contribute step by step](topic-contributing.md) · [All topics](project.md) · Next: [Upgrading from 1.x](topic-migration.md) →
