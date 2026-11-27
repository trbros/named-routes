# HTTP の境界

[ドキュメント](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-endpoints.md) · [Português](../pt/topic-vue-endpoints.md) · [Español](../es/topic-vue-endpoints.md) · [日本語](../ja/topic-vue-endpoints.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-endpoints"></a>

Vue Router のクライアントルートは HTTP メソッドの契約ではありません。API または OpenAPI クライアントを利用し、既知の URL には route.url() を使います。

## 例

```ts
route.url("users.$id", { params: { id: 42 } });
```

## 関連トピック

- [生成 api — HTTP ディスクリプター](topic-endpoint-methods.md)
- [リライトと境界](topic-boundaries.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [多言語リンク](topic-vue-i18n.md) · [全トピック](framework-vue.md)
