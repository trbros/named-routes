# Versions and upgrades

Topic: `versioning` · Named Routes v2.2.0

Version 2.x defines the public contract for inferred names, typed URL generation, framework adapters and framework discovery, i18n, the Next.js wrapper, the Nuxt module, the Vite plugin and the CLI. 1.x receives no new features.

Patch releases preserve the documented API while fixing bugs. Minor releases add compatible functionality, such as new framework adapters. Breaking changes require a new major version. Review the changelog before upgrading.

After an upgrade, restart the dev server to regenerate the manifest and run your application’s type check and navigation tests. If you move a page and need to preserve its public route name, use an explicit alias.

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```
