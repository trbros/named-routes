# Audit routes and assets

Topic: `audit` · Named Routes v2.2.0

Run audit in the consumer project to detect literal unknown route/asset references, case mismatches, duplicate base prefixes and hardcoded paths. Scans source files, skips build outputs and never rewrites them. This is a conservative lexical audit, not a full language parser: aliases, multiline expressions and dynamic URLs may be missed; hardcoded references and src warnings require review. Errors exit 1; --strict makes warnings fail, and --json gives machine-readable diagnostics.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```
