# Audit routes and assets

[Documentation](index.md) / [CLI, CI & troubleshooting](guides.md)

[English](../en/topic-audit.md) · [Português](../pt/topic-audit.md) · [Español](../es/topic-audit.md) · [日本語](../ja/topic-audit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="audit"></a>

Run audit in the consumer project to detect literal unknown route/asset references, case mismatches, duplicate base prefixes and hardcoded paths. Scans source files, skips build outputs and never rewrites them. This is a conservative lexical audit, not a full language parser: aliases, multiline expressions and dynamic URLs may be missed; hardcoded references and src warnings require review. Errors exit 1; --strict makes warnings fail, and --json gives machine-readable diagnostics.

## Example

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

---

← Previous: [Diagnostics: named-routes doctor](topic-doctor.md) · [All topics](guides.md) · Next: [migrate --to 2](topic-cli-migrate.md) →
