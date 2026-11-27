# Contribute step by step

[Documentation](index.md) / [Project & releases](project.md)

[English](../en/topic-contributing.md) · [Português](../pt/topic-contributing.md) · [Español](../es/topic-contributing.md) · [日本語](../ja/topic-contributing.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="contributing"></a>

**1. Prerequisites.** Install Node.js 22.12 or newer (22.18+ if you want to load named-routes.config.ts files), Git and Python 3 (only used to render the README files). Enable pnpm 12.16.1, the version pinned in package.json: corepack enable, or npm install --global pnpm@12.16.1.

**2. Clone and build.** Clone the repository, run pnpm install at the root and then pnpm build. The build cleans dist/ and compiles src/*.ts to ESM JavaScript, declarations and source maps. Run pnpm build again after every change to src/: the website and the demos use dist/, not the TypeScript sources.

**3. Know the layout.** src/index.ts is the browser-safe runtime (createRoutes, i18n, patterns); src/frameworks.ts holds the file-convention adapters; src/generator.ts discovers, validates and writes the module; src/config.ts loads named-routes.config.*; src/next.ts and src/vite.ts are the integrations; src/cli.ts is the named-routes binary. tests/ has the Node test suite and smoke tests. docs/locales.json lists the languages, docs/content.json holds the multilingual documentation and website/messages/<code>.json the interface texts. website/ is this site, examples/ has one demo per framework and scripts/ has the release, documentation and language helpers.

**4. Test while you work.** pnpm check builds and runs every Node test plus the positive and negative TypeScript contracts; it is what CI runs on Node 20, 22, 24 and 26. pnpm test:next starts real Next.js dev servers (install examples/app-router first with pnpm --dir examples/app-router install). pnpm test:vite starts a real Vite dev server. pnpm test:package packs the tarball and installs it into a clean project. pnpm release:check runs all of them.

**5. Edit the documentation.** docs/content.json is the single source for the website and every README. Each section has an id, title.<code>, paragraphs.<code> (an array of paragraphs per language), code and language; the codes are en, pt, es and ja. English is the source language: write the English text first and keep the same number of paragraphs in every language. **text** renders as bold on the site and in the README. A new section must also be added to a group in docs/groups.json (the website sidebar and the README topic pages), otherwise pnpm run docs fails. Its page is /docs/<id>.

**6. Translate and synchronize the languages.** Run pnpm locales (node scripts/sync-locales.mjs) after changing English text. It compares every language with English in docs/content.json and website/messages/*.json, fills anything missing with the English text so the site keeps working, removes interface keys that no longer exist in English, reorders keys to match en.json and prints a "Needs translation" list. Translate each listed entry in its language, then run pnpm locales:check (node scripts/sync-locales.mjs --check): it changes nothing and fails on missing titles or paragraphs, a different paragraph count, unbalanced **bold** markers, missing or stale interface keys, different ICU placeholders such as {count}, keys out of order or a language missing from website/lib/locales.ts. CI runs this check. node scripts/sync-locales.mjs --untranslated also lists texts that are still identical to English, which helps to review a language before a release.

**7. Sync the README files.** Run pnpm run docs (python3 scripts/sync-docs.py) to regenerate README.md, README.pt-BR.md, README.es.md and README.ja.md (the essentials and an index) and the topic pages in docs/<code>/*.md (one per group of docs/groups.json) from docs/content.json, docs/groups.json and docs/locales.json, then commit all of them. pnpm run docs:check fails when any of these files is out of date; CI runs it, so never edit them by hand. The usual order is: edit English, pnpm locales, translate, pnpm locales:check, pnpm run docs.

**8. Add a new language.** (a) Add an entry to docs/locales.json with code, name, htmlLang, readme (for example README.fr.md) and the README labels contents, references, localGuide, documentation, back, previous and next. (b) Add the code to the Locale union in website/lib/locales.ts and a title for it to every group in docs/groups.json. (c) Run pnpm locales: it creates website/messages/<code>.json and fills docs/content.json with English placeholders. (d) Translate every entry it reports. (e) Add the new README to the files list in package.json. (f) If the script needs other fonts or line breaking (as Japanese does), add rules for html[lang="<code>"] in website/app/transit.css. (g) Run pnpm locales:check, pnpm run docs, pnpm --dir website check:i18n and pnpm --dir website build. The language switcher in the header picks the new language up automatically.

**9. Edit website texts.** Interface strings live in website/messages/<code>.json under ui, with identical keys in every file; ICU syntax is checked, so avoid unescaped braces and keep placeholders identical. Add new keys to en.json first, then run pnpm locales and translate them. pnpm --dir website check:i18n validates every catalog. Framework data shown on the landing page (board rows, map lines, compatibility table) lives in website/lib/transit.ts and must match real generator output.

**10. Run the website.** After pnpm build at the root, run pnpm --dir website install once and pnpm --dir website dev (or pnpm website). The site depends on the package through link:.., so rebuild the package and restart the dev server after changing src/. Switch languages with EN, PT, ES and JA in the header. Before a pull request run pnpm --dir website typecheck and pnpm --dir website build.

**11. Try a demo.** Each folder in examples/ is a small app: cd examples/sveltekit (or nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Add a page and watch its routes.generated.ts change. The Next.js demos use pnpm.

**12. Add a framework.** Write the adapter in src/frameworks.ts (sources, extensions, skipDirectory, map) and teach detectFramework its package; add convention tests to tests/frameworks.test.mjs; add a demo to examples/ and the demos workflow matrix; document it in docs/content.json in every language; add its line to website/lib/transit.ts only after the demo builds.

**13. Open a pull request.** Keep the change focused, add regression tests, update CHANGELOG.md under the next version, run pnpm release:check, pnpm locales:check and pnpm run docs:check, and never commit generated files (dist/, routes.generated.ts, .next/, demo build output); .gitignore already excludes them.

**14. Releases (maintainers).** Bump version in package.json, move the CHANGELOG entry under it, run pnpm release:check, then publish a GitHub release tagged named-routes-vX.Y.Z. The publish workflow validates the tag, runs CI again and publishes to npm with provenance through npm trusted publishing (no npm token is stored). Apache License 2.0 applies; bundled fonts keep their OFL licenses.

## Example

```sh
git clone https://github.com/trbros/named-routes.git
cd named-routes
pnpm install
pnpm run check
```

## Related topics

- [Documentation website](topic-website.md)
- [Try it: framework demos](topic-demos.md)
- [Versions and upgrades](topic-versioning.md)
- [check](topic-cli-check.md)

---

← Previous: [Try it: framework demos](topic-demos.md) · [All topics](project.md) · Next: [Versions and upgrades](topic-versioning.md) →
