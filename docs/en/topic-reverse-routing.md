# Reverse routing and active routes

[Documentation](index.md) / [Route reference & inspection](route-helpers.md)

[English](../en/topic-reverse-routing.md) · [Português](../pt/topic-reverse-routing.md) · [Español](../es/topic-reverse-routing.md) · [日本語](../ja/topic-reverse-routing.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="reverse-routing"></a>

route.match(url) returns the named route a path points to, with decoded params, the query (repeated keys become arrays), the hash and the locale, or null. It accepts a root-relative path such as /users/42?tab=posts#bio or a URL object; absolute URLs match only on the configured origin or an i18n domain. route.is(name, url) compares a URL with a route; { exact: false } also accepts descendants, for active navigation sections. route.breadcrumbs(url) returns the matches of every ancestor path.

Static segments win, then mixed, dynamic, optional, catch-all and optional catch-all segments, compared from left to right; equally specific patterns resolve by declaration order. Segments are split before they are decoded, so %2F stays inside a parameter; malformed percent-encoding, empty segments and relative or protocol-relative URLs return null. Pass { basePath: true } when the URL includes basePath (window.location.pathname). Locale prefixes, custom prefixes and localized pathnames are recognized.

Matching describes your route table only: it is not authorization, does not prove a resource exists or that a navigation will succeed, and does not replace the framework router. The query is returned as strings; parse it with your own schema, for example schema.parse(found.query) with coercion.

## Example

```ts
const found = route.match("/users/42?tab=posts");
// { name: "users.$user", params: { user: "42" }, query: { tab: "posts" }, hash: "", locale: undefined, ... }
if (found?.name === "users.$user") found.params.user; // string

route.is("users.$user", "/users/new"); // false when /users/new is its own page
route.is("users", pathname, { exact: false }); // active section
route.breadcrumbs("/users/42/edit").map((item) => item.name);
// ["home", "users", "users.$user", "users.$user.edit"]
```

## Related topics

- [route.match()](topic-helper-match.md)
- [route.is()](topic-helper-is.md)
- [route.breadcrumbs()](topic-helper-breadcrumbs.md)

---

[All topics](route-helpers.md) · Next: [route.match()](topic-helper-match.md) →
