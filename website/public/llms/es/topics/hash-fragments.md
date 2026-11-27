# Fragmentos de URL (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Usa hash para apuntar a una sección. Se elimina un # inicial y se codifica. El navegador no lo envía al servidor.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
