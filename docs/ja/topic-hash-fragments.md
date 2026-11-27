# URL フラグメント

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-hash-fragments.md) · [Português](../pt/topic-hash-fragments.md) · [Español](../es/topic-hash-fragments.md) · [日本語](../ja/topic-hash-fragments.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="hash-fragments"></a>

hash でページ内の位置を指定します。先頭の # は除去され、フラグメントはエンコードされます。サーバーには送信されません。

## 例

```ts
route.url("about", { hash: "team" }); // /about#team
```

## 関連トピック

- [クエリ文字列](topic-query-hash.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [クエリ文字列](topic-query-hash.md) · [全トピック](build-with-routes.md) · 次へ: [ベースパス — 内部と公開 URL](topic-base-path.md) →
