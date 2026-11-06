# Security policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |
| < 1.0   | No        |

## Reporting a vulnerability

Please do not open a public issue. Use GitHub's private vulnerability reporting
("Report a vulnerability" in the repository's Security tab). Include the
affected version, a minimal reproduction and the impact you observed. You will
get an acknowledgement within a few business days, and a fix will be released as
a patch version with credit unless you prefer otherwise.

## Scope notes

- The runtime only builds URL strings; it never fetches, redirects or authorizes.
- The generator reads file paths and never executes your pages. Configuration
  files (`named-routes.config.*`) are executed like any build config: only use
  configs you trust.
- Values in `defaults`/`i18n` are written into the generated module, which is
  shipped to browsers. Never put secrets there.
