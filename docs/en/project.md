# Project · @triooo/named-routes

[← Back to README](../../README.md) · [English](../en/project.md) · [Português](../pt/project.md) · [Español](../es/project.md) · [日本語](../ja/project.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Documentation website](#website)
- [Try it: framework demos](#demos)
- [Contribute step by step](#contributing)
- [Versions and upgrades](#versioning)

<a id="website"></a>

## Documentation website

This documentation is a Next.js app in website/. It is the project's public site, built with the package itself: every internal link uses route(), the playground and destination pages are real App Router routes, and the English, Portuguese, Spanish and Japanese content comes from the same docs/content.json that renders the README files.

The landing page shows each supported framework as a line on a transit map, a departure board fed with real generator output, a compatibility table and an install journey. Motion is finite or user-driven, pauses off screen, and is disabled by prefers-reduced-motion.

To deploy on Vercel, create a project with Root Directory set to website and keep "Include files outside the root directory" enabled. website/vercel.json installs the repository, builds the package and then builds the site. No environment variables are required.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

<a id="demos"></a>

## Try it: framework demos

examples/ holds a small runnable app per supported setup: app-router and pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router and react (routes declared by hand with createRoutes). Each one links to a static page, a dynamic users page and a catch-all docs page by name.

The demos depend on the package through file:../.., so build the package once at the repository root, then install and run any demo with npm. The generated module appears on the first dev or build run and changes as you add pages. Each demo builds with its real framework.

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

<a id="contributing"></a>

## Contribute step by step

**1. Prerequisites.** Install Node.js 20.19 or newer (22.18+ if you want to load named-routes.config.ts files), Git and Python 3 (only used to render the README files). Enable pnpm 12.16.1, the version pinned in package.json: corepack enable, or npm install --global pnpm@12.16.1.

**2. Clone and build.** Clone the repository, run pnpm install at the root and then pnpm build. The build cleans dist/ and compiles src/*.ts to ESM JavaScript, declarations and source maps. Run pnpm build again after every change to src/: the website and the demos use dist/, not the TypeScript sources.

**3. Know the layout.** src/index.ts is the browser-safe runtime (createRoutes, i18n, patterns); src/frameworks.ts holds the file-convention adapters; src/generator.ts discovers, validates and writes the module; src/config.ts loads named-routes.config.*; src/next.ts and src/vite.ts are the integrations; src/cli.ts is the named-routes binary. tests/ has the Node test suite and smoke tests. docs/locales.json lists the languages, docs/content.json holds the multilingual documentation and website/messages/<code>.json the interface texts. website/ is this site, examples/ has one demo per framework and scripts/ has the release, documentation and language helpers.

**4. Test while you work.** pnpm check builds and runs every Node test plus the positive and negative TypeScript contracts; it is what CI runs on Node 20, 22, 24 and 26. pnpm test:next starts real Next.js dev servers (install examples/app-router first with pnpm --dir examples/app-router install). pnpm test:vite starts a real Vite dev server. pnpm test:package packs the tarball and installs it into a clean project. pnpm release:check runs all of them.

**5. Edit the documentation.** docs/content.json is the single source for the website and every README. Each section has an id, title.<code>, paragraphs.<code> (an array of paragraphs per language), code and language; the codes are en, pt, es and ja. English is the source language: write the English text first and keep the same number of paragraphs in every language. **text** renders as bold on the site and in the README. A new section must also be added to a group in docs/groups.json (the website sidebar and the README topic pages), otherwise pnpm docs fails. Its page is /docs/<id>.

**6. Translate and synchronize the languages.** Run pnpm locales (node scripts/sync-locales.mjs) after changing English text. It compares every language with English in docs/content.json and website/messages/*.json, fills anything missing with the English text so the site keeps working, removes interface keys that no longer exist in English, reorders keys to match en.json and prints a "Needs translation" list. Translate each listed entry in its language, then run pnpm locales:check (node scripts/sync-locales.mjs --check): it changes nothing and fails on missing titles or paragraphs, a different paragraph count, unbalanced **bold** markers, missing or stale interface keys, different ICU placeholders such as {count}, keys out of order or a language missing from website/lib/locales.ts. CI runs this check. node scripts/sync-locales.mjs --untranslated also lists texts that are still identical to English, which helps to review a language before a release.

**7. Sync the README files.** Run pnpm docs (python3 scripts/sync-docs.py) to regenerate README.md, README.pt-BR.md, README.es.md and README.ja.md (the essentials and an index) and the topic pages in docs/<code>/*.md (one per group of docs/groups.json) from docs/content.json, docs/groups.json and docs/locales.json, then commit all of them. pnpm docs:check fails when any of these files is out of date; CI runs it, so never edit them by hand. The usual order is: edit English, pnpm locales, translate, pnpm locales:check, pnpm docs.

**8. Add a new language.** (a) Add an entry to docs/locales.json with code, name, htmlLang, readme (for example README.fr.md) and the README labels contents, references, localGuide, documentation, back, previous and next. (b) Add the code to the Locale union in website/lib/locales.ts and a title for it to every group in docs/groups.json. (c) Run pnpm locales: it creates website/messages/<code>.json and fills docs/content.json with English placeholders. (d) Translate every entry it reports. (e) Add the new README to the files list in package.json. (f) If the script needs other fonts or line breaking (as Japanese does), add rules for html[lang="<code>"] in website/app/transit.css. (g) Run pnpm locales:check, pnpm docs, pnpm --dir website check:i18n and pnpm --dir website build. The language switcher in the header picks the new language up automatically.

**9. Edit website texts.** Interface strings live in website/messages/<code>.json under ui, with identical keys in every file; ICU syntax is checked, so avoid unescaped braces and keep placeholders identical. Add new keys to en.json first, then run pnpm locales and translate them. pnpm --dir website check:i18n validates every catalog. Framework data shown on the landing page (board rows, map lines, compatibility table) lives in website/lib/transit.ts and must match real generator output.

**10. Run the website.** After pnpm build at the root, run pnpm --dir website install once and pnpm --dir website dev (or pnpm website). The site depends on the package through link:.., so rebuild the package and restart the dev server after changing src/. Switch languages with EN, PT, ES and JA in the header. Before a pull request run pnpm --dir website typecheck and pnpm --dir website build.

**11. Try a demo.** Each folder in examples/ is a small app: cd examples/sveltekit (or nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Add a page and watch its routes.generated.ts change. The Next.js demos use pnpm.

**12. Add a framework.** Write the adapter in src/frameworks.ts (sources, extensions, skipDirectory, map) and teach detectFramework its package; add convention tests to tests/frameworks.test.mjs; add a demo to examples/ and the demos workflow matrix; document it in docs/content.json in every language; add its line to website/lib/transit.ts only after the demo builds.

**13. Open a pull request.** Keep the change focused, add regression tests, update CHANGELOG.md under the next version, run pnpm release:check, pnpm locales:check and pnpm docs:check, and never commit generated files (dist/, routes.generated.ts, .next/, demo build output); .gitignore already excludes them.

**14. Releases (maintainers).** Bump version in package.json, move the CHANGELOG entry under it, run pnpm release:check, then publish a GitHub release tagged named-routes-vX.Y.Z. The publish workflow validates the tag, runs CI again and publishes to npm with provenance through npm trusted publishing (no npm token is stored). Apache License 2.0 applies; bundled fonts keep their OFL licenses.

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> named-routes && cd named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.*.md and docs/<code>/*.md
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json docs/groups.json website/lib/locales.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```

<a id="versioning"></a>

## Versions and upgrades

Version 1.x defines the public contract for inferred names, typed URL generation, framework adapters, i18n, the Next.js wrapper, the Vite plugin and the CLI.

Patch releases preserve the documented API while fixing bugs. Minor releases add compatible functionality, such as new framework adapters. Breaking changes require a new major version. Review the changelog before upgrading.

After an upgrade, restart the dev server to regenerate the manifest and run your application’s type check and navigation tests. If you move a page and need to preserve its public route name, use an explicit alias.

```sh
npm install @triooo/named-routes@^1
npx named-routes check
npx tsc --noEmit
```

---

← Previous: [Guides](guides.md) · [Back to README](../../README.md)
