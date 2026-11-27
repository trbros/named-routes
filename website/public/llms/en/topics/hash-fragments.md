# URL fragments (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Use hash to point to a section on a page. The helper removes an optional leading # and encodes the fragment. The browser does not send it to the server.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
