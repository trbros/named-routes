# Fragmentos da URL (hash)

Topic: `hash-fragments` · Named Routes v2.2.0

Use hash para apontar a uma seção da página. O helper remove um # inicial opcional e codifica o fragmento. O navegador não o envia ao servidor.

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
