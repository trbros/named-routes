# HTTP の境界

[ドキュメント](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-endpoints.md) · [Português](../pt/topic-react-router-endpoints.md) · [Español](../es/topic-react-router-endpoints.md) · [日本語](../ja/topic-react-router-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-endpoints"></a>

React Router / Remix のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

## 例

```ts
route.url("users.$id", { params: { id: 42 } });
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [リライトと境界](topic-boundaries.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [多言語リンク](topic-react-router-i18n.md) · [全トピック](framework-react-router.md)
