# Rewrites and boundaries

[Documentation](index.md) / [CLI, CI & troubleshooting](guides.md)

[English](../en/topic-boundaries.md) · [Português](../pt/topic-boundaries.md) · [Español](../es/topic-boundaries.md) · [日本語](../ja/topic-boundaries.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="boundaries"></a>

This is a URL builder, not a replacement router, middleware, authorization system or HTTP client. It does not create routes at runtime, validate resource existence, detect the visitor's locale or make backend requests.

Redirects, rewrites and middleware-based locale detection remain application concerns; paths declared in code are named only where the framework publishes its route table (see Other frameworks). Explicitly map any external or rewritten pattern you need with extraRoutes, and avoid applying locale or basePath twice. The scanner does not read framework config files; use withNamedRoutes or options to pass settings.

## Example

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Previous: [Errors and troubleshooting](topic-errors.md) · [All topics](guides.md)
