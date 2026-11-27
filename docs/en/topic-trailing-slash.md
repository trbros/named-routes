# Trailing slashes

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-trailing-slash.md) · [Português](../pt/topic-trailing-slash.md) · [Español](../es/topic-trailing-slash.md) · [日本語](../ja/topic-trailing-slash.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="trailing-slash"></a>

trailingSlash changes generated path formatting, not server redirects. Configure the same policy in your framework. Next.js inherits this option from next.config.

## Example

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ about: "/about" }, { trailingSlash: true });
route("about"); // /about/
```

## Related topics

- [Base path — internal vs public URL](topic-base-path.md)
- [URL defaults](topic-config-defaults.md)

---

← Previous: [Absolute URLs & origin](topic-absolute-urls.md) · [All topics](build-with-routes.md) · Next: [Semantic route names and groups](topic-semantic-names.md) →
