# URL フラグメント

Topic: `hash-fragments` · Named Routes v2.2.0

hash でページ内の位置を指定します。先頭の # は除去され、フラグメントはエンコードされます。サーバーには送信されません。

```ts
route.url("about", { hash: "team" }); // /about#team
```

Related topic IDs: query-hash, public-url
