# URL fragments (hash)

[Documentation](index.md) / [Build URLs & name routes](build-with-routes.md)

[English](../en/topic-hash-fragments.md) · [Português](../pt/topic-hash-fragments.md) · [Español](../es/topic-hash-fragments.md) · [日本語](../ja/topic-hash-fragments.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="hash-fragments"></a>

Use hash to point to a section on a page. The helper removes an optional leading # and encodes the fragment. The browser does not send it to the server.

## Example

```ts
route.url("about", { hash: "team" }); // /about#team
```

## Related topics

- [Query strings](topic-query-hash.md)
- [route.url() — public URLs](topic-public-url.md)

---

← Previous: [Query strings](topic-query-hash.md) · [All topics](build-with-routes.md) · Next: [Base path — internal vs public URL](topic-base-path.md) →
