# Rewrites and boundaries

Topic: `boundaries` · Named Routes v2.2.0

This is a URL builder, not a replacement router, middleware, authorization system or HTTP client. It does not create routes at runtime, validate resource existence, detect the visitor's locale or make backend requests.

Redirects, rewrites and middleware-based locale detection remain application concerns; paths declared in code are named only where the framework publishes its route table (see Other frameworks). Explicitly map any external or rewritten pattern you need with extraRoutes, and avoid applying locale or basePath twice. The scanner does not read framework config files; use withNamedRoutes or options to pass settings.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```
