# Diagnostics: named-routes doctor

[Documentation](index.md) / [CLI, CI & troubleshooting](guides.md)

[English](../en/topic-doctor.md) · [Português](../pt/topic-doctor.md) · [Español](../es/topic-doctor.md) · [日本語](../ja/topic-doctor.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="doctor"></a>

npx @triooo/named-routes doctor checks the Node.js and TypeScript versions, the configuration file, the detected framework, discovered routes, conflicts and name collisions, whether the generated module exists and is current, the Next.js or Vite integration, typedRoutes without typed hrefs, i18n without localized routes, and route declarations the file scanner cannot see (Nuxt definePageMeta({ path }) and route() calls in a React Router app/routes.ts).

It is read-only: it never writes files and never executes application code. Integration and declaration checks are plain-text heuristics and say so. Options passed inline to a plugin are code, so doctor reports them as not visible; move shared options to named-routes.config.* or pass flags such as --output.

Each diagnostic is error, warning or info, with a stable id and, when known, the file, route, option and a fix. --json prints a machine-readable report for CI and --strict also fails on warnings; colors are used only on a TTY and never with NO_COLOR or --no-color. Exit code 0 means no errors; 1 means errors, or warnings with --strict.

It also says where the routes came from (the framework's table or the files, and why it fell back) and lists the routes that exist in only one of the two views. doctor --v2 adds what a project written for 1.x must change for 2.0: typed hrefs, routes that framework discovery changes, a moduleResolution that cannot read the package's exports, and code that compares error codes with GENERATION_ERROR.

## Example

```sh
npx @triooo/named-routes doctor
npx @triooo/named-routes doctor --json --strict   # CI
npx @triooo/named-routes doctor --v2              # upgrading from 1.x

# info     Routes come from the framework: typed-router.d.ts.
# info     /sobre (sobre) exists only in the framework's route table; the file conventions do not produce it.
#          file:  src/pages/about.vue
```

---

← Previous: [watch](topic-cli-watch.md) · [All topics](guides.md) · Next: [Audit routes and assets](topic-audit.md) →
